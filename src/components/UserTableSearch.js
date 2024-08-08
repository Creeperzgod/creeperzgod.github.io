import React from "react";
import "../styles/UserTableSearch.scss";

const UserTableSearch = ({ searchQuery, setSearchQuery }) => {
  // Обрабатывает изменение текста в поле ввода
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); // Обновляет состояние поискового запроса
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchQuery} // Значение поля ввода
        onChange={handleInputChange} // Событие изменения текста
        className="search-input"
      />
    </div>
  );
};

export default UserTableSearch;
