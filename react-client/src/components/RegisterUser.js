import React, { useState } from "react";
import axios from "axios";
import {Spinner, Jumbotron, Form, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import { withRouter } from "react-router-dom";


function RegisterUser(props) {  // read the info from props, coming from the ancestor component
    const { screen, setScreen } = props;

    // called when user clicks on Logout button
    // to clear the cookie and set the screen state variable
    // back to its initial state.
    const deleteCookie = async () => {
        try {
            await axios.get("/api/signout");
            setScreen("auth");
        } catch (e) {
            console.log(e);
        }
    };
    deleteCookie();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "",
    lastLoggedIn: "",
    verified: "",
    created: "",
  });
  const [showLoading, setShowLoading] = useState(false);
    const [userRole, setUserRole] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/signup";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      username: user.username,
      firstName: user.firstName.toLowerCase(),
      lastName: user.lastName.toLowerCase(),
        role: userRole,
      lastLoggedIn: user.lastLoggedIn,
      password: user.password,
      verified: user.verified,
      created: user.created,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        if (result.data.screen === "error") {
          setShowError(true);
            setErrorMsg(result.data.message);
          console.log("error: " + showError);
        } else {
          props.history.push("/login");
        }
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid  d-flex justify-content-center margins">
      <div className="col-12">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <img
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                  height: "80px",
                  width: "auto",
                  borderRadius: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                className="img-fluid"
                alt="Responsive image"
              />
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                  height: "10px",
                  width: "auto",
                  borderRadius: "100%",
                  color: "#212529",
                }}
              >
                Register
              </h1>
            </div>
          </div>
        </div>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          {showError && <span className="p-10">{errorMsg}</span>}
          <Jumbotron className="bg-white">
            <Form onSubmit={saveUser}>
              <Form.Group>
                <Form.Label> First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  value={user.firstName}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name."
                  value={user.lastName}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username."
                  value={user.username}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password."
                  value={user.password}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  id="role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="nurse">Nurse</option>
                  <option value="patient">Patient</option>
                </Form.Control>
              </Form.Group>
              <br></br>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterUser);