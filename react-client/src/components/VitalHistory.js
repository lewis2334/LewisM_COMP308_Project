import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

function VitalHistory(props) {
  const [screen, setScreen] = useState("auth");
  const [patient, setPatient] = useState([]);
  const apiUrl = "http://localhost:3000/patients";

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
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setPatient(result.data);
      setShowLoading(false);
    };

    readCookie();
    fetchData();
  }, []);

  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const displayAllPatientTable = patient.map((p, idx) => {
    return (
      <tr
        key={idx}
        onClick={() => {
          showDetail(p._id);
        }}
      >
        <td>{p.username}</td>
        <td>{p.firstName}</td>
        <td>{p.lastName}</td>
      </tr>
    );
  });

  const showDetail = (id) => {
    props.history.push({
      pathname: "/vitalHistoryView/" + id,
    });
  };

  return (
    <div className="container-fluid col-12 justify-content-center margins">
      <div>
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <h2 className="h3-style text-center bg-white text-black">
            Search Vital History
          </h2>
        </Jumbotron>

        <div class="alert alert-warning" role="alert">
          To examine the patient's medical history, please click the appropriate
          row in the table below.
        </div>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

        <div className="container-fluid">
          {showError && <span>There is something wrong...</span>}
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>{displayAllPatientTable}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(VitalHistory);
