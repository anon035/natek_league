import React from "react";
import SingleMatch from "./SingleMatch";

const SingleWeek = props => {
  const toggleView = () => {
    let element = document.querySelector(`#week${props.id}`);
    if (element.style.maxHeight !== "100%") {
      element.style.maxHeight = "100%";
    } else {
      element.style.maxHeight = "40vh";
      document.getElementById("root").style.marginRight = "";
    }
  };
  return (
    <div id={`week${props.id}`} className={`ui segment toggleView activeWeek`} onClick={toggleView}>
      <p className="week-title">{props.name}</p>
      {props.matches.map(match => {        
        return (
          <SingleMatch key={match.match_id} match={match} />
        );
      })}
    </div>
  );
};

export default SingleWeek;
