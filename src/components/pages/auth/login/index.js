import {connect} from "react-redux";
import React, { useState } from 'react';
import { User } from 'react-feather';
import { Redirect } from 'react-router-dom';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

import Layout from '../../../layout/auth';

import { signInUser } from '../../../../services/auth'
import {handleService} from '../../../../helpers';
import { signIn } from '../../../../redux/actions'

const initialState = {
  isLoading: false,
};

function Login({signIn, isAuthenticated, location}) {
    const [state, setState] = useState(initialState)
    
    function handleValidSubmit(event, values){
      setState(state => ({...state, isLoading: true }));
      
      handleService(signInUser, values.login, signIn, () => {
        setState(state => ({...state, isLoading: false }));
      })
    }

    const {from} = location.state || {from: {pathname: "/"}};
  
    if(isAuthenticated){
      return <Redirect to={from}/>;
    } 
  
    return (
        <Layout>
            <AvForm onValidSubmit={handleValidSubmit}>
                <form className="form-horizontal auth-form">
                    <h3><User/> Login</h3>

                    <div className="form-group">
                        <AvField 
                            name="login[email]" 
                            type="email" 
                            placeholder="Votre email" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre email'},
                                email: {value: true, errorMessage: "Votre email est invalide"},
                                minLength: {value: 10, errorMessage: "Votre email est invalide"},
                                maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                            }} 
                        />

                        {/*<input required="" name="login[username]" type="email" className="form-control" placeholder="Username" id="exampleInputEmail1" />*/}
                    </div>
                    <div className="form-group">
                        <AvField 
                            name="login[password]" 
                            type="password" 
                            placeholder="Votre mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                pattern: {value: '^[A-Za-z0-9]+$', errorMessage: ""},
                                minLength: {value: 4, errorMessage: "Votre mot de passe doit être entre 4 et 50 caractères"},
                                maxLength: {value: 50, errorMessage: "Votre mot de passe doit être entre 4 et 50 caractères"}
                            }} 
                        />

                        {/*<input required="" name="login[password]" type="password" className="form-control" placeholder="mot de passe" />*/}
                    </div>
                    <div className="form-terms">
                        <div className="custom-control custom-checkbox mr-sm-2">
                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                            <label className="d-block">
                                En cas d'oubli de votre mot de passe, veuillez contacter votre administrateur.
                            </label>
                        </div>
                    </div>
                    <div className="form-button">
                        {/*<button className="btn btn-primary" type="submit"  onClick={() => this.routeChange()}>Se connecter</button>*/}
                        <Button 
                            className="btn btn-primary" 
                            color="primary"
                            disabled={state.isLoading}
                        >
                            {state.isLoading ? "Veuillez patienter ..." : "Se connecter"}
                        </Button>
                    </div>
                    <div className="form-footer">
                        <span>Ou connectez-vous avec </span>
                        <ul className="social">
                            <li><a className="fa fa-facebook" href=""></a></li>
                            <li><a className="fa fa-twitter" href=""></a></li>
                            <li><a className="fa fa-instagram" href=""></a></li>
                            <li><a className="fa fa-pinterest" href=""></a></li>
                        </ul>
                    </div>
                </form>
            </AvForm>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
}
  
export default connect(mapStateToProps, {signIn}) (Login);