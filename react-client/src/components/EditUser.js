import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Jumbotron,
  Spinner,
  Button,
  Form,
  ButtonToolbar,
  ButtonGroup,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";

function EditUser(props) {
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
  const [showLoading, setShowLoading] = useState(true);
  const [userRole, setUserRole] = useState();
  const apiUrl = "http://localhost:3000/users/" + props.match.params.id;
   useEffect(() => {
    setShowLoading(false);
     const fetchData = async () => {
      const result = await axios(apiUrl);
      setUser(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      username: user.username,
      firstName: user.firstName.toUpperCase(),
      lastName: user.lastName.toUpperCase(),
      password: user.password,
      role: userRole,
      lastLoggedIn: user.lastLoggedIn,
      password: user.password,
      verified: user.verified,
      created: user.created,
    };
    axios
      .put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/show/" + result.data._id);
      })
      .catch((error) => setShowLoading(false));
  };
   const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container col-12 ">
      <div className="span12 div-style bg-white radius p-10">
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <h2 className="h3-style text-center bg-white text-black">
            Edit User {user.username}
          </h2>
        </Jumbotron>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <Form onSubmit={updateUser}>
            <Form.Group>
              <Form.Label> Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                value={user.username}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                id="firstName"
                placeholder="first name"
                value={user.firstName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                id="lastName"
                placeholder="last name"
                value={user.lastName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Existing User Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                id="role"
                value={user.role}
                readonly="readonly"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Change User Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                id="role"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="Nurse">Nurse</option>
                <option value="Patient">Patient</option>
              </Form.Control>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary col-6" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(EditUser);
