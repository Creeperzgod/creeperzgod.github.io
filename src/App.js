import React from "react";
import UserTable from "./components/UserTable";
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <h1>Пользователи</h1>
      <UserTable />
    </div>
  );
}

export default App;
