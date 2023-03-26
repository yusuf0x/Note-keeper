import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { Register } from '../../redux/actions/UserActions';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const dispatch = useDispatch();
    
    const userRegister = useSelector((state) => state.UserRegister);
    const {loading,error,userInfo} = userRegister;
    const navigate = useNavigate();
    
    useEffect(() => {
        if(userInfo){
            navigate("/");
        }
    },[userInfo]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setMessage("Passwords do not match");
        }else{
            dispatch(Register(name, email, password, pic));
        }
    }
    return (
        <MainScreen title="LOGIN">
        <div className="loginContainer" style={{display:"flex",flexDirection:"column",margin:"20px"}}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3"  >
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control 
                    type="file" 
                    size="lg"
                    id="custom-file"
                    label="Upload Profile Picture"
                    />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
        </div>
    </MainScreen>
    )
}

export default RegisterScreen;