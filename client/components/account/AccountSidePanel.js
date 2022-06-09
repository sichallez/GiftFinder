import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  MenuList,
  MenuItem,
  ListItemText,
  Divider,
  Drawer,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

const drawerWidth = 240;

const AccountSidePanel = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const subWishList = [

    {
      name: "Birthday",
      listId: "1",
      get url() {
        return `/account/wishlist/${this.name}`;
      },
    },
    {
      name: "Travel",
      listId: "2",
      get url() {
        return `/account/wishlist/${this.name}`;
      },
    },
    {
      name: "Graduation",
      listId: "3",
      get url() {
        return `/account/wishlist/${this.name}`;
      },
    },
  ];

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
        width: "200px",

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
            onClick={handleClick}
          >
            <ListItemText>Wish List</ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
        </Link>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/account/wishlist/new">
              <ListItemButton
                sx={{ pl: 4 }}
                selected={pathname === "/account/wishlist/new"}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="new list" />
              </ListItemButton>
            </Link>
            <Divider />
            {subWishList.map((item,index) => (
              <Link to={item.url} key={index}>
                <ListItemButton sx={{ pl: 4 }} selected={pathname === item.url}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
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
        <Link to="/account/favlist">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={pathname === "/account/favlist"}
          >
            <ListItemText>Favorite List</ListItemText>
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
