import React from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";

export default function Modal() {
  return (
    <div className="centered">
      <div className="modal">
        <div className="modalHeader">
          <h5 className="heading">Confirm</h5>
        </div>
        <button className="closeBtn">
          <RiCloseLine />
        </button>
        <div className="modalContent">Are you really want to proceed ?</div>
        <div className="modalActions">
          <div className="actionsContainer">
            <button className="logOutBtn">Logout</button>
            <button className="closeBtn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
