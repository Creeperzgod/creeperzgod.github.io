import React from "react";

const UserTableHeader = ({ requestSort, sortConfig }) => {
  // Определяет класс для сортировки
  const getClassNameFor = (name) => {
    if (!sortConfig.key) {
      return 'no-sort';
    }
    return sortConfig.key === name ? (sortConfig.direction === 'asc' ? 'asc' : (sortConfig.direction === 'desc' ? 'desc' : 'no-sort')) : 'no-sort';
  };

  return (
    <thead>
      <tr>
        <th
          onClick={() => requestSort('firstName')} // Обработка клика для сортировки по имени
          className={getClassNameFor('firstName')} // Класс для текущей конфигурации сортировки
        >
          ФИО
        </th>
        <th
          onClick={() => requestSort('age')}
          className={getClassNameFor('age')}
        >
          Возраст
        </th>
        <th
          onClick={() => requestSort('gender')}
          className={getClassNameFor('gender')}
        >
          Пол
        </th>
        <th className="no-sort">
          Номер телефона
        </th>
        <th
          onClick={() => requestSort('address')}
          className={getClassNameFor('address')}
        >
          Адрес
        </th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
