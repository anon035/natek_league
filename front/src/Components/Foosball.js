import React from "react";
import FoosballCard from "./FoosballCard";
import Fetch from "./Fetch";

const Foosball = props => {
  let card = props.list.map((team, index) => {
    if (team.members.length > 0) {
      return <FoosballCard key={index} team={team} />;
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
    if (newPlayerName.length >= 2) {
      Fetch.post("team", {
        body: JSON.stringify(data)
      })
        .then(res => {
          addPlayers(res.data.id);
        });
    } else {
      alert('Player name must be at least 4 characters long.');
    }
  };

  const addPlayers = teamId => {
    let playerInputs = document.querySelectorAll('[data-new-player]');
    for (let pl of playerInputs) {
      if (pl.value) {
        let data = {
          name: pl.value,
          team_id: teamId
        };
        Fetch.post('player', {
          body: JSON.stringify(data)
        }).then(() => window.location.href = "/");
      }
    }
  }
  return (
    <table
      style={{ width: "100%" }}
      className="ui very basic collapsing celled table">
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Team ID</th>
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
                <div className="sub header">
                  <div className="ui input">
                    <input
                      data-new-player
                      type="text"
                    />
                  </div>
                </div>
                <div className="sub header">
                  <div className="ui input" >
                    <input
                      data-new-player
                      type="text"
                    />
                  </div>
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

export default Foosball;
