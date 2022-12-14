import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {
  return (
    <div className="container">
      <div
        class="jumbotron"
        className="jumbotron"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <h1 class="display-4"> Centennial College Nurse Patient Application</h1>
        <p> React front-end calls Express REST API.</p>
        <p class="lead">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              height: "auto",
            }}
          >
            <button
              onClick={() => {
                props.history.push("/registerUser");
              }}
              style={{ marginRight: "5px" }}
              className="btn btn-primary btn-lg"
            >
              Register
            </button>

            <button
              onClick={() => {
                props.history.push("/login");
              }}
              style={{
                marginRight: "5px",
              }}
              className="btn btn-primary btn-lg"
            >
              Login
            </button>
          </div>
        </p>
      </div>
    </div>
  );
}

export default withRouter(Home);
