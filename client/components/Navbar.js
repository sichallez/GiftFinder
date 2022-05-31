import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Login, Signup } from "./AuthForm";
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => {


  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src="/images/logo.png" alt="logo" style={{maxHeight: 35}} />
          </Link>
        </Box>
        {/* <Box sx={{ flexGrow: 0 }}> */}
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to='/wishlist'>Wishlist</Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
              <Link to="/wishlist">
                <Button>Wish List</Button>
              </Link>
            </>
          )}
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
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
