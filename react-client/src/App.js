import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import EmergencyAlertHistory from "./components/EmergencyAlertHistory";
import EmergencyAlertView from "./components/EmergencyAlertView";
import DiseasePredictor from "./components/DiseasePredictor";
import DailyInfoEdit from "./components/DailyInfoEdit";
import DailyInfoHistory from "./components/DailyInfoHistory";
import DailyInfo from "./components/DailyInfo";
import VitalEdit from "./components/VitalEdit";
import VitalHistoryView from "./components/VitalHistoryView";
import VitalHistory from "./components/VitalHistory";
import VitalSigns from "./components/VitalSigns";
import RegisterUser from "./components/RegisterUser";
import SendEmergencyAlert from "./components/SendEmergencyAlert";
import Login from "./components/Login";
import Home from "./components/Home";
import List from "./components/List";
import DisplayUser from "./components/DisplayUser";
import EditUser from "./components/EditUser";
import View from "./components/View";


function App() {
  const [screen, setScreen] = useState("auth");
  const [role, setRole] = useState("auth");
  const [rerender, setRerender] = useState(false);

  const updateLogin = () => {
    setRerender(!rerender);
  };

  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }

      if (res.data.role !== undefined) {
        setRole(res.data.role);
      }
    } catch (e) {
      setScreen("auth");
      setRole("auth");
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  });
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {screen !== "auth" ? (
              <React.Fragment>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Profiles</Nav.Link>
                <Nav.Link href="/registerUser">Logout</Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/registerUser">Register</Nav.Link>
              </React.Fragment>
            )}
            {screen !== "auth" && role === "patient" && (
              <React.Fragment>
                <Nav.Link href="/dailyInfo">Add Daily Info</Nav.Link>
                <Nav.Link href="/dailyInfoHistory">Daily Info History</Nav.Link>
                <Nav.Link href="/predict/heartdisease">
                  Predict Heart Disease
                </Nav.Link>
                <Nav.Link href="/sendEmergencyAlert">
                  Send Emergency Alert
                </Nav.Link>
                <Nav.Link href="/emergencyAlertHistory">
                  Emergency Alert History
                </Nav.Link>
              </React.Fragment>
            )}
            {screen !== "auth" && role === "nurse" && (
              <React.Fragment>
                <Nav.Link href="/vitalSigns">Add Vital Signs</Nav.Link>
                <Nav.Link href="/vitalHistory">Vital History</Nav.Link>
                <Nav.Link href="/emergencyAlertHistory">
                  Emergency Alert History
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} exact path="/" />
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <Login rerender={updateLogin} />} path="/login" />
        <Route render={() => <RegisterUser />} path="/registerUser" />
        <Route render={() => <DisplayUser />} path="/show/:id" />
        <Route render={() => <EditUser />} path="/edit/:id" />
        <Route render={() => <List />} path="/list" />
        <Route render={() => <View />} path="/view" />
        {screen !== "auth" && role === "nurse" ? (
          <React.Fragment>
            <Route render={() => <VitalSigns />} path="/vitalSigns" />
            <Route render={() => <VitalHistory />} path="/vitalHistory" />
            <Route
              render={() => <VitalHistoryView />}
              path="/vitalHistoryView/:id"
            />
            <Route render={() => <VitalEdit />} path="/vitalEdit/:id" />
            <Route
              render={() => <EmergencyAlertHistory />}
              path="/emergencyAlertHistory"
            />
            <Route
              render={() => <EmergencyAlertView />}
              path="/emergencyAlertView/:id"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/vitalSigns"
            />
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/vitalHistory"
            />
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/vitalHistoryView/:id"
            />
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/vitalEdit/:id"
            />
          </React.Fragment>
        )}
        {screen !== "auth" && role === "patient" ? (
          <React.Fragment>
            <Route render={() => <DailyInfo />} path="/dailyInfo" />
            <Route
              render={() => <DailyInfoHistory />}
              path="/dailyInfoHistory"
            />
            <Route render={() => <DailyInfoEdit />} path="/dailyInfoEdit/:id" />
            <Route
              render={() => <DiseasePredictor />}
              path="/predict/heartdisease"
            />
            <Route
              render={() => <SendEmergencyAlert />}
              path="/sendEmergencyAlert"
            />
            <Route
              render={() => <EmergencyAlertHistory />}
              path="/emergencyAlertHistory"
            />
            <Route
              render={() => <EmergencyAlertView />}
              path="/emergencyAlertView/:id"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/dailyInfo"
            />
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/dailyInfoHistory"
            />
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/dailyInfoEdit/:id"
            />
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/predict/heartdisease"
            />
            <Route
              render={() => <Login rerender={updateLogin} />}
              path="/sendEmergencyAlert"
            />
          </React.Fragment>
        )}
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
