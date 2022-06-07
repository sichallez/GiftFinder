import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  MenuList,
  MenuItem,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";

const drawerWidth = 240;

const AccountSidePanel = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    // <Drawer
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       '& .MuiDrawer-paper': {
    //         width: drawerWidth,
    //         boxSizing: 'border-box',
    //       },
    //     }}
    //     variant="permanent"
    //     anchor="left"
    //   ></Drawer>
    <Box
      sx={{
        backgroundColor: "red",
        marginLeft: "25px",
        marginTop: "25px",
        width: "150px",

        backgroundColor: "secondary",
      }}
    >
      <h3
        style={{
          margin: "10px",
        }}
      >
        My Account
      </h3>
      <Divider />
      <MenuList>
        <Link to="/account/profile">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={pathname === "/account/profile"}
          >
            <ListItemText>Account Profile</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/wishlist">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={pathname === "/account/wishlist"}
          >
            <ListItemText>Wish List</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/group">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={pathname === "/account/group"}
          >
            <ListItemText>My Groups</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/gift">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={pathname === "/account/gift"}
          >
            <ListItemText>Shop For</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/notification">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={pathname === "/account/notification"}
          >
            <ListItemText>Notification</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Box>
  );
};

export default AccountSidePanel;
