export const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      
      // Проверка успешности ответа
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      // Преобразование ответа в формат JSON
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
      throw error;
    }
  };
  
  export const fetchFilteredUsers = async (key, value) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/users/filter?key=${key}&value=${value}`
      );

      // Проверка успешности ответа
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      // Преобразование ответа в формат JSON
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error(`Ошибка при фильтрации пользователей по ключу ${key}:`, error);
      throw error;
    }
  };