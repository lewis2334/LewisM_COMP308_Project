import RegisterUser from "./RegisterUser";
import List from "./List";
import React, { useState } from "react";

import {
  Spinner,
  Jumbotron,
  Form,
  Button,
  ButtonGroup,
  ButtonToolbar,
} from "react-bootstrap";

import axios from "axios";

function View(props) {
  const { screen, setScreen } = props;
  const [data, setData] = useState();
  const [user, setUser] = useState("");
  const deleteCookie = async () => {
    try {
      await axios.get("/api/signout");
      setScreen("auth");
      props.rerender();
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("/api/welcome");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //
  const createUser = () => {
    console.log("in createUser");
    setUser("y");
  };

  return (
    <div className="container-fluid col-12 margins">
      <Jumbotron className="bg-white text-black" style={{ marginTop: "5px" }}>
        <h2 className="h3-style text-center bg-white text-black">List Users</h2>
      </Jumbotron>
      <div className="col-12">
        {user !== "y" ? (
          <div className="App margins">
            <div className="btn-group margin-bottom" role="group"></div>
          </div>
        ) : (
          <RegisterUser screen={screen} setScreen={setScreen} />
        )}
      </div>
      {<List screen={screen} setScreen={setScreen} />}
    </div>
  );
}

//
export default View;
