import React from "react";
import { useState } from 'react';
import { Form, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3002"

function Progress() {

  const user = localStorage.getItem("user"); // get user from browser storage
  let userObj: { name: string; _id: string; } | null = null;
  if (user != null) {
    userObj = JSON.parse(user);
  }

  let players: any[] = [];
  retrievePlayers();
  async function retrievePlayers() {
    try {
        const response = await axios.get('/lobby/getLobby/' + userObj!._id);
        players = response.data.players;
        console.log(players)
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <Container>
      {players.map((val, key) => {
        return (
          <Row>
            <Col className="text-left">
              <Form.Label>Racer 1 (you)</Form.Label>
            </Col>
            <Col xs={8}>
              <ProgressBar now={55} />
            </Col>
            <Col>
              <Form.Label>48 wpm</Form.Label>
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

export default Progress;