// import React from "react";
import "../App.css";
import FTS from "../pages/fts";
import Fetch from "../fetch/Fetchfeelings";

export default function Feelings() {
  return (
    <FTS
      h1="Share your feelings with the world without revealing your identity"
      h2="Submit your Feelings"
      submit="/submitfeelings"
      fetch={<Fetch />}
    />
  );
}
