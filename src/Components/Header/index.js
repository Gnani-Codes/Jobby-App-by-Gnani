import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FaSignOutAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  function onCLickLogOut() {
    Cookies.remove('jwt_token')
    const {history} = props

    return history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="header-logo-img"
        />
      </Link>

      <ul className="header-icons-container-sm">
        <li className="header-icon-container">
          <button alt="home icon" className="icon-btn" type="button">
            <AiFillHome className="header-icons-background " />
          </button>
        </li>

        <li className="header-icon-container">
          <button alt="work icon" className="icon-btn" type="button">
            <MdWork className="header-icons-background " />
          </button>
        </li>

        <li className="header-icon-container">
          <button
            alt="home icon"
            className="icon-btn"
            type="button"
            onClick={onCLickLogOut}
          >
            <FaSignOutAlt className="header-icons-background " />
          </button>
        </li>
      </ul>

      <div className="header-icons-container-lg">
        <Link to="/" className="link-item">
          <p className="header-icons-items"> Home</p>
        </Link>
        <Link to="/jobs" className="link-item">
          <p className="header-icons-items">Jobs</p>
        </Link>
      </div>
      <button type="button" className="logout-btn" onClick={onCLickLogOut}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
