import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'
import JobItem from '../JobItem'
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

const conditionsOfJobsRoute = {
  Success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
}

class Jobs extends Component {
  state = {
    typesOfEmployment: employmentTypesList,
    typesOfSalaries: salaryRangesList,
    employmentType: [],
    minPackage: [],
    inputSearchValue: '',
    jobsData: [],
    currentJobRouteCondition: conditionsOfJobsRoute.Success,
  }

  componentDidMount() {
    this.getTypesOfEmployments()
  }

  getTypesOfEmployments = async () => {
    const {employmentType, minPackage, inputSearchValue} = this.state
    const employParameters = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employmennt_type=${employParameters}&minimum_package=${minPackage}&search=${inputSearchValue}`
    console.log(url, 'url')
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {jobs} = data
      console.log(jobs, 'data')
      if (jobs.length === 0) {
        console.log('no jobs')
        this.setState({
          currentJobRouteCondition: conditionsOfJobsRoute.noJobs,
        })
      } else {
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
          currentJobRouteCondition: conditionsOfJobsRoute.Success,
        })
      }
    } else {
      this.setState({
        currentJobRouteCondition: conditionsOfJobsRoute.failure,
      })
    }
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
      this.setState(
        {
          inputSearchValue: event.target.value,
        },
        this.getTypesOfEmployments,
      )
    }
  }

  renderJobDetailsView = () => {
    const {jobsData} = this.state
    return (
      <ul className="job-details-container">
        <div className="search-input-container details-lg-search-input">
          <input
            type="search"
            className="search-input "
            placeholder="Search"
            onKeyDown={this.onChangeSearchInput}
          />
          <HiSearch />
        </div>
        {jobsData.map(obj => (
          <Link to={`/jobs/${obj.id}`} key={obj.id} className="link-styles">
            <JobItem jobData={obj} />
          </Link>
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="no-job-view-container">
      <div className="search-input-container details-lg-search-input">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onKeyDown={this.onChangeSearchInput}
        />
        <HiSearch />
      </div>
      <div className="failure-view-display-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-heading">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    </div>
  )

  renderJobFailureView = () => (
    <div className="no-job-view-container">
      <div className="search-input-container details-lg-search-input">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onKeyDown={this.onChangeSearchInput}
        />
        <HiSearch />
      </div>
      <div className="failure-view-display-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="no-job-img"
        />
        <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
        <p className="no-jobs-heading">
          We cannot Seem to find the page you are looking for.
        </p>
        <button type="button" className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  renderJobs = () => {
    const {currentJobRouteCondition} = this.state

    switch (currentJobRouteCondition) {
      case conditionsOfJobsRoute.Success:
        return this.renderJobDetailsView()
      case conditionsOfJobsRoute.failure:
        return this.renderJobFailureView()
      case conditionsOfJobsRoute.noJobs:
        return this.renderNoJobsView()
      default:
        return null
    }
  }

  render() {
    const {typesOfEmployment, typesOfSalaries} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-search-container">
            <div className="search-input-container filter-lg-search-input">
              <input
                type="search"
                className="search-input "
                placeholder="Search"
                onKeyDown={this.onChangeSearchInput}
              />
              <HiSearch />
            </div>
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

          {this.renderJobs()}
        </div>
      </>
    )
  }
}

export default Jobs
