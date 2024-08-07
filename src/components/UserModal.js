import React from "react";

const UserModal = ({ user, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <p>Возраст: {user.age}</p>
        <p>Пол: {user.gender}</p>
        <p>Номер телефона: {user.phone}</p>
        <p>Email: {user.email}</p>
        <p>Адрес: {`${user.address.city}, ${user.address.address}`}</p>
        <p>Рост: {user.height} см</p>
        <p>Вес: {user.weight} кг</p>
      </div>
    </div>
  );
};

export default UserModal;
