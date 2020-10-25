import React, {Fragment} from 'react'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

import PhoneInput from '../../../../common/phone-input'

import useForm from './useForm'

export default function UpdateSteedForm () {
    const { state, setTel, tel, handleValidSubmit} = useForm()

    if(!state.defaultValues){
        return (
            <Fragment>
                veuillez patienter ...
            </Fragment>
        )
    }
    
    return (
        <Fragment>
            <AvForm className="needs-validation add-product-form" onValidSubmit={handleValidSubmit} model={state.defaultValues}>
                <div className="form form-label-center">
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Nom</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="lastName" 
                                type="text" 
                                validate={{
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner le nom'},
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Prénom</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="firstName" 
                                type="text" 
                                validate={{
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner le prénom'},
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Email</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="email" 
                                type="email" 
                                validate={{
                                    required: {value: true, errorMessage: "Svp veuillez renseigner l'email"},
                                    email: {value: true, errorMessage: "l'email est invalide"},
                                    minLength: {value: 10, errorMessage: "l'email est invalide"},
                                    maxLength: {value: 30, errorMessage: "l'email est invalide"}
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Adresse</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="address" 
                                type="text" 
                                validate={{
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner les coordonnées'},
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Zone</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="zone" 
                                type="text" 
                                validate={{
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner les coordonnées'},
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span></span> Téléphone</label>
                        <div className="col-xl-8 col-sm-7">
                            <PhoneInput
                                country={'ci'} 
                                required={true}
                                requiredText="Svp veuillez renseigner votre numéro"                      
                                value={tel}
                                isValid={() => setTel(tel => ({...tel, isValid: true}))}
                                onChange={(value, country, formattedValue) => 
                                    setTel(tel => ({
                                        ...tel, 
                                        value,
                                        country,
                                        formattedValue,
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span></span> Mot de passe</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="password" 
                                type="password"  
                                validate={{
                                    // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Le mot de passe doit être composé uniquement de lettres et de chiffres'},
                                    minLength: {value: 6, errorMessage: "Le mot de passe doit être entre 6 et 30 caractères"},
                                    maxLength: {value: 30, errorMessage: "Le mot de passe doit être entre 6 et 30 caractères"},
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span></span> Confirmer mot de passe</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="passwordConfirmation" 
                                type="password"  
                                validate={{
                                    // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Le mot de passe doit être composé uniquement de lettres et de chiffres'},
                                    minLength: {value: 6, errorMessage: "Le mot de passe doit être entre 6 et 30 caractères"},
                                    maxLength: {value: 30, errorMessage: "Le mot de passe doit être entre 6 et 30 caractères"},
                                }} 
                            />
                        </div>
                    </div>
                </div>
                <div className="offset-xl-3 offset-sm-4">
                    <Button 
                        color="primary" 
                        className="btn btn-primary"
                        disabled={state.isLoading}
                    >
                        {state.isLoading ? "Veuillez patienter ..." : "Modifier"}
                    </Button>
                </div>
            </AvForm>
        </Fragment>
    )
}
