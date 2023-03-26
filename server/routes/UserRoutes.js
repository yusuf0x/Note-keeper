const express = require("express");
const router = express.Router();
const {registerUser,authUser,updateProfile,uploadUserProfile } = require("./../controllers/UserController");
const {isAuth} = require("./../middlewares/authMiddleware");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const DIR = './storage/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
        // console.log(DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        // console.log(fileName);
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
            console.log(file);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});







router.route("/")
    .post(registerUser);
router.post("/login",authUser);
router.route("/profile")
    .post(isAuth,updateProfile);
router.route("/upload")
    .post(isAuth,upload.single('profileImg'),uploadUserProfile)

module.exports =  router;





