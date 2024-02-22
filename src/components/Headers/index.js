/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

class Headers extends Component {
  renderOnLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="nav-container">
        <Link className="link" to="/">
          <img
            className="nav-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="mobile-icons-container">
          <li>
            <Link className="link" to="/">
              <AiFillHome className="icon" />
            </Link>
          </li>
          <li>
            <Link className="link" to="/jobs">
              <BsBriefcaseFill className="icon" />
            </Link>
          </li>
          <li>
            <button
              onClick={this.renderOnLogout}
              className="mobile-log-out-btn"
              type="button"
            >
              <FiLogOut className="icon" />
            </button>
          </li>
        </ul>
        <div className="desk-icons-container">
          <ul className="icons-container">
            <Link className="link" to="/">
              <li className="desk-icon">Home</li>
            </Link>
            <Link className="link" to="/jobs">
              <li className="desk-icon">Jobs</li>
            </Link>
          </ul>
          <button
            onClick={this.renderOnLogout}
            className="logout-btn"
            type="button"
          >
            Logout
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Headers)
