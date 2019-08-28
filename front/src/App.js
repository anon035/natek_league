import React, {useState} from "react";
import "./scss/main.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import Schedule from "./Components/Schedule";
import Err from "./Components/Err";
import Footer from "./Components/Footer";
import Title from "./Components/Title";
import Playoff from "./Components/Playoff";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Fetch from './Components/Fetch';
import EditPlayers from "./Components/EditPlayers";
import StandingsTab from "./Components/StandingsTab";
import EditTab from "./Components/EditTab";

function App() {
  const [logged, setLogged] = useState(0);
  Fetch.isLogged().then(res => setLogged(res));
  return (
    <div className="wrapper">
      <Router>
        <header>
          <div className="ui pointing menu">
            <NavLink activeClassName="active" to="/" exact className="item">
              Home
            </NavLink>
            <NavLink
              to="/standings"
              pathname="standings"
              activeClassName="active"
              exact
              className="item"
            >
              Standings
            </NavLink>
            <NavLink
              onClick={e => {
                e.preventDefault();
              }}
              to="/playoff"
              className="disabled item"
            >
              Play-off
            </NavLink>
            {logged === true ? 
             [ <NavLink
              to="/editscore"
              className="item"
            >
              Edit Score
            </NavLink>,
            <NavLink
              to="/editplayers"
              className="item"
            >
              Edit Players
            </NavLink>
            ]
            : ""}
            <div className="right menu">
              <NavLink
                to={'/' + (logged ? 'logout' : 'login')}
                className="item"
              >
                {(logged ? 'Logout' : 'Login')}
              </NavLink>
            </div>
          </div>
          <Title />
        </header>

        <Switch>
          <Route path="/" exact component={Schedule} />
          <Route path="/standings" exact component={StandingsTab} />
          <Route path="/editscore" exact component={EditTab} />
          <Route path="/editplayers" exact component={EditPlayers} />
          <Route path="/playoff" exact component={Playoff} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/login" exact component={Login} />
          <Route component={Err} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
