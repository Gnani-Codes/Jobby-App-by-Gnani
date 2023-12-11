import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'
import ProfileCard from '../ProfileCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    typesOfEmployment: employmentTypesList,
    typesOfSalaries: salaryRangesList,
    employmentType: [],
    minPackage: [],
    inputSearchValue: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getTypesOfEmployments()
  }

  getTypesOfEmployments = async () => {
    const {employmentType, minPackage, inputSearchValue} = this.state
    const employParameters = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employmennt_type=${employParameters}&minimum_package=${minPackage}&search=${inputSearchValue}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {jobs} = data
    const updatedData = jobs.map(obj => ({
      companyLogoUrl: obj.company_logo_url,
      employmentType: obj.employment_type,
      id: obj.id,
      jobDescription: obj.job_description,
      location: obj.location,
      packagePerAnnum: obj.package_per_annum,
      rating: obj.rating,
      title: obj.title,
    }))

    this.setState({
      jobsData: updatedData,
    })
  }

  onFilterSalary = event => {
    this.setState({minPackage: event.target.value}, this.getTypesOfEmployments)
  }

  onChangeEmployment = event => {
    console.log(event.target)
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, event.target.value],
      }),
      this.getTypesOfEmployments,
    )
  }

  onChangeSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({
        inputSearchValue: event.target.value,
      })
    }
  }

  render() {
    const {typesOfEmployment, typesOfSalaries} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onKeyDown={this.onChangeSearchInput}
            />
            <ProfileCard />

            <hr className="hr-line" />
            <div>
              <h1 className="employment-heading">Type of Employment</h1>
              <ul className="filter-types-options-container">
                {typesOfEmployment.map(obj => (
                  <li
                    className="filter-option-container"
                    key={obj.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={obj.employmentTypeId}
                      onChange={this.onChangeEmployment}
                      value={obj.employmentTypeId}
                    />
                    <label
                      htmlFor={obj.employmentTypeId}
                      className="filter-option-label"
                    >
                      {obj.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="hr-line" />

            <div>
              <h1 className="employment-heading">Salary Range</h1>
              <div className="filter-types-options-container">
                {typesOfSalaries.map(obj => (
                  <div
                    className="filter-option-container  filter-option-container-salary"
                    key={obj.salaryRangeId}
                  >
                    <input
                      type="radio"
                      id={obj.salaryRangeId}
                      value={obj.salaryRangeId}
                      onChange={this.onFilterSalary}
                      name="package"
                    />
                    <label
                      htmlFor={obj.salaryRangeId}
                      className="filter-option-label"
                    >
                      {obj.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
