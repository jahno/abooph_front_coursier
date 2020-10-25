import {connect} from "react-redux";
import React  from 'react'
import {PUBLIC_ROUTE} from '../../../api/routes'
import {avatar as defaultAvatar} from '../../../assets/images/public'

function UserPanel({user}) {
    const avatar = user.avatar ? `${PUBLIC_ROUTE}${user.avatar}` : defaultAvatar
    const timestamp = new Date().getTime()

    return (
        <div>
            <div className="sidebar-user text-center">
                <div><img className="img-60 rounded-circle lazyloaded blur-up" src={`${avatar}?${timestamp}`} alt={user.nom} />
                </div>
                <h6 className="mt-3 f-14">{user.nom} {user.prenom}</h6>
                <p>Coursier</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user
    }
}

export default connect(mapStateToProps)(UserPanel);
  
  

