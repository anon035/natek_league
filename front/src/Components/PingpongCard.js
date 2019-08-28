import React, { Component } from "react";
import Fetch from "./Fetch";

class PingpongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  savePingPongTeam = (e) => {
    let teamId = e.target.parentNode.getAttribute("data-team-id");
    let pingpongInput = document.querySelector(`#pingpongInput${teamId}`).value;
    let input = {
      name: pingpongInput,
      team_id: teamId
    }
    Fetch.put("team/" + teamId, {
      body: JSON.stringify(input)
    }).then(res => {
      if (res.data.success === true) {
        alert('Team modified');
      } else {
        alert('Error occurred');
      }
    });
  }
  render() {
    const team = this.props.team;
    return (
      <tr>
        <td data-team-id={team.id} className="tableDataLayout">
          <h4 className="ui image header">
            <img
              alt="dadas"
              src="./logos/user.png"
              className="ui mini rounded image"
            />
            <div className="content">
              <div className="ui input">
                <input id={`pingpongInput${team.id}`} type="text" defaultValue={team.name} />
              </div>
            </div>
          </h4>
          <button onClick={this.savePingPongTeam} className="ui green basic button tiny">Save</button>
        </td>
        <td>{team.id}</td>
      </tr>
    );
  }
}

export default PingpongCard;
