import React, { Component } from "react";
import Fetch from "./Fetch";

class FoosballCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveFoosballTeam = e => {
    let teamId = e.target.getAttribute('data-team-id');
    let teamInput = document.querySelector('input[name=teamName-' + teamId + ']');
    let playerInputs = document.querySelectorAll('[name=playerTeam' + teamId + ']');
    
    let input = {
      name: teamInput.value, 
      team_id: teamId
    }
    Fetch.put("team/"+teamId, {
      body: JSON.stringify(input)
    });

    for (let input of playerInputs) {
      let body = {
        name: input.value,
        team_id: teamId
      }
      let playerId = input.getAttribute('data-player-id');
      Fetch.put("player/"+playerId, {
        body: JSON.stringify(body)
      });
    }
  };

  render() {
    const team = this.props.team;
    return (
      <tr>
        <td className="tableDataLayout">
          <h4 data-team-id={team.id} className="ui image header">
            <img
              alt="dadas"
              src="./logos/user.png"
              className="ui mini rounded image"
            />
                <div className="content">
                  <div className="ui input">
                        <input
                          type="text"
                          defaultValue={team.name}
                          name={`teamName-${team.id}`}
                        />
                  </div>
                  {team.members.map((member, index) => {
                    return (
                      <div key={index} className="sub header">
                        <div className="ui input" data-members-team-id={team.id}>
                          <input
                            data-player-id={member.id}
                            type="text"
                            name={`playerTeam${team.id}`}
                            defaultValue={member.name}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
          </h4>
          <button
            onClick={this.saveFoosballTeam}
            className="ui green basic button tiny"
            data-team-id={team.id}
          >
            Save
          </button>
        </td>
        <td>{team.id}</td>
      </tr>
    );
  }
}

export default FoosballCard;
