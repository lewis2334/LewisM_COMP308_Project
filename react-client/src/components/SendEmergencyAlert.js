import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Spinner,
  Jumbotron,
  Form,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";

function SendEmergencyAlert(props) {
  // initial values for an alert
  const [alert, setAlert] = useState({
    message: "EMERGENCY!! I NEED HELP", // default message
  });
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/alert/create";

  const saveAlert = (e) => {
    setShowLoading(true);
    e.preventDefault();
    // set a value to each field
    const data = {
      message: alert.message,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        if (result.data.screen === "error") {
          setShowError(true);
          console.log("error: " + showError);
        } else {
          props.history.push("/emergencyAlertHistory");
        }
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setAlert({ ...alert, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid  d-flex justify-content-center margins">
      <div className="col-12">
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <h2 className="h3-style text-center bg-white text-black">
            Send Emergency Alert
          </h2>
        </Jumbotron>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          {showError && (
            <span>
              There is something wrong... Not able register with given
              information
            </span>
          )}
          <Jumbotron className="bg-white">
            <Form onSubmit={saveAlert}>
              <div class="alert alert-primary" role="alert">
                a warning will be sent
                <br></br>
              </div>
              <div class="alert alert-warning" role="alert">
                - Emergency Health Service
                <br></br>- Your hospital
              </div>

              <Form.Group>
                <Form.Label className="font-weight-bold">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  name="message"
                  id="message"
                  className="textarea"
                  value={alert.message}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Send Alert
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SendEmergencyAlert);
