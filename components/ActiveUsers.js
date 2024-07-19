const ActiveUsers = ({ users }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">Active Users</h2>
      <ul className="border rounded-lg p-4 h-32 overflow-y-scroll">
        {users.map((user, index) => (
          <li key={index} className="border-b py-2">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;
