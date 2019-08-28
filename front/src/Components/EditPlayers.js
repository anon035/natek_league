import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Fetch from "./Fetch";
import Pingpong from './Pingpong';
import Foosball from './Foosball';

class EditPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }
  componentDidMount() {
    Fetch.get("team").then(res => this.setState({teams: res.data}));
  }

  render() {
    const panes = [
      {
        menuItem: "Pingpong",
        render: () => (
          <Tab.Pane>
            <div id="test">
              <Pingpong list={this.state.teams.p ? this.state.teams.p : []} />
            </div>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Foosball",
        render: () => (
          <Tab.Pane>
            <div id="test">
              <Foosball list={this.state.teams.f ? this.state.teams.f : []} />
            </div>
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

export default EditPlayers;
