import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function VitalSigns(props) {
  const [screen, setScreen] = useState("auth");

  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };

  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3000/patients");
      setPatient(result.data);
      setShowLoading(false);
    };

    readCookie();
    fetchData();
  }, []);

  const nurseId = screen;

  const [vital, setVital] = useState({
    _id: "",
    bodyTemperature: "",
    heartRate: "",
    bloodPressure: "",
    respiratoryRate: "",
    nurse: "",
    patient: "",
    created: "",
  });

  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const apiUrl = "http://localhost:3000/api/clinicalVisit/create";

  const saveVital = (e) => {
    setShowLoading(true);
    let currDateTime = new Date();
    e.preventDefault();
    const data = {
      bodyTemperature: vital.bodyTemperature,
      heartRate: vital.heartRate,
      bloodPressure: vital.bloodPressure,
      respiratoryRate: vital.respiratoryRate,
      nurse: nurseId,
      patient: vital.patient,
      created: currDateTime,
    };

    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        if (result.data.screen === "error") {
          setShowError(true);
          console.log("error: " + showError);
        } else {
          props.history.push("/vitalHistory");
        }
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setVital({ ...vital, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid col-12 div-right margins">
      <div>
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <h2 className="h3-style text-center bg-white text-black">
            Add Vital Signs
          </h2>
        </Jumbotron>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          {showError && <span>There is something wrong...</span>}
          <Jumbotron className="bg-white">
            <Form onSubmit={saveVital}>
              <Form.Group>
                <Form.Label>Body Temperature (°C)</Form.Label>
                <Form.Control
                  type="number"
                  name="bodyTemperature"
                  id="bodyTemperature"
                  placeholder="E.g. 36.5"
                  min="1"
                  step="0.1"
                  value={vital.bodyTemperature}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Heart Rate (per minute)</Form.Label>
                <Form.Control
                  type="number"
                  name="heartRate"
                  id="heartRate"
                  placeholder="E.g. 80"
                  min="1"
                  step="1"
                  value={vital.heartRate}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Blood Pressure (systolic/diastolic mm Hg)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bloodPressure"
                  id="bloodPressure"
                  placeholder="E.g. 120/80"
                  pattern="^\d{2,3}\/\d{2,3}$"
                  value={vital.bloodPressure}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Respiratory Rate (per minute)</Form.Label>
                <Form.Control
                  type="number"
                  name="respiratoryRate"
                  id="respiratoryRate"
                  placeholder="E.g. 16"
                  min="1"
                  step="1"
                  value={vital.respiratoryRate}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Patient</Form.Label>
                <Form.Control
                  as="select"
                  name="patient"
                  id="patient"
                  value={vital.patient}
                  onChange={onChange}
                  required
                >
                  <option selected disabled value="">
                    Please select a patient below
                  </option>
                  {patient.map((item, idx) => (
                    <option key={idx} value={item._id}>
                      {"Name: " +
                        item.lastName +
                        ", " +
                        item.firstName +
                        " | Username: " +
                        item.username}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default withRouter(VitalSigns);
