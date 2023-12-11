import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobItem from '../JobItem'

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
const viewsObject = {
  successView: 'SUCCESS',
  failureView: 'FAILURE',
  loadingView: 'LOADING',
}

class Jobs extends Component {
  state = {
    currentView: viewsObject.loadingView,
    employmentType: [],
    minPackage: [],
    inputSearchValue: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getTypesOfEmployments()
  }

  getTypesOfEmployments = async () => {
    this.setState({
      currentView: viewsObject.loadingView,
    })

    const {employmentType, minPackage, inputSearchValue} = this.state
    console.log(employmentType)
    const employParameters = employmentType.join(',')

    const url = `https://apis.ccbp.in/jobs?employmennt_type=${employParameters}&minimum_package=${minPackage}&search=${inputSearchValue}`
    const jwtToken = Cookies.get('jwt_token')
    console.log(url)

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
        currentView: viewsObject.successView,
        jobsData: updatedData,
      })
    } else {
      this.setState({
        currentView: viewsObject.failureView,
      })
    }
  }

  onFilterSalary = salary => {
    this.setState({minPackage: salary}, this.getTypesOfEmployments)
  }

  onChangeEmployment = id => {
    const {employmentType} = this.state
    const isIdExist = employmentType.includes(id)

    if (isIdExist) {
      const filteredId = employmentType.filter(employId => id !== employId)
      this.setState(
        {
          employmentType: filteredId,
        },
        this.getTypesOfEmployments,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getTypesOfEmployments,
      )
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      inputSearchValue: event.target.value,
    })
  }

  onClickSearchButton = () => {
    this.getTypesOfEmployments()
  }

  onPressEnterKeySearch = event => {
    if (event.key === 'Enter') {
      this.getTypesOfEmployments()
    }
  }

  renderJobItems = () => {
    const {jobsData} = this.state

    return (
      <div>
        {jobsData.length === 0 ? (
          <div className="jobs-loading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-jobs-heading">No jobs Found</h1>
            <p className="no-jobs-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        ) : (
          <ul className="job-items">
            {jobsData.map(obj => (
              <JobItem jobData={obj} key={obj.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getTypesOfEmployments()
  }

  renderFailureView = () => (
    <div className="jobs-loading-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">Oops! Something went wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {currentView} = this.state

    switch (currentView) {
      case viewsObject.successView:
        return this.renderJobItems()
      case viewsObject.failureView:
        return this.renderFailureView()
      case viewsObject.loadingView:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-search-container">
            <div className="search-button-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onPressEnterKeySearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <ProfileCard />

            <hr className="hr-line" />

            <div>
              <h1 className="employment-heading">Type of Employment</h1>
              <ul className="filter-types-options-container">
                {employmentTypesList.map(obj => (
                  <li
                    className="filter-option-container"
                    key={obj.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={obj.employmentTypeId}
                      onChange={() =>
                        this.onChangeEmployment(obj.employmentTypeId)
                      }
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
                {salaryRangesList.map(obj => (
                  <div
                    className="filter-option-container  filter-option-container-salary"
                    key={obj.salaryRangeId}
                  >
                    <input
                      type="radio"
                      id={obj.salaryRangeId}
                      value={obj.salaryRangeId}
                      onChange={() => this.onFilterSalary(obj.salaryRangeId)}
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

          <div className="job-items-container">
            <div className="search-button-container medium-size">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onPressEnterKeySearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.renderSuccessView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
