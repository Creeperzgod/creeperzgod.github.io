import React, { useState, useEffect } from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UserTableSearch from "./UserTableSearch";
import { fetchUsers, fetchFilteredUsers } from "../services/userService";
import "../styles/UserTable.scss";

const UserTable = () => {
  // Состояния для хранения пользователей, отфильтрованных пользователей, поискового запроса, состояния загрузки и ошибок
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Ключи для поиска по разным полям пользователя
  const searchKeys = ["firstName", "lastName", "age", "gender", "phone", "address.city", "address.address"];

  // Эффект для загрузки пользователей при монтировании компонента
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError("Ошибка при загрузке пользователей");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Эффект для фильтрации пользователей при изменении поискового запроса
  useEffect(() => {
    const fetchFilteredData = async () => {
      if (!searchQuery) {
        setFilteredUsers(users); // Если запрос пуст, возвращаем полный список
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const promises = searchKeys.map(key =>
          fetchFilteredUsers(key, searchQuery)
        );

        const results = await Promise.all(promises);
        const allUsers = results.flat();
        // Удаление дубликатов пользователей по id
        const uniqueUsers = Array.from(new Set(allUsers.map(user => user.id)))
          .map(id => allUsers.find(user => user.id === id));

        setFilteredUsers(uniqueUsers);
      } catch (error) {
        setError("Ошибка при фильтрации пользователей");
      } finally {
        setLoading(false);
      }
    }

    // Задержка в 500 мс перед фильтрацией
    const timeoutId = setTimeout(fetchFilteredData, 500);

    return () => clearTimeout(timeoutId); // Очистка таймера при изменении запроса
  }, [searchQuery, users]);

  // Эффект для сортировки пользователей при изменении конфигурации сортировки
  useEffect(() => {
    const sortedUsers = (users) => {
      let sortedUsers = [...users];
      if (sortConfig.key && sortConfig.direction !== 'none') {
        sortedUsers.sort((a, b) => {
          let aValue, bValue;

          if (sortConfig.key === 'address') {
            // Сортировка по адресу
            aValue = `${a.address.city} ${a.address.address}`;
            bValue = `${b.address.city} ${b.address.address}`;
          } else {
            aValue = a[sortConfig.key];
            bValue = b[sortConfig.key];
          }

          // Определение порядка сортировки
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return sortedUsers;
    };

    setFilteredUsers(sortedUsers(users));
  }, [sortConfig, users]); // Добавляем users, чтобы сортировка обновлялась при изменении пользователей

  // Функция для запроса сортировки
  const requestSort = (key) => {
    let direction = 'asc';

    // Переключаем состояние сортировки
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : (sortConfig.direction === 'desc' ? 'none' : 'asc');
    }

    setSortConfig({ key, direction });
  };

  return (
    <div className="user-table-container">
      <UserTableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      <table className="user-table">
        <UserTableHeader requestSort={requestSort} sortConfig={sortConfig} />
        <tbody>
          {filteredUsers.map(user => (
            <UserTableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
