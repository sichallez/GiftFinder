import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../store";

const AccountMenu = ({ auth }) => {
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
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        {auth.avatar ? (
          <Avatar
            sx={{ width: 24, height: 24 }}
            alt={auth.username}
            src={auth.avatar}
          />
        ) : (
          <AccountCircleIcon />
        )}
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/account">
          <MenuItem onClick={handleClose} color="black">
            Account
          </MenuItem>
        </Link>
        <Link to="/favorite">
          <MenuItem onClick={handleClose} color="black">
            Favorite
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Orders</MenuItem>
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
  return { auth };
};

export default connect(mapState)(AccountMenu);
