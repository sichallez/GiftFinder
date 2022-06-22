import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RedeemIcon from '@mui/icons-material/Redeem';
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import { Login, Signup } from "./AuthForm";
import { logout } from "../store";
import SearchBar from "./SearchBar";
import AccountMenu from "./account/AccountMenu";
import AccountDropdown from "./account/AccountDropdown";

const Navbar = ({ isLoggedIn, username, firstName }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="nav-flex">
          {/* The navbar will show these links after you log in */}
          <div className="nav-flex-item">
            <ul className="nav-top">
              <div className='nav-flex-item'>
                <Link to="/home"> <img className="logo" src="/images/gift-finder-logo.png"/> </Link> 
                </div>
            </ul>
          </div>
          {/*<SearchBar />*/}
          <div className="nav-flex-item">
            <ul className="nav-top-level">
                  <li>
                    <AccountMenu />
                  </li>
                  <li>
                    <Link to="/account/notification">
                      <IconButton sx={{ margin: 'auto 18px auto 18px' }}>
                        <NotificationsIcon sx={{ width: 30, height: 30, color: 'darkorchid' }}/>
                      </IconButton>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/wishlist">
                      <IconButton sx={{ margin: 'auto 10px auto 10px' }}>
                        <FavoriteIcon sx={{ width: 30, height: 30, color: 'plum'}} />
                      </IconButton>
                    </Link>
                  </li>
                  <li>
                    <Link to="/questions">
                      <IconButton sx={{ margin: 'auto 6px auto 6px' }}>
                          <RedeemIcon sx={{ width: 30, height: 30, color: 'skyblue'}} />
                        </IconButton>
                    </Link>
                  </li>
            </ul>
            <ul className='nav-bottom-level'>
              <li> <AccountDropdown /></li>
              <li><Link to='/account/notification'>Notification</Link></li>
              <li><Link to='/account/wishlist'>Wish List</Link></li>
              <li><Link to='/questions'>Gift Finder</Link></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="nav-flex">
          {/* The navbar will show these links before you log in */}
          <div className="nav-flex-item">
            <ul className="nav-top">
              <div className='nav-flex-item'>
                <Link to="/home"> <img className="logo" src="/images/gift-finder-logo.png"/> </Link> 
               </div> 
            </ul>
          </div>
          <SearchBar />
          <div className="nav-flex-item">
            <ul className="nav-top-level">
              <li>
                <Link to="/login">
                  <IconButton sx={{ margin: 'auto -4px auto -4px' }}>
                      <FaceIcon sx={{ width: 30, height: 30, color: 'tan'}} />
                    </IconButton>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <IconButton sx={{ margin: 'auto 4px auto 4px' }}>
                      <PersonIcon sx={{ width: 30, height: 30, color: 'gray' }} />
                    </IconButton>
                </Link>
              </li>
              <li>
                    <Link to="/questions">
                      <IconButton sx={{ margin: 'auto 11px auto 11px' }}>
                          <RedeemIcon sx={{ width: 30, height: 30, color: 'skyblue'}} />
                        </IconButton>
                    </Link>
                  </li>
            </ul>
            <ul className='nav-second-bottom-level'>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to='/questions'>Gift Finder</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
    <hr className='hr'/>
  </div>
);

// const Navbar = ({ handleClick, isLoggedIn, username }) => {
//   return (
//     <>
//       <AppBar
//         elevation={0}
//         position="static"
//         color="transparent"
//         sx={{ marginTop: "24px", marginBottom: "24px" }}
//       >
//         <Toolbar>
//           <Box sx={{ flexGrow: 1, display: "flex" }}>
//             <Link to="/home">
//               {/* <img src="/images/logo.png" alt="logo" style={{maxHeight: 35}} /> */}
//               <Typography
//                 sx={{
//                   fontSize: "35px",
//                   color: "#4d4d4d",
//                   textDecoration: "none",
//                   fontFamily:
//                     "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
//                 }}
//                 component="div"
//               >
//                 GIFTFINDER
//               </Typography>
//             </Link>
//             <SearchBar />
//           </Box>
//           {/* <Box sx={{ flexGrow: 0 }}> */}
//           {isLoggedIn ? (
//             <div>
//               {/* The navbar will show these links after you log in */}
//               <Button>{username}</Button>
//               <Link to="/wishlist">
//                 <Button>Wishlist</Button>
//               </Link>
//               <Link to="#">
//                 <Button onClick={handleClick}>Logout</Button>
//               </Link>
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
//           {/* </Box> */}
//         </Toolbar>
//       </AppBar>
//       <hr style={{ color: "#4d4d4d" }} />
//     </>
//   );
// };

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    firstName: state.auth.firstname
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
