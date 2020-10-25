// api routes
import {API_ROUTE} from 'api/routes'
import checkAuth from 'helpers/checkAuth'

export async function getDashbordData(){
  const url = `${API_ROUTE}`;
  const token = await localStorage.getItem("token");
  return (
      fetch(url,{
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      })
      .then((response)=> checkAuth(response))
      .then((response) => response.json())
      .catch((error) => console.error(error))
  );
}