import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, username}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className='nav-flex'>
          {/* The navbar will show these links after you log in */}
          <div className='nav-flex-item'>
            <ul className='nav-top-level'>
              <li className='nav-title'><Link to="/home">GiftFinder</Link></li>
            </ul>
          </div>
          <div className='nav-flex-item'>
            <ul className='nav-top-level'>
              <li>
                <ul className='nav-top-level'>
                  <li>{username}</li>
                  <li><Link to='/wishlist'>Wishlist</Link></li>
                  <li>
                    <a href='#' onClick={handleClick}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className='nav-flex'>
          {/* The navbar will show these links before you log in */}
          <div className='nav-flex-item'>
            <ul className='nav-top-level'>
              <li className='nav-title'><Link to="/home">GiftFinder</Link></li>
            </ul>
          </div>
          <div className='nav-flex-item'>
            <ul className='nav-top-level'>
              <li>
                <ul className='nav-top-level'>
                  <li><Link to='login'>Login</Link></li>
                  <li><Link to='signup'>Sign Up</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
