import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {MdWork} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li className="job-item-container">
      <div className="title-container">
        <img src={companyLogoUrl} alt="company logo" className="logo-img" />
        <div>
          <h1 className="title-heading">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="rating-icon" />
            <p className="title-heading">{rating}</p>
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
      <h1 className="title-heading">Description</h1>
      <p className="location-para">{jobDescription}</p>
    </li>
  )
}

export default JobItem
