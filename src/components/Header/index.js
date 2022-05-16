import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="nav-con">
      <Link to="/" className="nav-img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <div className="sm-icons-con">
        <Link to="/">
          <AiFillHome size="30" color="#ffffff" className="mobile-icon" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill
            size="30"
            color="#ffffff"
            className="mobile-icon"
          />
        </Link>
        <FiLogOut onClick={onLogout} size="30" color="#ffffff" />
      </div>
      <ul className="nav-options-con">
        <Link to="/" className="nav-link">
          <li className="nav-head">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="nav-head">Jobs</li>
        </Link>
      </ul>
      <button onClick={onLogout} type="button" className="logout-btn">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
