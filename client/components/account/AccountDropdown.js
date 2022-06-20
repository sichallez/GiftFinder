import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../../store";

const AccountDropdown = ({ auth, username, firstName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='account-menu'>
      <IconButton onClick={handleClick} sx={{ padding: 0, fontSize: '12px', borderRadius: 0, textDecoration: 'underline' }}>
        {/* {auth.avatar ? (
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt={auth.username}
            src={auth.avatar}
          />
        ) : (
          <AccountCircleIcon />
        )} */}
        Hi, { username || firstName }
      </IconButton>
      <Menu
        className='user-menu'
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/account">
          <MenuItem onClick={handleClose} color="black">
           {username.slice(0, 1).toUpperCase()+username.slice(1) || firstName.slice(0, 1).toUpperCase()+firstName.slice(1)}'s Profile
          </MenuItem>
        </Link>
        <Link to="/account/wishlist">
          <MenuItem onClick={handleClose} color="black">
            Wish List
          </MenuItem>
        </Link>
        <Link to="/account/group">
          <MenuItem onClick={handleClose} color="black">
            My Groups
          </MenuItem>
        </Link>
        <Link to="/account/notification">
          <MenuItem onClick={handleClose} color="black">
            Notification
          </MenuItem>
        </Link>
        <Link to="/login">
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(logout());
            }}
          >
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

const mapState = ({ auth }) => {
  //console.log(auth, 'auth')
  return { 
    auth,
    username: auth.username,
    firstName: auth.firstName
  };
};

export default connect(mapState)(AccountDropdown);
