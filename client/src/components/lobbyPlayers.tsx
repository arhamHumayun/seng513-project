import React from "react";
import { IPlayerStat } from "../interfaces/types";
import { Form, Row, Col, ProgressBar } from "react-bootstrap";
import '../index.css';

type PlayerProps = {
  playerStats: IPlayerStat[];
};

const noStyle = {
  listStyleType: 'none'
}

function avgCPM(cpmArr: number[]) {
  const sum = cpmArr.reduce((a, b) => a + b, 0);
  const avg = (sum / cpmArr.length) || 0;
  return Math.round(avg);
}

const LobbyPlayers: React.FC<PlayerProps> = (props) => (
  <ul style={noStyle}>
      {props.playerStats.map(playerStats => {
        // return <li>{player.name}</li>;
        return <li key={playerStats.user.name}><Row>
        <Col className="text-left" >
          <Form.Label className="playerText">{playerStats.user.name}</Form.Label>
        </Col>
        <Col xs={8}>
          <ProgressBar now={playerStats.progress} />
        </Col>
        <Col>
          <Form.Label className="playerText">{avgCPM(playerStats.cpm)} cpm</Form.Label>
        </Col>
      </Row></li>
      })}
    </ul>
);

export default LobbyPlayers;
