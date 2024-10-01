import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import './index.css';
const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
];

const salaryRangesList = [
  { salaryRangeId: '1000000', label: '10 LPA and above' },
  { salaryRangeId: '2000000', label: '20 LPA and above' },
  { salaryRangeId: '3000000', label: '30 LPA and above' },
  { salaryRangeId: '4000000', label: '40 LPA and above' },
];

const FilterSection = (props) => {
  const { changeEmpType, changeSalaryRange } = props; // Props from Jobs

  const [profileDetails, setProfileDetails] = useState({});
  const token = Cookies.get('jwtToken');

  useEffect(() => {
    const getProfileDetails = async () => {
      const apiUrl = 'https://apis.ccbp.in/profile';
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok === true) {
        setProfileDetails(data.profile_details);
      }
    };
    getProfileDetails();
  }, [token]);

  const renderEmploymentTypesList = () => {
    const onChangeEmptype = (e) => {
      changeEmpType(e.target.value, e.target.checked);
    };

    return employmentTypesList.map((eachType) => (
      <li className="filters-list-item" key={eachType.employmentTypeId}>
        <input
          type="checkbox"
          className="checkbox-input"
          value={eachType.employmentTypeId}
          id={eachType.employmentTypeId}
          onChange={onChangeEmptype}
        />
        <label htmlFor={eachType.employmentTypeId} className="filter-label">
          {eachType.label}
        </label>
      </li>
    ));
  };

  const renderSalaryRangesList = () => {
    const onSalaryRangeChange = (e) => {
      changeSalaryRange(e.target.value);
    };

    return salaryRangesList.map((eachRange) => (
      <li className="filters-list-item" key={eachRange.salaryRangeId}>
        <input
          type="radio"
          className="checkbox-input"
          value={eachRange.salaryRangeId}
          id={eachRange.salaryRangeId}
          name="salaryRanges"
          onChange={onSalaryRangeChange}
        />
        <label htmlFor={eachRange.salaryRangeId} className="filter-label">
          {eachRange.label}
        </label>
      </li>
    ));
  };

  const renderProfileDetails = () => {
    if (Object.keys(profileDetails).length === 0) {
      return null;
    }

    return (
      <div className="profile-details-container">
        <img
          src={profileDetails.profile_image_url}
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="profile-bio">{profileDetails.short_bio}</p>
      </div>
    );
  };

  return (
    <div className="filters-group-container">
      {renderProfileDetails()}
      <h2 className="filter-heading">Type of Employment</h2>
      <ul className="filters-list">{renderEmploymentTypesList()}</ul>
      <hr className="separator" />
      <h2 className="filter-heading">Salary Range</h2>
      <ul className="filters-list">{renderSalaryRangesList()}</ul>
    </div>
  );
};

export default FilterSection;
