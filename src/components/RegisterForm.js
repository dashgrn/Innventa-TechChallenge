import {useEffect, useState} from 'react'
import axios from "axios";
import { useFormik } from 'formik'

const RegisterForm = () => {

    const [countriesArray, setCountriesArray] = useState([])

    const [userInputs, setUserInputs] = useState({})

    //this sideEffect fetches the list of countries.
    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name,alpha2Code')
            .then((response) => {
                setCountriesArray(response.data)
                console.log(countriesArray)
            }).catch((err) =>{
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
        }
    })

    return (
        <>
            <h1>Registro de Usuarios</h1>
            <form>
                <label htmlFor="docType">Tipo de documento</label>
                <select id="docType" name="Tipo de documento">
                    <option value="">-- Seleccione --</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="PS">Pasaporte</option>
                    <option value="CE">Cédula de Extranjería</option>
                </select>

                <label htmlFor="docNumber">Identificación</label>
                <input id="docNumber" type="number"/>

                <label htmlFor="nameInput">Nombre(s)</label>
                <input id="nameInput" type="text"/>

                <label htmlFor="lastNameInput">Apellidos</label>
                <input id="lastNameInput" type="text"/>

                <label htmlFor="nationInput">Nacionalidad</label>
                <select id="nationInput" name="Tipo de documento">
                    <option value="">-- Seleccione --</option>
                    {countriesArray.map(country =>
                    <option value={country.name} key={country.alpha2Code}>{country.name}</option>)}
                </select>

                <label htmlFor="celNumberInput">Celular</label>
                <input id="celNumberInput" type="text"/>

                <label htmlFor="emailInput">Email</label>
                <input id="emailInput" type="text"/>

                <button type="submit">+Agregar</button>
            </form>
        </>
    )
}

export default RegisterForm;