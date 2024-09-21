import React from "react";
import "../App.css";
import FTS from "../pages/fts";
import Fetch from "../fetch/Fetchthoughts";

export default function Thoughts() {
  return (
    <FTS
      h1="Share your thoughts with the world without revealing your identity"
      h2="Submit your Thoughts"
      submit="/submitthoughts"
      fetch={<Fetch />}
    />
  );
}
