import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import DisplayAllJobs from '../displayAllJobs';
import FilterSection from '../filterSection';
import Header from '../header';
import './index.css';

const Jobs = () => {
  const [allValues, setValues] = useState({
    jobsArr: [],
    empTypeList: [], 
    minPackage: "",  
    userInput: "",   
  });

  const token = Cookies.get('jwtToken');

  useEffect(() => {
    const onFetchUserData = async () => {
      const { empTypeList, minPackage, userInput } = allValues;

      const employmentTypeQuery = empTypeList.join(',');

      const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${minPackage}&search=${userInput}`;

      const options = {
        method: 'GET',
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU",

        },
      };

      try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();

        console.log(response);
        console.log(data);


        if (response.ok === true) {
          setValues({ ...allValues, jobsArr: data.jobs });
        }
      } catch (error) {
        console.error(error);
      }
    };

    onFetchUserData();
  }, [allValues.empTypeList, allValues.minPackage, allValues.userInput]); // Fetch jobs when filters change

  const onChangeSearchIn = (e) => {
    if (e.key === 'Enter') {
      setValues({ ...allValues, userInput: e.target.value });
    }
  };

  const changeEmpType = (empTypeId, isChecked) => {
    const updatedEmpTypeList = isChecked
      ? [...allValues.empTypeList, empTypeId]
      : allValues.empTypeList.filter((id) => id !== empTypeId);

    setValues({ ...allValues, empTypeList: updatedEmpTypeList });
  };

  const changeSalaryRange = (minPackageValue) => {
    setValues({ ...allValues, minPackage: minPackageValue });
  };

  return (
    <div>
      <Header />

      <div className="all-jobs-filter-cont">
        <div className="filter-cont">
          <FilterSection changeEmpType={changeEmpType} changeSalaryRange={changeSalaryRange} />
        </div>

        <div className="all-jobs-cont">
          <input
            onKeyUp={onChangeSearchIn}
            type="text"
            className="form-control w-75 mb-3"
            placeholder="Search for jobs"
          />

          <ul>
            {allValues.jobsArr.map((each) => (
              <DisplayAllJobs key={each.id} jobsItem={each} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
