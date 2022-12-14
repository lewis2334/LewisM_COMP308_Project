import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function DisplayUser(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/users/" + props.match.params.id;


  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editUser = (id) => {
    props.history.push({
      pathname: "/edit/" + id,
    });
  };
  const usersList = () => {
    props.history.push({
      pathname: "/login",
    });
  };
  const deleteUser = (id) => {
    setShowLoading(true);
    const user = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      role: data.role,
    };

    axios
      .delete(apiUrl, user)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/login");
      })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div className="container col-12">
      <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
        <h2 className="h3-style text-center bg-white text-black">
          User Details
        </h2>
      </Jumbotron>
      <div>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.username}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.role}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    editUser(data._id);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    deleteUser(data._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            usersList();
          }}
        >
          Back to Users List
        </Button>
      </div>
    </div>
  );
}

export default withRouter(DisplayUser);
