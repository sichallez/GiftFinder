import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Login, Signup } from "./AuthForm";
import { logout } from "../store";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ handleClick, isLoggedIn, username }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="nav-flex">
          {/* The navbar will show these links after you log in */}
          <div className="nav-flex-item">
            <ul className="nav-top-level">
              <li className="nav-title">
                <Link to="/home">GiftFinder</Link>
              </li>
            </ul>
          </div>
          <div className="nav-flex-item">
            <ul className="nav-top-level">
              <li>
                <ul className="nav-top-level">
                  <li>
                  {/* <FaceRetouchingNaturalIcon /> */}
                  Hi, {username}
                  </li>
                  <li>
                    {/* <FavoriteBorderIcon /> */}
                    <Link to="/wishlist">Wishlist</Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="nav-flex">
          {/* The navbar will show these links before you log in */}
          <div className="nav-flex-item">
            <ul className="nav-top-level">
              <li className="nav-title">
                <Link to="/home">GiftFinder</Link>
              </li>
            </ul>
          </div>
          <div className="nav-flex-item">
            <ul className="nav-top-level">
              <li>
                <ul className="nav-top-level">
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="signup">Sign Up</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

// const Navbar = ({handleClick, isLoggedIn}) => {
//   return (
//     <AppBar position="static" color="default">
//       <Toolbar>
//         <Box sx={{ flexGrow: 1 }}>
//           <Link to="/">
//             <img src="/images/logo.png" alt="logo" style={{maxHeight: 35}} />
//           </Link>
//         </Box>
//         {/* <Box sx={{ flexGrow: 0 }}> */}
//           {isLoggedIn ? (
//             <div>
//               {/* The navbar will show these links after you log in */}
//               <Link to="/home">Home</Link>
//               <a href="#" onClick={handleClick}>
//                 Logout
//               </a>
//               <Link to='/wishlist'>Wishlist</Link>
//             </div>
//           ) : (
//             <>
//               <Link to="/login">
//                 <Button>Login</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button>Sign Up</Button>
//               </Link>
//               <Link to="/wishlist">
//                 <Button>Wish List</Button>
//               </Link>
//             </>
//           )}
//         {/* </Box> */}
//       </Toolbar>
//     </AppBar>
//   )
// }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
