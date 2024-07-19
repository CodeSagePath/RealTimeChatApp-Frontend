const Message = ({ message }) => {
  return (
    <li>
      <strong>{message.author}</strong>: {message.content}
    </li>
  );
};

export default Message;
