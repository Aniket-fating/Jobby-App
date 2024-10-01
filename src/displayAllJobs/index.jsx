import { FaBriefcase, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './index.css';


/*

    {
      "id": "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751",
      "title": "Devops Engineer",
      "rating": 4,
      "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
      "location": "Delhi",
      "job_description": "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support.",
      "employment_type": "Internship",
      "package_per_annum": "10 LPA"
    },

*/

const DisplayAllJobs = (props)=> {

   const {jobsItem} = props;

   const {id,title,rating,company_logo_url,location,job_description,employment_type,package_per_annum} = jobsItem;
   

      return( 

          <Link to = {`/jobs/${id}`}>

              <li className='display-jobs-card'>

                <div className='logo-rating-cont'>
                    <img src= {company_logo_url} style={{width : "60px"}}/>

                    <div className='title-rating-cont'>
                        <h3>{title}</h3>
                        <FaStar style={{color: "gold" , marginRight : "5px"}} />
                        <span>{rating}</span>
                    </div>

                  </div> 

                  <div className="location-empType-ppa-cont">

                        <div className="location-empType-cont">
                            <FaLocationDot className="mr-2" />
                            <span className="mr-4">{location}</span>

                            <FaBriefcase className="mr-2"/>
                            <span>{employment_type}</span>
                        </div>

                        <h4>{package_per_annum}</h4>

                    </div>

                  <hr />

                  <h5>Description</h5>
                  <p className="description">{job_description}</p>
                    
              </li>

          </Link>
      )
}




export default DisplayAllJobs;