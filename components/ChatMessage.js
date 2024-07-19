const ChatMessage = ({ message }) => {
  return (
    <div className="border-b py-2">
      <strong>{message.username}:</strong> {message.content}
    </div>
  );
};

export default ChatMessage;
