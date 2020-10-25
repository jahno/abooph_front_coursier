import React, { Fragment } from 'react'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {connect} from "react-redux";
import { Button } from 'reactstrap';

import PhoneInput from '../../../../common/phone-input'
import { updateProfile } from '../../../../../redux/actions'

import useForm from './useForm'

export function UpdateProfile ({user, updateProfile}) {
    const { state, setTel, tel, onChangeImage, handleValidSubmit, images, defaultValues } = useForm(user, updateProfile)
    
    return (
        <Fragment>
            <AvForm className="needs-validation add-product-form" onValidSubmit={handleValidSubmit} model={defaultValues}>
                <div className="form form-label-center">
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Nom</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="lastName" 
                                type="text" 
                                validate={{
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner votre nom'},
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
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner votre prénom'},
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
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner votre email'},
                                    email: {value: true, errorMessage: "Votre email est invalide"},
                                    minLength: {value: 10, errorMessage: "Votre email est invalide"},
                                    maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Téléphone</label>
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
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Adresse</label>
                        <div className="col-xl-8 col-sm-7">
                            <AvField 
                                className="form-control"
                                name="address" 
                                type="text" 
                                validate={{
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner votre adresse géographique'},
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
                                    required: {value: true, errorMessage: 'Svp veuillez renseigner votre Zone intervention'},
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Photo</label>
                        <div className="col-xl-8 col-sm-7">
                            <input 
                                className="form-control" 
                                type="file"
                                onChange={onChangeImage} 
                                name='avatar' 
                                accept=".jpg, .jpeg, .png"
                            />
                            <div>
                                {images.isLoading ? 'En cours de compression...' : ''}
                            </div>

                            <div style={{color: 'red'}}>
                                {images.isLoading === false && !images.image ? "Aucune image" : ''}
                            </div>
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

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
    }
}

export default connect(mapStateToProps, {updateProfile})(UpdateProfile);