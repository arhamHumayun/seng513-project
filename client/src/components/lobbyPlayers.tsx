import React from "react";
import { IUser } from "../interfaces/types";
import { Form, Row, Col, ProgressBar } from "react-bootstrap";

type PlayerProps = {
  players: IUser[];
};

const noStyle = {
  listStyleType: 'none'
}

const LobbyPlayers: React.FC<PlayerProps> = (props) => (
  <ul style={noStyle}>
      {props.players.map(player => {
        // return <li>{player.name}</li>;
        return <li key={player.name}><Row>
        <Col className="text-left" >
          <Form.Label>{player.name}</Form.Label>
        </Col>
        <Col xs={8}>
          <ProgressBar now={0} />
        </Col>
        <Col>
          <Form.Label>0 cpm</Form.Label>
        </Col>
      </Row></li>
      })}
    </ul>
);

export default LobbyPlayers;
