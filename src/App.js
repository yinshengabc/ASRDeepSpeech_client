import React, { useState } from "react";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [res, setRes] = useState();

  const getresult = a => {
    a.preventDefault();
    const file = a.target.files[0];

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "audio/wave");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: file,
      redirect: "follow"
    };
    fetch("http://localhost:1337/localhost:80/stt", requestOptions)
      .then(response => response.text())
      .then(result => setRes(result))
      .catch(error => console.log("error", error));
  };

  return (
    <React.Fragment>
      <div class="container">
        <h2>
          This is a page for the client part of ASR task (based on DeepSpeech)
        </h2>
        <div class="row">
          <div class="offset-md-3 col-md-6"></div>
          <div class="form-group files">
            <label>Upload Your wav File </label>
            <input type="file" name="file" onChange={getresult} />
          </div>
        </div>
        <p>Detection result:</p>
        {res !== null ? <p>{res}</p> : <p>no result</p>}
        <Button onClick={() => setRes(null)}>Reset</Button>
      </div>
    </React.Fragment>
  );
};

export default App;
