import React, {useState} from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import {handleService} from '../../helpers';

export function DeleteAlerte(props) {
  const {isOpen, msg, data, service, deleteData, toggleAlerte} = props;
  const [load, setLoad] = useState(false);
  
  function handleClick () {  
    setLoad(true)  
    
    handleService(service, data.id, 
      (response) => {
        setLoad(false)
        handleDelete({type: 'delete', value: response}, deleteData)  
      },
      () => {
        setLoad(false)  
      }
    )
  }
  
  if(!isOpen) return null

  return (
    <div>
      <SweetAlert
        danger
        showCancel={!load}
        confirmBtnText={load ? "Patientez..." : "Supprimer"}
        disabled={load}
        cancelBtnText="annuler"
        title="Etes vous sûr ?"
        onConfirm={handleClick}
        onCancel={() => handleDelete({type: 'close'}, null, null, toggleAlerte)}
        focusCancelBtn
      >
        {msg}
      </SweetAlert>
    </div>
  );
}

export  function handleDelete (action, deleteData, data, toggleAlerte) {
  if(action.type === 'open' || action.type === 'close'){
    if(action.type === 'open') data.current = action.value
    toggleAlerte()
  }else{
    deleteData(action)
  }
}
