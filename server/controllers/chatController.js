// server/controllers/chatController.js
const processUserMessage = async (userMessage) => {
  // 将用户消息转换为小写以进行比较
  const lowerCaseMessage = userMessage.toLowerCase();

  // 判断用户意图
  // 问候客户
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
    return 'Hello! Welcome to our customer support. How can I assist you today?';
  }

  // 提问客户有什么可以帮助的
  if (lowerCaseMessage.includes('help')) {
    return 'Of course! I am here to help. What can I do for you today?';
  }
  if (
    lowerCaseMessage.includes('help') ||
    lowerCaseMessage.includes('support')
  ) {
    return 'Sure, I can help you with that. Please provide more details about your issue.';
  } else if (
    lowerCaseMessage.includes('order') ||
    lowerCaseMessage.includes('product')
  ) {
    return 'I can assist you with information about orders and products. What specific details do you need?';
  } else {
    return "I'm sorry, I didn't understand that. Can you please rephrase?";
  }
};

module.exports = {
  processUserMessage,
};
