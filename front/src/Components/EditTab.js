import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Fetch from "./Fetch";

class EditTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: {},
      teamList: [],
      tempArray: []
    };
  }

  singleSave(e) {
    let matchId = e.target.getAttribute("data-match-id");
    let score = e.target.value;
    let teamOrder = e.target.name;

    let data = {
      score: score,
      teamOrder: teamOrder
    };
    Fetch.put("score/" + matchId, {
      body: JSON.stringify(data)
    }).then(res => console.log(res));
  }

  singleTeamSave(e) {
    let matchId = e.target.getAttribute("data-match-id");
    let teamId = e.target.value;
    let teamOrder = e.target.name;
    e.target.value = teamId;

    let data = {
      teamId: teamId,
      teamOrder: teamOrder
    };
    Fetch.put("match/" + matchId, {
      body: JSON.stringify(data)
    }).then(res => console.log(res));
  }

  componentDidMount() {
    let currentYear = new Date().getFullYear();
    Fetch.get("team")
      .then(data => data.data.p)
      .then(teams => {
        teams.unshift(<option>dasda</option>);
        this.setState({
          teamList: teams.map(team => {
            return (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            );
          })
        });
      });
    Fetch.get("season").then(data =>
      this.setState({
        seasons: {
          p: data.data.p[currentYear].weeks,
          f: data.data.f[currentYear].weeks
        }
      })
    );
  }
  addSingleMatch = e => {
    e.preventDefault();
    let weekId = e.target.getAttribute("data-week-id");
    let teamOneName =
      e.target.parentNode.parentNode.previousSibling.firstChild.firstChild
        .value;
    let teamOneScore =
      e.target.parentNode.parentNode.previousSibling.firstChild.nextSibling
        .firstChild.value;
    let teamTwoName =
      e.target.parentNode.parentNode.previousSibling.firstChild.nextSibling
        .nextSibling.nextSibling.firstChild.value;
    let teamTwoScore =
      e.target.parentNode.parentNode.previousSibling.firstChild.nextSibling
        .nextSibling.firstChild.value;

    let data = {
      team_one: teamOneName,
      team_two: teamTwoName,
      score_one: teamOneScore,
      score_two: teamTwoScore,
      week_id: weekId
    };
    if (teamOneName !== "" && teamTwoName !== "") {
      if (teamOneScore < 10 && teamTwoScore < 10) {
        if (teamOneScore > 0 || teamTwoScore > 0) {
          if (teamOneScore !== teamTwoScore) {
            Fetch.post("match", {
              body: JSON.stringify(data)
            }).then(res => {
              if (res.data.id) {
                let id = res.data.id;
                console.log("Matches id: ", id, "added");
                alert("Match added");
              } else {
                console.log("Nothing was inserted into Database");
              }
            }).then(() => window.location.href = "/");
          } else {
            alert("A draw is NOT allowed");
            e.preventDefault();
          }
        } else {
          Fetch.post("match", {
            body: JSON.stringify(data)
          }).then(res => {
            if (res.data.id) {
              let id = res.data.id;
              console.log("Matches id: ", id, "added");
              alert("Match added");
            } else {
              console.log("Nothing was inserted into Database");
            }
          }).then(() => window.location.href = "/");
        }
      } else {
        alert("Maximum score is 9");
        e.preventDefault();
      }
    } else {
      alert("You must select both teams");
      e.preventDefault();
    }
  };

  handleAddNewMatch = e => {
    e.preventDefault();
    let addNewMatchBtn = e.target.parentNode.parentNode; //to hide - add new match btn
    let saveNewMatchBtn = e.target.parentNode.parentNode.previousSibling; //to show, save btn
    let addNewMatchTr =
      e.target.parentNode.parentNode.previousSibling.previousSibling; //to show, new tr
    addNewMatchTr.style.display = "table-row";
    saveNewMatchBtn.style.display = "table-row";
    addNewMatchBtn.style.display = "none";
  };

  createSingleMatch = matchId => {
    return (
      <tr style={{ textAlign: "center" }}>
        <td style={{ width: "35%" }} data-label="Name">
          <select
            onChange={this.singleTeamSave}
            data-match-id={matchId}
            name="one"
            data-team
          >
            {this.state.teamList}
          </select>
        </td>
        <td>
          <input
            style={{ width: "40px" }}
            type="number"
            min="0"
            name="one"
            onBlur={this.singleSave}
            data-match-id={matchId}
            data-score
            defaultValue={0}
          />
        </td>
        <td>
          <input
            style={{ width: "40px" }}
            type="number"
            min="0"
            name="two"
            onBlur={this.singleSave}
            data-match-id={matchId}
            data-score
            defaultValue={0}
          />
        </td>
        <td style={{ width: "35%" }}>
          <select
            onChange={this.singleTeamSave}
            data-match-id={matchId}
            name="two"
            data-team
          >
            {this.state.teamList}
          </select>
        </td>
      </tr>
    );
  };
  getWeekList(weeks) {
    return (
      <form>
        {weeks.map(week => {
          return (
            <table key={week.id} className="ui celled table">
              <thead>
                <tr>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    <p className="week-title">{week.name}</p>
                  </th>
                </tr>
              </thead>
              <tbody id={`weekTbody${week.id}`}>
                {week.matches.map(w => {
                  return (
                    <tr key={w.match_id} style={{ textAlign: "center" }}>
                      <td style={{ width: "35%" }} data-label="Name">
                        <select
                          defaultValue={w.team_one.id}
                          onChange={this.singleTeamSave}
                          data-match-id={w.match_id}
                          name="one"
                          data-team
                        >
                          {this.state.teamList}
                        </select>
                      </td>
                      <td>
                        <input
                          style={{ width: "40px" }}
                          type="number"
                          min="0"
                          name="one"
                          onBlur={this.singleSave}
                          data-match-id={w.match_id}
                          data-score
                          defaultValue={w.team_one.score}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "40px" }}
                          type="number"
                          min="0"
                          name="two"
                          onBlur={this.singleSave}
                          data-match-id={w.match_id}
                          data-score
                          defaultValue={w.team_two.score}
                        />
                      </td>
                      <td style={{ width: "35%" }}>
                        <select
                          defaultValue={w.team_two.id}
                          onChange={this.singleTeamSave}
                          data-match-id={w.match_id}
                          name="two"
                          data-team
                        >
                          {this.state.teamList}
                        </select>
                      </td>
                    </tr>
                  );
                })}
                <tr
                  data-week-id={week.id}
                  className="addNewMatchTr"
                  style={{ textAlign: "center" }}
                >
                  <td style={{ width: "35%" }} data-label="Name">
                    <select
                      id="team_one_name"
                      data-match-id={0}
                      name="one"
                      data-team
                    >
                      {this.state.teamList}
                    </select>
                  </td>
                  <td>
                    <input
                      id="team_one_score"
                      style={{ width: "40px" }}
                      type="number"
                      min="0"
                      max="9"
                      pattern="[0-9]{1}"
                      name="one"
                      data-match-id={0}
                      data-score
                      defaultValue={0}
                    />
                  </td>
                  <td>
                    <input
                      id="team_two_score"
                      style={{ width: "40px" }}
                      type="number"
                      min="0"
                      max="9"
                      pattern="[0-9]{1}"
                      name="two"
                      data-match-id={0}
                      data-score
                      defaultValue={0}
                    />
                  </td>
                  <td style={{ width: "35%" }}>
                    <select
                      id="team_two_name"
                      data-match-id={0}
                      name="two"
                      data-team
                    >
                      {this.state.teamList}
                    </select>
                  </td>
                </tr>
                <tr data-week-id={week.id} className="saveNewMatchBtn">
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <button
                      data-week-id={week.id}
                      className="olive button tiny ui"
                      onClick={this.addSingleMatch}
                    >
                      Save
                    </button>
                  </td>
                </tr>
                <tr data-week-id={week.id} className="addNewMatchBtn">
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <button
                      onClick={this.handleAddNewMatch}
                      className="brown button tiny ui"
                    >
                      Add new match
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </form>
    );
  }

  render() {
    let p;
    let f;
    if (this.state.seasons && this.state.seasons.p) {
      p = this.getWeekList(this.state.seasons.p);
    }
    if (this.state.seasons && this.state.seasons.f) {
      f = this.getWeekList(this.state.seasons.f);
    }
    const panes = [
      {
        menuItem: "Pingpong",
        render: () => (
          <Tab.Pane>
            <div id="test">{p}</div>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Foosball",
        render: () => (
          <Tab.Pane>
            <div id="test">{f}</div>
          </Tab.Pane>
        )
      }
    ];
    const { activeIndex } = this.state;

    return (
      <div>
        <Tab
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </div>
    );
  }
}

export default EditTab;
