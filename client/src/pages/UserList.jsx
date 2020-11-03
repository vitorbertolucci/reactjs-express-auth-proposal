import React, { useEffect, useState } from "react";

import api from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await api.get("users");
        setUsers(result.data.users);
      } catch (err) {}
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users list</h1>
      {users.map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
    </div>
  );
};

export default UserList;
