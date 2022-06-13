// import React, { useState } from "react";
// import { Link, useLocation, useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import React, { Component } from "react";
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
import { getAllMembers } from "../../store/group";
import { connect } from "react-redux";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import { getAllLists } from "../../store/wishlists";
import Wishlists from "./Wishlists";
import wishlist from "../../store/wishlist";

// const AccountSidePanel = () => {
//   const location = useLocation();
//   const pathname = location.pathname;
//   const history = useHistory();
// const drawerWidth = 240;

class AccountSidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openWishListMenu: false,
      openGroupMenu: true,
    };
  }

  componentDidMount() {
    this.props.getAllLists();
  }
  // componentDidUpdate(prevProps){
  //   console.log(prevProps)
  // }

  render() {
    const { openWishListMenu, openGroupMenu } = this.state;
    const { pathname, group, getAllMembers } = this.props;
    // the group object in the redux store is { group: [], member: [] }
    const allGroup = group.group;

    return (
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
              onClick={() => {
                this.setState({ openWishListMenu: !openWishListMenu });
                this.props.getAllLists();
              }}
            >
              <ListItemText>Wish List</ListItemText>
              {openWishListMenu ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
          </Link>
          <Collapse in={openWishListMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/account/wishlist/new">
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={pathname === "/account/wishlist/new"}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="new list" />
                </ListItemButton>
              </Link>
              <Divider />
              {this.props.wishlists.map((list) => {
                return (
                  <div key={list.id}>
                    <Link to={`/account/wishlist/${list.id}`}>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        selected={pathname === `/account/wishlist/${list.id}`}
                      >
                        <ListItemText primary={list.name} />
                      </ListItemButton>
                    </Link>
                  </div>
                );
              })}
            </List>
          </Collapse>
          <Link to="/account/group">
            <MenuItem
              sx={{
                padding: "10px",
              }}
              selected={pathname === "/account/group"}
              onClick={() => this.setState({ openGroupMenu: !openGroupMenu })}
            >
              <ListItemText>My Groups</ListItemText>
              {openGroupMenu ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
          </Link>
          <Collapse in={openGroupMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/account/group/new">
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={pathname === "/account/group/new"}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="create group" />
                </ListItemButton>
              </Link>
              <Divider />
              {allGroup.map((group, index) => (
                <Link to={"/account/group/" + group.groupRouteId} key={index}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={
                      pathname === `/account/group/${group.groupRouteId}`
                    }
                    onClick={() => getAllMembers(group.groupRouteId)}
                  >
                    <ListItemText primary={group.name} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLists: function () {
      dispatch(getAllLists());
    },
    getAllMembers: (groupRouteId) => {
      dispatch(getAllMembers(groupRouteId));
    },
  };
};

export default connect(state => state, mapDispatchToProps)(AccountSidePanel);
