import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function DailyInfoEdit(props) {
  const [screen, setScreen] = useState("auth");
  const [data, setData] = useState({
    _id: "",
    pulseRate: "",
    bloodPressure: "",
    weight: "",
    temperature: "",
    respiratoryRate: "",
    lastModified: "",
    owner: "",
    created: "",
  });
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/dailyInfo/" + props.match.params.id;

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

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    readCookie();
    fetchData();
  }, []);

  const updateDailyInfo = (e) => {
    setShowLoading(true);
    let currDateTime = new Date();
    e.preventDefault();
    const updatedDailyInfo = {
      pulseRate: data.pulseRate,
      bloodPressure: data.bloodPressure,
      weight: data.weight,
      temperature: data.temperature,
      respiratoryRate: data.respiratoryRate,
      lastModified: currDateTime,
      owner: data.patientId,
      created: data.created,
    };

    axios
      .put(apiUrl, updatedDailyInfo)
      .then((result) => {
        setShowLoading(false);
        if (result.data.screen === "error") {
          setShowError(true);
          console.log("error: " + showError);
        } else {
          props.history.push("/dailyInfoHistory");
        }
      })
      .catch((error) => setShowLoading(false));
  };

  const deleteDailyInfo = (id) => {
    const deleteApi = "/api/dailyInfo/" + id;
    setShowLoading(true);
    const deletedDailyInfo = {
      pulseRate: data.pulseRate,
      bloodPressure: data.bloodPressure,
      weight: data.weight,
      temperature: data.temperature,
      respiratoryRate: data.respiratoryRate,
      lastModified: data.lastModified,
      owner: data.patientId,
      created: data.created,
    };
    axios
      .delete(deleteApi, deletedDailyInfo)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/dailyInfoHistory");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid col-12 margins">
      <div>
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <h2 className="h3-style text-center bg-white text-black">
            Add My Daily Info
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
            <Form onSubmit={updateDailyInfo}>
              <Form.Group>
                <Form.Label>Pulse Rate (per minute)</Form.Label>
                <Form.Control
                  type="number"
                  name="pulseRate"
                  id="pulseRate"
                  placeholder="E.g. 80"
                  min="1"
                  step="1"
                  value={data.pulseRate}
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
                  value={data.bloodPressure}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Weight (lb)</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="E.g. 180.5"
                  min="1"
                  step="0.1"
                  value={data.weight}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Temperature (°C)</Form.Label>
                <Form.Control
                  type="number"
                  name="temperature"
                  id="temperature"
                  placeholder="E.g. 36.5"
                  min="1"
                  step="0.1"
                  value={data.temperature}
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
                  value={data.respiratoryRate}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => {
                    deleteDailyInfo(data._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default withRouter(DailyInfoEdit);
