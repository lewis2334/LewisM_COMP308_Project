import React, { useState, useEffect } from "react";
import axios from "axios";
import View from "./View";
import { withRouter } from "react-router-dom";
import { data } from "@tensorflow/tfjs";

function AppLogin(props) {
  const [screen, setScreen] = useState("auth");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/signin";

  const auth = async () => {
    try {
      let loginData = { username, password };
      const res = await axios.post(apiUrl, loginData);
       if (res.data.screen === "error") {
        setShowError(true);
        setErrorMsg(res.data.message);
      } else if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        setShowError(false);
        props.rerender();
      }
    } catch (e) {
      setErrorMsg("Error logging in please try again");
      console.log(e);
    }
  };

   const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        height: "auto",
        width: "auto",
        borderRadius: "100%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className="col-12">
        {screen === "auth" && (
          <div className="container-fluid d-flex justify-content-center margins">
            <div className="row">
              <div className="col">
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
                  Login
                </h1>
              </div>
            </div>
          </div>
        )}

        {showError && (
          <div className="container-fluid  ">
            <span className="p-10">{errorMsg}</span>
          </div>
        )}
        {screen === "auth" ? (
          <div className="container ">
            <p>{data.value}</p>
            <div className="form-group">
              <label>User name: </label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <br />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group text-center">
              <button onClick={auth} className="btn btn-primary  " required>
                Login
              </button>
            </div>
          </div>
        ) : (
          <View
            screen={screen}
            setScreen={setScreen}
            rerender={props.rerender}
          />
        )}
      </div>
    </div>
  );
}

export default withRouter(AppLogin);
