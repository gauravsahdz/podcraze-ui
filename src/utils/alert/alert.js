import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../components/css/alert.css";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const AlertComponent = ({ alert, key }) => {
  return (
    <>
      <div
        className="notification"
        style={{
          display: alert.show ? "block" : "none",
        }}
        key={key}
      >
        <div className="notification__body">
          <FontAwesomeIcon
            icon={alert.icon === "successIcon" ? faCircleCheck : faCircleXmark}
            className="notification__icon"
          />
          <span
            style={{
              color: alert.color,
            }}
          >
            {alert.message}!
          </span>{" "}
          &#128640;
        </div>
        <div className="notification__progress"></div>
      </div>
    </>
  );
};

export default AlertComponent;
