import React, { Component } from "react";
import Fetch from "./Fetch";

class EditScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: []
    };
  }
  componentDidMount() {
    let currentYear = new Date().getFullYear();
    Fetch.get("season")
      .then(res => res.json())
      .then(data => this.setState({ season: data.data.f[currentYear].weeks }))
      .then(() => console.log(this.state.season));
  }

  handleSaveAll = (e) => {
    e.preventDefault();
    console.log('Save all'); 

    console.log(e.target)
  };

  render() {
    return (
      <form onSubmit={this.handleSaveAll}>
        {this.state.season.map(week => {
          return (
            <table key={week.id} className="ui celled table">
              <thead>
                <tr>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    <p className="week-title">{week.name}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {week.matches.map(w => {
                  return (
                    <tr key={w.match_id} style={{ textAlign: "center" }}>
                      <td style={{width: "35%"}} data-label="Name">{w.team_one.name}</td>
                      <td>
                        <input
                          style={{ width: "40px" }}
                          type="number"
                          min="0"
                          defaultValue={w.team_one.score}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "40px" }}
                          type="number"
                          min="0"
                          defaultValue={w.team_two.score}
                        />
                      </td>
                      <td style={{width: "35%"}}>{w.team_two.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
        <button type="submit" className="ui positive basic button right floated">
          Save All
        </button>
      </form>
    );
  }
}

export default EditScore;
