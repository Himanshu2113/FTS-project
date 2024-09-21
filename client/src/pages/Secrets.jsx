import React from "react";
import "../App.css";
import FTS from "../pages/fts";
import Fetch from "../fetch/Fetchsecrets";

export default function Secrets() {
  return (
    <FTS
      h1="Share your secrets with the world without revealing your identity"
      h2="Submit your Secrets"
      submit="/submitsecrets"
      fetch={<Fetch />}
    />
  );
}
