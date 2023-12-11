import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const viewsObject = {
  successView: 'SUCCESS',
  failureView: 'FAILURE',
  loadingView: 'LOADING',
}

class ProfileCard extends Component {
  state = {
    profileDetails: '',
    currentView: viewsObject.loadingView,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      currentView: viewsObject.loadingView,
    })

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
      this.setState({
        currentView: viewsObject.successView,
        profileDetails: updatedData,
      })
    } else {
      this.setState({
        currentView: viewsObject.failureView,
      })
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="failure-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getProfileDetails()
  }

  render() {
    const {currentView} = this.state

    switch (currentView) {
      case viewsObject.successView:
        return this.renderSuccessView()
      case viewsObject.failureView:
        return this.renderFailureView()
      case viewsObject.loadingView:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProfileCard
