import { useEffect, useState } from "react";
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {LogOut} from '../redux/actions/UserActions';

const Header = () => {
  const dispatch = useDispatch();
    // const [userInfo,setUserInfo] = useState(true);
    const userLogin = useSelector((state) => state.UserLogin);
    const { userInfo } = userLogin;
    const logoutHandler = () => {
      dispatch(LogOut());
    };
  
    useEffect(() => {}, [userInfo]);
    return (
    <Navbar collapseOnSelect expand="lg"   style={{backgroundColor:"#f7f7f7",color:"#000000",fontWeight:"bold",boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px"}}>
      <Container>
        <Navbar.Brand href="/">Note Keeper</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {userInfo && (
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  
                />
              </Form>
            )}
          </Nav>
          <Nav>
            {userInfo ? (
              <>
                <Nav.Link href="/mynotes">My Notes</Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">
                  <img
                      alt=""
                      src={userInfo.pic}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> 
                    {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Header;