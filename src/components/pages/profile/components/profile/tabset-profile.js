import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import {User, Edit} from 'react-feather'
import {connect} from "react-redux";

import UpdateProfile from '../update-profile'

export function Tabset_profile({user}) {
    return (
        <div>
            <Tabs>
                <TabList className="nav nav-tabs tab-coupon" >
                    <Tab className="nav-link"><User className="mr-2" />Mon profil</Tab>
                    <Tab className="nav-link"><Edit className="mr-2" />Modifier mon profil</Tab>
                </TabList>

                <TabPanel>
                    <div className="tab-pane fade show active">
                        <h5 className="f-w-600 f-16">Profil</h5>
                        <div className="table-responsive profile-table">
                            <table className="table table-responsive">
                                <tbody>
                                    <tr>
                                        <td>Nom:</td>
                                        <td>{user.nom}</td>
                                    </tr>
                                    <tr>
                                        <td>Prenom:</td>
                                        <td>{user.prenom}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Téléphone:</td>
                                        <td>{user.numero || "aucun"}</td>
                                    </tr>
                                    <tr>
                                        <td>Adresse géographique:</td>
                                        <td>{user.Adresse_geographique || "aucun"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    {/* <div className="tab-pane fade"> */}
                    <div className="account-setting">
                        <h5 className="f-w-600 f-16">Modifier profil</h5>
                        
                        <div className="row">
                            <div className="col-md-8">
                                <UpdateProfile/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
    }
}
  
export default connect(mapStateToProps)(Tabset_profile);