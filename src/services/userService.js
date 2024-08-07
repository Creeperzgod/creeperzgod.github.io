export const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
      throw error;
    }
  };
  