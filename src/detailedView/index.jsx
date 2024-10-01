import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';


const JobsDetailedView = ()=>{

   const {id} = useParams();
   const token = Cookies.get("jwtToken")

   useEffect(() =>{

        const fetchJobsDetails = async()=>{

            const api = `https://apis.ccbp.in/jobs/${id}`

            const options = {

                method : "Get",
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }

            const response = await fetch (api,options);
            const data = await response.json();

        }



        fetchJobsDetails();

   },[])

    return <h1>Jobs Detailed View </h1>
}




export default JobsDetailedView;