import React from "react";
import PingpongCard from "./PingpongCard";
import Fetch from "./Fetch";

const Pingpong = props => {
  let card = props.list.map((team, index) => {
    if (team.members.length < 1) {
      return <PingpongCard key={index} team={team} />;
    }
  });

  const handleAddPlayer = e => {
    e.target.parentNode.parentNode.style.display = "none";
    e.target.parentNode.parentNode.nextSibling.style.display = "table-row";
  };

  const handleSavePlayer = e => {
    let newPlayerName =
      e.target.parentNode.firstChild.firstChild.nextSibling.firstChild
        .firstChild.value;
    let data = {
      name: newPlayerName
    };
    if (newPlayerName.length > 3) {
      Fetch.post("team", {
        body: JSON.stringify(data)
      })
        .then(res => console.log(res))
        .then(() => window.location.href = "/");
    } else {
      alert('Player name must be at least 4 characters long.');
    }
  };

  return (
    <table
      style={{ width: "100%" }}
      className="ui very basic collapsing celled table"
    >
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Player ID</th>
        </tr>
      </thead>
      <tbody>
        {card}
        <tr>
          <td style={{ textAlign: "center" }} colSpan="2">
            <button onClick={handleAddPlayer} className="brown button tiny ui">
              Add new team
            </button>
          </td>
        </tr>
        <tr className="addNewPlayer">
          <td className="tableDataLayout">
            <h4 className="ui image header">
              <img
                alt="dadas"
                src="./logos/user.png"
                className="ui mini rounded image"
              />
              <div className="content">
                <div className="ui input">
                  <input type="text" />
                </div>
              </div>
            </h4>
            <button
              onClick={handleSavePlayer}
              className="ui green basic button tiny"
            >
              Save
            </button>
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default Pingpong;
