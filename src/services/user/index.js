import store from '../../redux/store'
import {API_ROUTE} from '../../api/routes'

export function updateProfile(data){
  const url = `${API_ROUTE}/coursier/profile`;
  const token = store.getState().auth.token
  return (
    fetch(url,{
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
  );
}