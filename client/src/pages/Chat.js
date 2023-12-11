// client/src/pages/Chat.js
import React, { useState } from 'react';
import ChatBot from '../components/ChatBot';
import ChatRealTime from '../components/ChatRealTime';

const Chat = () => {
  const [showChatBot, setShowChatBot] = useState(true);

  const handleSwitchToRealTime = () => {
    setShowChatBot(false);
  };

  return (
    <div>
      {showChatBot ? (
        <ChatBot onSwitchToRealTime={handleSwitchToRealTime} />
      ) : (
        <ChatRealTime />
      )}
    </div>
  );
};

export default Chat;
