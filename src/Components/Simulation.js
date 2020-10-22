import React, { useState } from "react";
import lintasan from "../assets/lintasan.jpg";
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";

function Simulation() {
  const [pl1, setPl1] = useState({
    key: "pl1",
    profile: { name: "Player 1", chance: 2, step: 4 },
    position: { start: [572, 380] },
  });

  const [pl2, setPl2] = useState({
    key: "pl2",
    profile: { name: "Player 2", chance: 1, step: 3 },
    position: { start: [595, 396] },
  });

  const [pl3, setPl3] = useState({
    key: "pl3",
    profile: { name: "Player 3", chance: 3, step: 4 },
    position: { start: [614, 409] },
  });

  const [pl4, setPl4] = useState({
    key: "pl4",
    profile: { name: "Player 4", chance: 1, step: 1 },
    position: { start: [635, 420] },
  });

  const [pl5, setPl5] = useState({
    key: "pl5",
    profile: { name: "Player 5", chance: 2, step: 3 },
    position: { start: [660, 428] },
  });

  const [pl6, setPl6] = useState({
    key: "pl6",
    profile: { name: "Player 6", chance: 1, step: 4 },
    position: { start: [686, 432] },
  });

  const [pl7, setPl7] = useState({
    key: "pl7",
    profile: { name: "Player 7", chance: 5, step: 2 },
    position: { start: [715, 432] },
  });

  const [pl8, setPl8] = useState({
    key: "pl8",
    profile: { name: "Player 8", chance: 2, step: 2 },
    position: { start: [745, 430] },
  });

  const players = [
    { get: pl1, set: setPl1 },
    { get: pl2, set: setPl2 },
    { get: pl3, set: setPl3 },
    { get: pl4, set: setPl4 },
    { get: pl5, set: setPl5 },
    { get: pl6, set: setPl6 },
    { get: pl7, set: setPl7 },
    { get: pl8, set: setPl8 },
  ];

  const handleSimulation = (e) => {
    const randPlayer = Math.floor(Math.random() * players.length);
    const player = players[randPlayer];
    const { get, set } = player;
    const { chance, step } = get.profile;
    const { start } = get.position;
    const [startX, startY] = start;
    const moveX = 2.4;
    const moveY = 0.8;

    for (let moves = 1; moves <= chance; moves++) {
      const timeout = 500 * moves;
      let stepX = 0;
      let stepY = 0;

      for (let steps = 1; steps <= step; steps++) {
        stepX += moveX * steps;
        stepY += moveY * steps;
      }

      setTimeout(() => {
        const starts =
          startX < 590
            ? [startX + stepX, startY]
            : startX < 630
            ? [startX + stepX, startY - stepY]
            : startX < 630
            ? [startX + stepX * 0.8, startY - stepY * 2]
            : [startX + stepX * 0.65, startY - stepY * 2];

        set({
          key: get.key,
          profile: get.profile,
          position: {
            start: starts,
          },
        });
      }, timeout);
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: "5",
          fontSize: "12px",
          color: "#000",
        }}
      >
        <Card style={{ width: "14rem" }}>
          <ListGroup className="list-group-flush">
            {players.map(({ get }, i) => {
              const { key, profile } = get;

              return (
                <ListGroup.Item key={key}>
                  {profile.name} {`(${profile.chance}, ${profile.step})`}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </div>
      <div
        style={{
          position: "relative",
          display: "block",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "20px",
          marginBottom: 15,
        }}
      >
        {players.map(({ get }, i) => {
          const { key, position } = get;
          const start = position.start;

          return (
            <span
              key={key}
              style={{
                fontSize: "10px",
                color: "#edf22a",
                position: "absolute",
                left: start[0] + "px",
                top: start[1] + "px",
              }}
            >
              <i className="fas fa-user"></i>
            </span>
          );
        })}
        <img src={lintasan} className="App-logo" alt="logo" />
      </div>
      <ButtonGroup aria-label="Basic example">
        <Button variant="danger">Ulang</Button>
        <Button variant="success" onClick={handleSimulation}>
          Simulasikan
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
}
export default Simulation;
