import React, { useState } from "react";
import UserModal from "./UserModal";

// Компонент строки таблицы для отображения информации о пользователе
const UserTableRow = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для переключения состояния модального окна
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <tr onClick={toggleModal}>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.age}</td>
        <td>{user.gender}</td>
        <td>{user.phone}</td>
        <td>{`${user.address.city}, ${user.address.address}`}</td>
      </tr>
      {isModalOpen && <UserModal user={user} closeModal={toggleModal} />}
    </>
  );
};

export default UserTableRow;
