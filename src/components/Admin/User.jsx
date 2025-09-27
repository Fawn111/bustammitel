import React, { useEffect, useState } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  return (
<div>
    <p>User</p>
</div>
  );
};

export default User;
