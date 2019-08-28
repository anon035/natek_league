import React, { Component } from "react";

class Standings extends Component {
  render() {
    const players = [
      {
        name: "Gabriel",
        lastname: "Gembický",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Pavol",
        lastname: "Vodarčik",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Ladislav",
        lastname: "Arvay",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Tomáš",
        lastname: "Škrak",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Jozef",
        lastname: "Rosenberg",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Jakub",
        lastname: "Mizák",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Ján",
        lastname: "Mihalčin",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Lukáš",
        lastname: "Melicher",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Ondrej",
        lastname: "Gažo",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Stanislav",
        lastname: "Petruš",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Daniel",
        lastname: "Pastornický",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Marek",
        lastname: "Vangor",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Miloslav",
        lastname: "Kocúr",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Stanislav",
        lastname: "Vojtko",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Vladimír",
        lastname: "Kertis",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Aleš",
        lastname: "Vincenčík",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Marián",
        lastname: "Schwarz",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Marek",
        lastname: "Hrubčo",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Jakub",
        lastname: "Mokoš",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "František",
        lastname: "Dely",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      },
      {
        name: "Peter",
        lastname: "Urban",
        points: 0,
        games: 0,
        win: 0,
        lose: 0
      }
    ];

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
          {players.map(player => {
            return (
              <tr key={player.lastname}>
                <td>{`${player.name} ${player.lastname}`}</td>
                <td>{player.points}</td>
                <td>{player.games}</td>
                <td>{player.win}</td>
                <td>{player.lose}</td>
                <td>{(((player.win + player.lose) / 100 ) * player.win * 100).toPrecision(3) }%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Standings;
