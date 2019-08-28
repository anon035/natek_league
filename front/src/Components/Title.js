import React from "react";
import { withRouter } from 'react-router-dom';

const Title = (props) => {
  let title = "";
  if (props.location.pathname === "/standings") {
    title = "Current Standings ";
  } else if (props.location.pathname === "/login") {
    title = "Login for administration";
  } else if (props.location.pathname === "/") {
    title = "Schedule / Upcomming matches ";
  } else if (props.location.pathname === "/playoff") {
    title = "Playoff Schedule ";
  } else if (props.location.pathname === "/editscore") {
    title = "Edit Score ";
  } else if (props.location.pathname === "/editplayers") {
    title = "Edit Players ";
  } else if (props.location.pathname === "/logout") {
    title = "Logging out ";
  } else {
    title = "Error 404"
  }
  return (
    <h2 className="section-title ui dividing header">
      {title} <span className="down-arrow">&#8595;</span>
    </h2>
  );
};

export default withRouter(Title);
