import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

function DailyInfoHistory(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/dailyInfos";
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
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    readCookie();
    fetchData();
  }, []);

  const patientId = screen;
  let array = [];

  data.map((item) => {
    if (item.owner === patientId) {
      array.push(item);
      return item;
    }
  });

  const editDailyInfo = (id) => {
    props.history.push({
      pathname: "/dailyInfoEdit/" + id,
    });
  };

  const displayAllDailyInfoHistoryTable = array.map((dailyInfo, idx) => {
    return (
      <tr key={idx}>
        <td>{dailyInfo.pulseRate}</td>
        <td>{dailyInfo.bloodPressure}</td>
        <td>{dailyInfo.weight}</td>
        <td>{dailyInfo.temperature}</td>
        <td>{dailyInfo.respiratoryRate}</td>
        <td>{dailyInfo.lastModified}</td>
        <td>{dailyInfo.created}</td>
        <td>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              editDailyInfo(dailyInfo._id);
            }}
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container-fluid col-12 justify-content-center margins">
      <div>
        <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
          <h2 className="h3-style text-center bg-white text-black">
            Patient Vital History
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
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Pulse Rate</th>
                  <th>Blood Pressure</th>
                  <th>Weight</th>
                  <th>Temperature</th>
                  <th>Respiratory Rate</th>
                  <th>Last Modified</th>
                  <th>Created</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>{displayAllDailyInfoHistoryTable}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(DailyInfoHistory);
