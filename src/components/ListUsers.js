import { useEffect, useState } from "react"
import axios from "axios"
import styles from '../styles/ListUsers.module.css'
import { Text } from '@chakra-ui/react'


const ListUsers = props => {

    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        axios.get('http://144.217.88.168:3030/api/user')
            .then(response => {
                // console.log(response.data.data)
                //FILTERING USERS (ONLY SHOWING THE ONES I CREATED)
                let filteredUsers = response.data.data.filter(user => user.createdBy === 'JFO')
                setUsersList(filteredUsers)
            })
            .catch(err => {
                console.log('error getting users list', err)
            })
    }, [props.createdUser]);


    return (
        <div className={styles.list_users}>
            <Text fontSize='3xl' m={3}>Usuarios actualmente Registrados</Text>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>Documento </td>
                        <td>Nombre Completo</td>
                        <td>Nacionalidad</td>
                        <td>Celular</td>
                        <td>Email</td>
                    </tr>
                    {usersList.map((user) => (
                            <tr key={user.id}>
                                <td>{user.sicCode}</td>
                                <td>{user.completeName}</td>
                                <td>{user.nationality}</td>
                                <td>{user.mobilePhone}</td>
                                <td>{user.email}</td>
                            </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListUsers