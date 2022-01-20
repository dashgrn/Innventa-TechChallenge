import { useEffect, useState } from 'react'
import axios from "axios";
import { useFormik } from 'formik'
import { Button } from '@chakra-ui/react'
import { Input, Select, FormControl, FormLabel, FormErrorMessage, SimpleGrid, Box, Text } from '@chakra-ui/react'

const RegisterForm = props => {

    const [countriesArray, setCountriesArray] = useState([])

    const [userInputs, setUserInputs] = useState({})

    //this sideEffect fetches the list of countries.
    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name,alpha2Code')
            .then((response) => {
                setCountriesArray(response.data)
                console.log(countriesArray)
            }).catch((err) => {
                console.log('error getting countries.', err)
            })
    }, []);

    const formik = useFormik({
        initialValues: {
            docType: '',
            docNumber: '',
            nameInput: '',
            lastNameInput: '',
            nationInput: '',
            celNumberInput: '',
            emailInput: ''
        },
        onSubmit: (userObj, actions) => {
            console.log('formik userObj', userObj)

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
                            <FormLabel htmlFor='docType'>Tipo de documento:</FormLabel>
                            <Select id="docType" name="docType" value={formik.values.docType} onChange={formik.handleChange}>
                                <option value="">-- Seleccione --</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="PS">Pasaporte</option>
                                <option value="CE">Cédula de Extranjería</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='docNumber'>Identificación:</FormLabel>
                            <Input id="docNumber"
                                type="number"
                                value={formik.values.docNumber}
                                onChange={formik.handleChange} />
                        </FormControl>


                        <FormControl>
                            <FormLabel htmlFor='nameInput'>Nombre(s):</FormLabel>
                            <Input id="nameInput" type="text" name="nameInput" value={formik.values.nameInput} onChange={formik.handleChange} />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='lastNameInput'>Apellidos:</FormLabel>
                            <Input id="lastNameInput" type="text" name="lastNameInput" value={formik.values.lastNameInput} onChange={formik.handleChange} />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='nationInput'>Nacionalidad:</FormLabel>
                            <Select id="nationInput" name="nationInput" value={formik.values.nationInput} onChange={formik.handleChange}>
                                <option value="">-- Seleccione --</option>
                                {countriesArray.map(country =>
                                    <option value={country.name} key={country.alpha2Code}>{country.name}</option>)}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='celNumberInput'>Celular:</FormLabel>
                            <Input id="celNumberInput" type="number" name="celNumberInput" value={formik.values.celNumberInput} onChange={formik.handleChange} />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='emailInput'>Email:</FormLabel>
                            <Input id="emailInput" type="email" name="emailInput" value={formik.values.emailInput} onChange={formik.handleChange} />
                        </FormControl>

                        <Button colorScheme='blue' type="submit">+Agregar</Button>
                    </SimpleGrid>
                </form>
            </Box>
        </>
    )
}

export default RegisterForm;