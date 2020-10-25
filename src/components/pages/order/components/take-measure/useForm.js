import {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {initialState} from './variables'

import {handleService} from '../../../../../helpers';
import {getSteed, updateSteed} from '../../../../../services/steed'

export default function useForm(){
    const [state, setState] = useState(initialState)
    const [tel, setTel] = useState({
        isValid: null,
        value:"",
        country: {},
        formattedValue:"",
    })
    const history = useHistory()
    const location = useLocation()
    const params = useParams()

    useEffect(() => {
        if(location.state && location.state.steed){
            const defaultValues = {
                firstName: location.state.steed.nom,
                lastName: location.state.steed.prenom,
                email: location.state.steed.email,
                address: location.state.steed.Adresse_geographique || "",
                zone: location.state.steed.Zone_intervention || "",
                password: '',
                passwordConfirmation: '', 
            };

            setState(state => ({...state, defaultValues}))
            setTel(tel => ({...tel, value: location.state.steed.numero || ""}))
        }else{
            handleService(getSteed, params.id, (response) => {
                const defaultValues = {
                    firstName: response.nom,
                    lastName: response.prenom,
                    email: response.email,
                    address: response.Adresse_geographique || "",
                    zone: response.Zone_intervention || "",
                    password: '',
                    passwordConfirmation: '', 
                };
    
                setState(state => ({...state, defaultValues}))
                setTel(tel => ({...tel, value: response.numero || ""}))
            })
        }
    }, [location.state, params.id])

    function handleValidSubmit(event, values){
        if(values.password && values.passwordConfirmation !== values.password){
            toast.error("Les mots de passe ne sont pas identiques", {autoClose: false})
        }else{
            setState(state => ({...state, isLoading: true})) 

            const data = {
                ...values,
                "nom":values.lastName,
                "prenom":values.firstName,
                "Adresse_geographique":values.address,
                "Zone_intervention":values.zone,
                "numero":tel.value,
            };

            handleService(updateSteed, {data, id: params.id}, 
                (response) => {
                    toast.success(response.msg)
                    setState(state => ({...state, isLoading: false }));

                    history.push('/coursiers')
                },
                () => {
                    setState(state => ({...state, isLoading: false }));
                }
            )
        }
    }

    return {
        state,
        handleValidSubmit,
        setTel, tel
    }
}