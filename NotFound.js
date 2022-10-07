import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
  const history = useNavigate();
  return (
    <>
      <h1>Not Found!</h1>
      <button
        onClick={() => {
          history(-1);
        }}>
        Back
      </button>
    </>
  );
};

export default NotFound;
