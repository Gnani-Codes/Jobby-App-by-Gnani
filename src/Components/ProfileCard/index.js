import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class ProfileCard extends Component {
  state = {
    profileDetails: '',
    profileFailure: true,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileDetails: updatedData, profileFailure: true})
    } else {
      this.setState({profileFailure: false})
    }
  }

  render() {
    const {profileDetails, profileFailure} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return profileFailure ? (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    ) : (
      <div className="profile-failure-container">
        <button type="button" className="retry-btn">
          Retry
        </button>
      </div>
    )
  }
}

export default ProfileCard
