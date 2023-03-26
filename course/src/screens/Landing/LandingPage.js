import { Button, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./LandingStyles.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LandingPage = () => {
    const userLogin = useSelector((state)=>state.UserLogin);
    const {userInfo} = userLogin;
    const navigate = useNavigate();
    useEffect(() => {
      if(userInfo){
        navigate("/mynotes");
      }
    },[userInfo]);
    return (
    <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <div>
                <h1 className="title">Welcome to Note Keeper</h1>
                <p className="subtitle">One Safe place for all your notes.</p>
              </div>
              <div className="buttonContainer">
                <Link to="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                   
                    size="lg"
                    className="landingbutton"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    )
}
export default LandingPage;