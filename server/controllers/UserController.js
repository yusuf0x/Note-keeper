
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const authUser = async (req,res) =>{
    // const { email, password } = req.body;
    const user = await User.findOne({email:req.body.email});
    if(user && (await user.matchPassword(req.body.password))){
        const {password,...Details} = user._doc; 
        // console.log(user);
        res.status(200).json({
            ...Details,
            token:generateToken(user._id)
        });
    }else{
        res.status(401).json({message:"Invalid Email or Password"});
    }
};
const registerUser = async (req,res) => {
    const userExists = await User.findOne({email:req.body.email});
    if (userExists) {
        res.status(404).json({message:"User already exists"});
        // throw new Error("User already exists");
    }
    const user = await User.create(req.body);
    const {password,...Details} = user._doc; 
    if(user){
        res.status(201).json({
            ...Details,
            token: generateToken(user._id),
        })
    }else{
        res.status(400).json({message:"User not found"});
    }

}
const updateProfile = async (req,res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({message:"User Not Found"});
    //   throw new Error("User Not Found");
    }
}

const uploadUserProfile = async (req, res, next)=>{
    const url = req.protocol + '://' + req.get('host')
    console.log(url);
    // const upatedUser = await User.findOneAndUpdate({_id:req.user._id},{profileImg:url + '/storage/' + req.file.filename});
    // if(upatedUser){
    //     res.status(201).json({
    //         message: "img uuploaded successfully!",
    //         data: {
    //             _id: upatedUser._id,
    //             profileImg: upatedUser.profileImg
    //         }
    //     });
    // }else{
    //     res.status(500).json({
    //         error: "img not uploded"
    //     });
    // }
    res.status(200).json({
                msg: "test"
    });

}
module.exports = {authUser,registerUser,updateProfile,uploadUserProfile};