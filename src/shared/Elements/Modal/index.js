import React from "react";
import MUiModal from "@material-ui/core/Modal";
import "./Modal.scss";
import { Card } from "@material-ui/core";
const Modal = (props) => {
  const content = (
    <MUiModal
      open={props.open || false}
      onClose={(e) => {
        props.onClose ? props.onClose(e) : e.preventDefault();
      }}
      container={document.getElementById("modal-hook")}
      className={props.classNames.wrapper || ""}
    >
      <Card
        style={
          props.transparent && { background: "transparent", boxShadow: "none" }
        }
      >
        <div className={`${props.classNames.content}`}>
          <div className="modal__header">
            {props.header}
            {props.closeButton && (
              <span onClick={props.onClose} className="modal__close">
                X
              </span>
            )}
          </div>

          {props.children}
        </div>
      </Card>
    </MUiModal>
  );
  return content;
};

export default Modal;
