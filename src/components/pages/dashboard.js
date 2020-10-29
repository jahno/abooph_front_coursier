import React, { useEffect, useState } from 'react';

import Breadcrumb from '../common/breadcrumb';
import Layout from '../layout/app';
import { getOrders } from 'services/api';

export function Dashboard(props){
    const [state, setState] = useState({
        loading: true,
        items: {
          total:  1,
          perPage: 1,
          page: 1,
          lastPage: 1,
          data: [],
          hasMoreItems: false,
        }, 
    })

    useEffect(() => {
        setState(state => ({...state, loading: true}));

        getOrders(null, (response) => {
            setState(state => ({
                ...state, 
                items: response.results,
                loading: false,
            }));
          },
          () => {setState(state => ({...state, loading: false}))}
        )
    }, [])

    return (
        <Layout>
            <Breadcrumb title="Tableau de bord" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 xl-100">
                        <div className="card">
                            <div className="card-header">
                                <h5>Dernières commandes</h5>
                            </div>
                            <div className="card-body">
                                {!state.loading ? (
                                    <div className="user-status table-responsive latest-order-table">
                                        <table className="table table-bordernone">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nom</th>
                                                    <th scope="col">Téléphone</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Lieu de livraison</th>
                                                    <th scope="col">Etat</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {state.items.data.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{item.user.nom}</td>
                                                            <td className="digits">{item.user.numero}</td>
                                                            <td className="font-danger">{item.total} FCFA</td>
                                                            <td className="digits">{item.adresse || 'aucune'}</td>
                                                            <td className="digits" style={{color: 'rgb(102, 209, 212)', cursor: 'pointer'}}>{item.etatText[item.etat]}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <a href="javascript:void(0)" onClick={() => props.history.push('/commandes')} className="btn btn-primary">Toutes les commandes</a>
                                    </div>
                                ) : 'Veuillez patienter...'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}
// javascript:void(0)

export default Dashboard
