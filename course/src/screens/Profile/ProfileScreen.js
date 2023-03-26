import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";


const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("https://robohash.org/nemodoloreipsa.png?size=300x300&set=set1");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    const dispatch = useDispatch();
    const userLogin = useSelector((state)=>state.UserLogin);
    const {loading:loadingUser,error:ErrorUser,userInfo} = userLogin;
    const navigate = useNavigate();

    useEffect(() =>{
      if(!userInfo){
        navigate("/login");
      }
    },[userInfo]);
    return (
        <MainScreen title="EDIT PROFILE">
          <div>
            <Row className="profileContainer">
              <Col md={6}>
                <Form >
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>{" "}
                 
                  <Form.Group className="mb-4" 
                  controlId="pic">
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control
                     
                      id="custom-file"
                      type="file"
                      label="Upload Profile Picture"                    />
                  </Form.Group>
                  <Button type="submit" varient="primary">
                    Update
                  </Button>
                </Form>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={pic} alt={name} className="profilePic" />
              </Col>
            </Row>
          </div>
        </MainScreen>
      );
}

export default ProfileScreen;