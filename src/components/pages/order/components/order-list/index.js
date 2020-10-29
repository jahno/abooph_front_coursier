import React, { Fragment, useState, useRef } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import Straighten from '@material-ui/icons/Straighten'
import { Eye } from 'react-feather';

import Breadcrumb from 'components/common/breadcrumb';
import Datatable from 'components/common/datatable'
import TakeMeasure from '../take-measure'


import { getOrders } from 'services/api'

function OrderList() {
  const { url } = useRouteMatch();
  const history = useHistory()

  const [state, setState] = useState({
    affectSteedIsVisible: false,
    takeMeasureIsVisible: false,
    items: {
      total:  1,
      perPage: 1,
      page: 1,
      lastPage: 1,
      data: [],
      hasMoreItems: false,
    }, 
    loading: true,
    isDeleteAlerteOpen: false,
    ids: [],
  })
  
  const currentItem = useRef(null)

  function onFetchData(tableState, instance){
    setState(state => ({...state, loading: true}));
    const page = tableState ? tableState.page + 1 : state.items.page
    
    getOrders(page, (response) => {
      setState(state => ({
        ...state, 
        takeMeasureIsVisible: false,
        items: response.results,
        hasMoreItems: response.results.lastPage > response.page,
        loading: false,
      }));
      },
      () => {setState(state => ({...state, loading: false, takeMeasureIsVisible: false}))}
    )
  }
  
  function handleTakeMeasure(item, isLoadingData){
    if(isLoadingData){
      onFetchData()
    }else{
      currentItem.current = item || null
      setState(state => ({
        ...state, 
        takeMeasureIsVisible: !state.takeMeasureIsVisible,
      }))
    }
  }

  const columns = [
    {
      Header: 'Nom',
      accessor: 'user.nom', // String-based value accessors!
      style: {
        textAlign: 'center'
      }
    }, 
    {
      Header: 'Email',
      accessor: 'user.email',
      style: {
        textAlign: 'center'
      }
    }, 
    {
      Header: 'Téléphone',
      accessor: 'user.numero',
      Cell: (row) => (
        row.original.user.numero || "aucun"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: 'Lieu de livraison',
      accessor: 'adresse',
      Cell: (row) => (
        row.original.adresse || "aucune"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: 'Total',
      accessor: 'total',
      Cell: (row) => (
        <span>
          {row.original.total} FCFA
        </span>
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: <b>Etat</b>,
      id: 'state',
      accessor: () => "state",
      Cell: (row) => (
        <span style={getStyles(row.original)}>
          {row.original.etatText[row.original.etat]}
        </span>
      ),
      style: {
        textAlign: 'center'
      },
      sortable: false
    },
    {
      Header: <b>Action</b>,
      id: 'delete',
      accessor: () => "delete",
      Cell: (row) => (
        <div>
          {(row.original.etat == 1 && row.original.panier.articles.findIndex(item => item.pivot.EtatConfection != 0) == -1) && (
            <Straighten 
              fontSize="small" 
              style={{color: 'rgb(102, 209, 212)', cursor: 'pointer'}}
              onClick={() => handleTakeMeasure(row.original)}
            />
          )}
          {' '}
          <Eye 
            fontSize="small" 
            style={{color: 'rgb(102, 209, 212)', cursor: 'pointer'}}
            onClick={() => {
              history.push({
                pathname: `${url}/${row.original.id}/detail`,
                state: {order: row.original}
              })
            }}
          />
        </div>
      ),
      style: {
        textAlign: 'center'
      },
      sortable: false
    }
  ];

  return (
    <Fragment>
      <Breadcrumb title="List des commandes" parent="Commandes" parentUrl="commandes"/>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>List des commandes</h5>
          </div>
          <div className="card-body">
            <div className="clearfix"></div>
            <div id="batchDelete" className="user-list">
              <Datatable 
                onFetchData={onFetchData} 
                state={state} setState={setState}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </div>
      {state.takeMeasureIsVisible && (
        <TakeMeasure 
          visible={state.takeMeasureIsVisible} 
          handleCancel={handleTakeMeasure}
          order={currentItem.current}
        />
      )}
    </Fragment>
  )
}

export default OrderList

function getStyles(item){
  const color = item.etat == 1 ? "rgb(255, 128, 132)" : "rgb(102, 209, 212)";
  return {
    color,
    cursor:'pointer',
  }
}