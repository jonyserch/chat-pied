import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Messages from './message-view';
import EditText from './EditText';
import ConversationList from './conversationlist';
import '../style/App.css';

const App = () => (
  <Container>
    <Col xs="6" sm="2">
      <Row>
        <h1>Chats</h1>
      </Row>
      <Row>
        <ConversationList />
      </Row>
    </Col>
    <Col>
      <Row>
        <Messages />
      </Row>
      <Row>
        <EditText />
      </Row>
    </Col>
  </Container>
);
export default App;
