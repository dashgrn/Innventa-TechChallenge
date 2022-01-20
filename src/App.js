import { useState } from 'react'
import RegisterForm from "./components/RegisterForm";
import ListUsers from "./components/ListUsers";

function App() {

  const [usersList, setUsersList] = useState([])

  return (
    <>
      <RegisterForm />
      <ListUsers/>
    </>
  );
}

export default App;