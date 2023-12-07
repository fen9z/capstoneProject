import { PrettyChatWindow } from 'react-chat-engine-pretty';

const ChatsPage = (props) => {
  console.log(props);
  const adminUsername = 'admin@admin.com';

  // 聊天室 ID（这里使用一个示例的聊天室 ID，你需要替换为实际的聊天室 ID）
  const chatRoomId = '217716';

  return (
    <div style={{ height: '100vh' }}>
      <PrettyChatWindow
        projectId="26951526-767e-4e71-aae4-c827f0b9fc2e"
        username={props.user.email} // adam
        secret={props.user.email} // pass1234
        chatID={chatRoomId}
        isDirectChat={false} // 不是直接聊天
        adminUsername={adminUsername}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default ChatsPage;
