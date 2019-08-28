import React from "react";

const SingleMatch = props => {
  const isWinner = (teamOne, teamTwo) => {
    if (teamOne.score === teamTwo.score) {
      return -1;
    } else {
      return teamOne.score > teamTwo.score ? 1 : 0;
    }
  };

  return (
    <div className="ui segment">
      <div className="ui two column very relaxed grid">
        <div className="column">
          <p>{props.match.team_one.name}</p>
          {isWinner(props.match.team_one, props.match.team_two) > 0 ? (
            <img className="winner-img-left" src="./favicon.ico" alt="Winning team" />
          ) : (
            ""
          )}
          <img alt="#" src="./logos/user.png" />
        </div>
        <div className="column">
          <img alt="#" src="./logos/user.png" />
          {isWinner(props.match.team_two, props.match.team_one) > 0 ? (
            <img className="winner-img-right" src="./favicon.ico" alt="Winning team" />
          ) : (
              ""
          )}
          <p>{props.match.team_two.name}</p>
        </div>
      </div>
      <div className="versus ui vertical divider">
        {props.match.team_one.score || props.match.team_two.score
          ? `${props.match.team_one.score} : ${props.match.team_two.score}`
          : "VS"}
      </div>
    </div>
  );
};

export default SingleMatch;
