import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FaSignOutAlt} from 'react-icons/fa'

import './index.css'

const Header = () => (
  <div className="header-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
      alt="website logo"
      className="logo-img"
    />
    <div className="header-icons-container-sm">
      <AiFillHome className="header-icons-background " />
      <MdWork className="header-icons-background " />
      <FaSignOutAlt className="header-icons-background " />
    </div>
    <div className="header-icons-container-lg">
      <p className="header-icons-items"> Home</p>
      <p className="header-icons-items">Jobs</p>
    </div>
    <button type="button" className="logout-btn">
      Logout
    </button>
  </div>
)

export default Header
