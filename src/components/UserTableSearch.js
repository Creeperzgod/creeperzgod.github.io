import React from "react";

const UserTableSearch = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default UserTableSearch;
