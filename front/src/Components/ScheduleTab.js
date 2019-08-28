import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Fetch from "./Fetch";
import SingleWeek from "./SingleWeek";

class TabExampleActiveIndex extends Component {
  constructor() {
    super();

    this.state = {
      seasons: {},
      activeIndex: 0
    };
  }

  componentDidMount() {
    let currentYear = new Date().getFullYear();
    Fetch.get("season").then(data =>
      this.setState({
        seasons: {
          p: data.data.p[currentYear].weeks,
          f: data.data.f[currentYear].weeks
        }
      })
    );
  }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value });
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  getSchedule(weeks) {
    return weeks.map(item => {
      return (
        <SingleWeek
          key={item.id}
          id={item.id}
          winner={0}
          matches={item.matches}
          name={item.name}
        />
      );
    });
  }

  render() {
    let p;
    let f;
    if (this.state.seasons && this.state.seasons.p) {
      p = this.getSchedule(this.state.seasons.p);
    }
    if (this.state.seasons && this.state.seasons.f) {
      f = this.getSchedule(this.state.seasons.f);
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

export default TabExampleActiveIndex;
