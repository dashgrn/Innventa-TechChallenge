import { useState } from 'react'
import RegisterForm from "./components/RegisterForm";
import ListUsers from "./components/ListUsers";
import axios from "axios";
import { useToast } from '@chakra-ui/react'

function App() {

  const toast = useToast()

  const [createdUser, setCreatedUser] = useState({});

  const postUser = (userObj) => {
    let data = JSON.stringify(userObj)
    const postConfig = {
      method: 'post',
      url: 'http://144.217.88.168:3030/api/user',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    console.log('user created with data:', userObj)
    axios(postConfig)
      .then(function (response) {
        console.log(JSON.stringify('POST OK:', response.data));
        toast({
          title: 'Cuenta creada.',
          description: "Tu cuenta ha sido creada exitosamente.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(function (error) {
        console.log('POST ERROR:', error);
      });
  }

  return (
    <>
      <RegisterForm postUser={postUser} setCreatedUser={setCreatedUser} />
      <ListUsers createdUser={createdUser} />
    </>
  );
}

export default App;