import { useEffect, useState } from 'react'
import axios from "axios";
import { useFormik } from 'formik'
import { Button } from '@chakra-ui/react'
import { Input, Select, FormControl, FormLabel, FormErrorMessage, SimpleGrid, Box, Text } from '@chakra-ui/react'
import styles from '../styles/RegisterUser.module.css'


const RegisterForm = props => {

    const [countriesArray, setCountriesArray] = useState([])

    //this sideEffect fetches the list of countries.
    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name,alpha2Code')
            .then((response) => {
                setCountriesArray(response.data)
                // console.log(countriesArray)
            }).catch((err) => {
                console.log('error getting countries.', err)
            })
    }, []);

    const formik = useFormik({
        initialValues: {
            sicCodeType: '',
            sicCode: '',
            firstName: '',
            lastName: '',
            nationality: '',
            mobilePhone: '',
            email: '',
            createdBy: 'JFO'
        },
        onSubmit: (userObj, actions) => {
            if (userObj.sicCodeType === '' ||
                userObj.sicCode === '' ||
                userObj.firstName.trim().length === 0 ||
                userObj.lastName.trim().length === 0 ||
                userObj.nationality.trim().length === 0 ||
                userObj.mobilePhone.match(/\d/g).length !== 10
            ) {
                alert('Hay datos inválidos, verifica de nuevo por favor.')
                return;
            }
            // console.log('formik userObj', userObj)
            props.setCreatedUser(userObj)
            props.postUser(userObj)
            formik.resetForm()
        }
    })

    return (
        <>
            <Box p={10}>

                <Text fontSize='5xl'>Registro de Usuarios</Text>
                <form onSubmit={formik.handleSubmit}>
                    <SimpleGrid columns={2} spacing={5}>


                        <FormControl>
                            <FormLabel htmlFor='sicCodeType'>Tipo de documento:</FormLabel>
                            <Select id="sicCodeType" name="sicCodeType" value={formik.values.sicCodeType} onChange={formik.handleChange}>
                                <option value="">-- Seleccione --</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="PS">Pasaporte</option>
                                <option value="CE">Cédula de Extranjería</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='sicCode'>Identificación:</FormLabel>
                            <Input id="sicCode"
                                type="number"
                                value={formik.values.sicCode}
                                onChange={formik.handleChange} />
                        </FormControl>


                        <FormControl>
                            <FormLabel htmlFor='firstName'>Nombre(s):</FormLabel>
                            <Input id="firstName"
                                type="text"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange} />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='lastName'>Apellidos:</FormLabel>
                            <Input id="lastName"
                                type="text"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange} />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='nationality'>Nacionalidad:</FormLabel>
                            <Select id="nationality"
                                name="nationality"
                                value={formik.values.nationality}
                                onChange={formik.handleChange}>
                                <option value="">-- Seleccione --</option>
                                {countriesArray.map(country =>
                                    <option value={country.name} key={country.alpha2Code}>{country.name}</option>)}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='mobilePhone'>Celular:</FormLabel>
                            <Input id="mobilePhone"
                                type="text"
                                name="mobilePhone"
                                pattern="[0-9]{10}"
                                title="El número celular debe ser de 10 dígitos"
                                value={formik.values.mobilePhone}
                                onChange={formik.handleChange} />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='emailInput'>Email:</FormLabel>
                            <Input id="email"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange} />
                        </FormControl>

                        <Button colorScheme='blue' type="submit">+Agregar</Button>
                    </SimpleGrid>
                </form>
            </Box>
        </>
    )
}

export default RegisterForm;