import Cookies from 'js-cookie'
import './index.css'
import {Loader} from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {Component} from 'react'
import {FiExternalLink} from 'react-icons/fi'
import {MdWork} from 'react-icons/md'
import Header from '../Header'

const renderStatusObj = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoader: 'LOADER',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: '',
    similarJobsData: '',
    renderStatus: renderStatusObj.isLoader,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {id} = match.params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data, 'data')

    const updatedResponseData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    const {jobDetails, similarJobs} = updatedResponseData
    const updatedSkills = jobDetails.skills.map(obj => ({
      imageUrl: obj.image_url,
      name: obj.name,
    }))

    const updatedJobData = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompanyDescription: jobDetails.life_at_company.description,
      lifeAtCompanyImg: jobDetails.life_at_company.image_url,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: updatedSkills,
      title: jobDetails.title,
    }
    const updatedSimilarJobs = similarJobs.map(obj => ({
      companyLogoUrl: obj.company_logo_url,
      employmentType: obj.employment_type,
      id: obj.id,
      jobDescription: obj.job_description,
      location: obj.location,
      rating: obj.rating,
      title: obj.title,
    }))

    if (response.ok) {
      this.setState({
        jobItemData: updatedJobData,
        similarJobsData: updatedSimilarJobs,
        renderStatus: renderStatusObj.success,
      })
    } else {
      this.setState({
        renderStatus: renderStatusObj.failure,
      })
    }
  }

  renderLoadingView = () => {
    console.log('loader')
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobItemData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      lifeAtCompanyDescription,
      lifeAtCompanyImg,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      companyWebsiteUrl,
    } = jobItemData

    return (
      <div className="job-item-details-container">
        <div className="job-item-detail-container">
          <div className="title-container">
            <img src={companyLogoUrl} alt="logo" className="logo-img" />
            <div>
              <h1 className="title-heading">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-icon" />
                <h1 className="title-heading">{rating}</h1>
              </div>
            </div>
          </div>

          <div className="location-job-type-container">
            <div className="location-container">
              <div className="location-container">
                <HiLocationMarker className="icon" />
                <p className="location-para">{location}</p>
              </div>
              <div className="location-container">
                <MdWork className="icon" />
                <p className="location-para">{employmentType}</p>
              </div>
            </div>
            <div className="ml-auto">
              <p className="location-para ">{packagePerAnnum}</p>
            </div>
          </div>

          <hr className="hr-line" />
          <div className="description-container">
            <h1 className="title-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit
              <span>
                <FiExternalLink />
              </span>
            </a>
          </div>

          <p className="location-para">{jobDescription}</p>
          <h1 className="title-heading">Skills</h1>

          <ul className="skills-container">
            {skills.map(obj => (
              <li className="skill-item-container" key={obj.id}>
                <img src={obj.imageUrl} alt={obj.name} className="skill-img" />
                <p className="skill-name">{obj.name}</p>
              </li>
            ))}
          </ul>

          <div className="life-at-company-container">
            <div className="life-at-company-description">
              <h1 className="title-heading">Life at Company</h1>
              <p className="location-para">{lifeAtCompanyDescription}</p>
            </div>
            <img
              src={lifeAtCompanyImg}
              alt={title}
              className="life-at-company-img"
            />
          </div>
        </div>

        <h1 className="title-heading">Similar Jobs</h1>

        <ul className="similar-jobs-container">
          {similarJobsData.map(obj => (
            <li className="similar-job-item" key={obj.id}>
              <div className="title-container">
                <img src={obj.companyLogoUrl} alt="logo" className="logo-img" />
                <div>
                  <h1 className="title-heading">{obj.title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="rating-icon" />
                    <h1 className="title-heading">{obj.rating}</h1>
                  </div>
                </div>
              </div>

              <h1 className="title-heading">Description</h1>
              <p className="location-para">{obj.jobDescription}</p>

              <div className="location-container">
                <div className="location-container">
                  <HiLocationMarker className="icon" />
                  <p className="location-para">{location}</p>
                </div>
                <div className="location-container">
                  <MdWork className="icon" />
                  <p className="location-para">{employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemFailureView = () => (
    <div className="no-job-view-container">
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

  renderJobItemDetails = () => {
    const {renderStatus} = this.state

    switch (renderStatus) {
      case renderStatusObj.success:
        return this.renderJobDetails()
      case renderStatusObj.failure:
        return this.renderJobItemFailureView()
      case renderStatusObj.isLoader:
        return this.renderLoadingView
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobItemDetails()}
      </>
    )
  }
}

export default JobItemDetails
