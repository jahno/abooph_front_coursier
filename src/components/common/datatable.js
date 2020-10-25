import React, { Fragment } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

function Datatable({state, onFetchData, columns}){
    const {items, hasMoreItems, loading} = state
    const {data, perPage, lastPage} = items

    return (
        <Fragment>
            <ReactTable
                className="-striped -highlight"
                previousText='Précédent'
                nextText='Suivant'
                loadingText='Chargement...'
                ofText='sur'
                noDataText="Liste vide"
                
                data={data} 
                pageSize={hasMoreItems ? perPage : data.length}
                showPageSizeOptions={false}
                columns={columns}
                pages={lastPage}
                loading={loading}
                collapseOnPageChange={false}
                manual={true}

                onFetchData={onFetchData}
            />
        </Fragment>
    )
}

export default Datatable
