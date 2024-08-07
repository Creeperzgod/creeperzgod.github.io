import React, { useState, useEffect } from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UserTableSearch from "./UserTableSearch";
import { fetchUsers } from "../services/userService";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке пользователей:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.age} ${user.gender} ${user.phone} ${user.address.city} ${user.address.address}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  return (
    <div className="user-table-container">
      <UserTableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <table className="user-table">
        <UserTableHeader />
        <tbody>
          {filteredUsers.map((user) => (
            <UserTableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
