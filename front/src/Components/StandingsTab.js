import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Fetch from "./Fetch";
// import SingleWeek from "./SingleWeek";

class StandingsTab extends Component {
  constructor() {
    super();

    this.state = {
      activeIndex: 0,
      foosballTeams: [],
      pingpongTeams: []
    };
  }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value });
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  componentDidMount() {
    Fetch.get("team").then(res =>
      this.setState({
        foosballTeams: res.data.f.filter(team => team.members.length > 0),
        pingpongTeams: res.data.p.filter(team => team.members.length === 0)
      })
    );
  }

  getStandings(teams) {
    return (
      <table className="mobile-table ui selectable celled table striped">
        <thead>
          <tr>
            <th className="sticky-postion">Team Name</th>
            <th className="sticky-postion">Points</th>
            <th className="sticky-postion">Games</th>
            <th className="sticky-postion">W</th>
            <th className="sticky-postion">L</th>
            <th className="sticky-postion">W[%]</th>
          </tr>
        </thead>
        <tbody>
          {teams
            .sort((a, b) => {
              return b.wins - a.wins;
            })
            .map(team => {
              return (
                <tr>
                  <td>{team.name}</td>
                  <td>{team.wins * 3}</td>
                  <td>{Number(team.wins) + Number(team.loses)} </td>
                  <td>{team.wins}</td>
                  <td>{team.loses}</td>
                  <td>
                    {team.wins == 0 && team.loses == 0
                      ? "0.00"
                      : (
                          (Number(team.wins) /
                            (Number(team.wins) + Number(team.loses))) *
                          100
                        ).toPrecision(3)}
                    %
                  </td>
                </tr>
              );
            })
            .sort()}
        </tbody>
      </table>
    );
  }

  render() {
    let p;
    let f;
    if (this.state.pingpongTeams) {
      p = this.getStandings(this.state.pingpongTeams);
    }
    if (this.state.foosballTeams) {
      f = this.getStandings(this.state.foosballTeams);
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

export default StandingsTab;
