// client/src/components/ChatRealTime.js
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ChatRealTime = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const webSocketRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    const newWebSocket = new WebSocket('ws://localhost:3001');

    newWebSocket.addEventListener('open', () => {
      console.log('WebSocket connection opened.');
    });

    // Save the WebSocket object in ref
    webSocketRef.current = newWebSocket;

    const handleWebSocketMessage = (event) => {
      const message = {
        text: event.data,
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Attach the event listener
    newWebSocket.addEventListener('message', handleWebSocketMessage);

    return () => {
      // Cleanup: remove the event listener and close the WebSocket when the component is unmounted
      newWebSocket.removeEventListener('message', handleWebSocketMessage);
      newWebSocket.close();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      return;
    }

    // Check if the WebSocket connection is open
    if (webSocketRef.current.readyState === WebSocket.OPEN) {
      // Send the new message to the WebSocket server
      webSocketRef.current.send(newMessage);
    } else {
      console.error('WebSocket connection is not open.');
      // Handle the case where the WebSocket connection is not open
    }

    // Update the local state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: 'user' },
    ]);

    // Clear the input field
    setNewMessage('');
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Real-Time Chat</h2>
      <Container>
        <Row>
          <Col>
            <div className="chat-window" ref={chatWindowRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-bubble ${
                    message.sender === 'bot' ? 'bot' : 'user'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <i className="fa-solid fa-user-tie"></i>
                  ) : (
                    <i
                      className="fa-solid fa-user"
                      style={{ marginRight: '5px' }}
                    ></i>
                  )}
                  {message.text}
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <div className="message-input">
          <Form onSubmit={handleMessageSubmit} style={{ width: '100%' }}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Send
                </Button>
                <span> Chat Real Time </span>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ChatRealTime;
