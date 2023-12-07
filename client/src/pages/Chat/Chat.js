// import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Chat.css';
// import AuthPage from './authPage';
import ChatsPage from './chatsPage';

function Chat() {
  // const [user, setUser] = useState();
  const { user } = useAuthContext();

  return <ChatsPage user={user} />;
}

export default Chat;
