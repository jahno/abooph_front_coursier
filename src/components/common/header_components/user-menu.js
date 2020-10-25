import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

import {PUBLIC_ROUTE} from '../../../api/routes'
import {avatar as defaultAvatar} from '../../../assets/images/public'
import { logout } from '../../../redux/actions'

function User_menu({user, logout}) {
    const avatar = user.avatar ? `${PUBLIC_ROUTE}${user.avatar}` : defaultAvatar
    const timestamp = new Date().getTime()

    return (
        <Fragment>
                <li className="onhover-dropdown">
                    <div className="media align-items-center">
                        <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={`${avatar}?${timestamp}`} alt={user.nom} />
                        <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                        <li><Link to={`/profil`} ><i data-feather="user"></i>Mon profil</Link></li>
                        <li onClick={logout}><i data-feather="log-out"></i>Déconnexion</li>
                    </ul>
                </li>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user
    }
}

export default connect(mapStateToProps,{logout})(User_menu);
  
  