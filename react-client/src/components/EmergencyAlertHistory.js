import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";

import { Jumbotron } from "react-bootstrap";

function EmergencyAlertHistory(props) {
  const [dataPatients, setPatientsData] = useState([]);
  const apiUrlPatients = "http://localhost:3000/patients";
  const [data, setData] = useState([]);
  const apiUrl = "http://localhost:3000/api/alerts";
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);
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

  useEffect(() => {
    readCookie();
  }, []);

  let patientId = screen;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const resultPatients = await axios(apiUrlPatients);
      console.log(resultPatients.data);
      setPatientsData(resultPatients.data);
      const result = await axios(apiUrl);
      console.log(result.data);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const displayEmergencyAlertTable = (
    data.find((item) => item.owner === patientId)
      ? data.filter((item) => item.owner === patientId)
      : data
  ).map((item, idx) => {
    let patient = dataPatients.find((i) => i._id === item.owner);

    let alert = {
      _id: item._id,
      owner: item.owner,
      patientName:
        patient.firstName[0] +
        patient.firstName.slice(1) +
        " " +
        patient.lastName[0] +
        patient.lastName.slice(1),
      message: item.message,
      created: String(item.created).replace("T", " ").slice(0, 19),
      unread: item.unread,
    };

    return (
      <tr
        key={idx}
        className={
          alert.unread && alert.owner !== patientId
            ? "font-weight-bold"
            : "font-weight-normal"
        }
        onClick={() => {
          showDetail(alert._id);
        }}
      >
        <td>{alert.created}</td>
        <td>{alert.patientName}</td>
        <td>{alert.message}</td>
      </tr>
    );
  });

  const showDetail = (id) => {
    props.history.push({
      pathname: "/emergencyAlertView/" + id,
    });
  };

  return (
    <div className="container-fluid col-12 justify-content-center margins">
      <div>
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <h2 className="h3-style text-center bg-white text-black">
            Emegency Alert History
          </h2>
        </Jumbotron>

        <br />

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

        <div className="container-fluid">
          {showError && <span>There is something wrong...</span>}

          <div className="mb-20">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Patient</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>{displayEmergencyAlertTable}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(EmergencyAlertHistory);
