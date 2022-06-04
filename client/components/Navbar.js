import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Login, Signup } from "./AuthForm";
import { logout } from "../store";
import SearchBar from "./SearchBar";

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
          <SearchBar />
          <div className="nav-flex-item">
            <ul className="nav-top-level">
              <li>
                <ul className="nav-top-level">
                  <li>{username}</li>
                  <li>
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
          <SearchBar />
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
