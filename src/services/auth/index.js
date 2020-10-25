// api routes
import {API_ROUTE} from '../../api/routes'

export function signInUser(data){
  const url = `${API_ROUTE}/auth/login/coursier`;
  return (
    fetch(url, {
        method:"POST",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body:JSON.stringify(data)
    })
  );
}