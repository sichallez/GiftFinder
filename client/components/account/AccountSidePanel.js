// import React, { useState } from "react";
// import { Link, useLocation, useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
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
  Typography
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import { getAllLists } from "../../store/wishlists";
import { getAllMembers, getAllGiftlist } from "../../store";
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
      openWishListMenu: true,
      openGroupMenu: true,
      openShopForMenu: true,
    };
  }

  componentDidMount() {
    this.props.getAllLists();
    this.props.getAllGiftlist(this.props.auth.id);
  }

  // componentDidUpdate(prevProps){
  //   if(!prevProps.wishlists && this.props.wishlists) {
  //    this.setState({wishlists: this.props.wishlists})
  //  }
  // }

  render() {
    const { openWishListMenu, openGroupMenu, openShopForMenu, wishlists } =
      this.state;
    const { pathname, group, giftlist, getAllMembers } = this.props;
    // the group object in the redux store is { group: [], member: [] }
    const allGroup = group.group;

    const allGiftlist = giftlist.allGiftlist;

    const nonZeroGiftlist = allGiftlist.filter(
      (item) => item.giftlists.length !== 0
    );

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
                        <ListItemText 
                        primary={list.name} 
                        secondary={
                        <Box sx={{fontSize: '12px'}}>
                          {list.isPrivate ? 'private': ''}
                          {list.isPublic ? 'public': ''}
                          {list.isShared ? 'shared': ''}
                        </Box>}
                        />
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
          <Link to="/account/giftlist">
            <MenuItem
              sx={{
                padding: "10px",
              }}
              selected={pathname === "/account/giftlist"}
              onClick={() => this.setState({ openShopForMenu: !openShopForMenu })}
            >
              <ListItemText>Shop For</ListItemText>
              {openShopForMenu ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
          </Link>
          <Collapse in={openShopForMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {nonZeroGiftlist.map((item, index) => (
                <div key={index}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={item.group.name} />
                  </ListItemButton>
                  {item.giftlists.map((giftlist, index) => (
                    <Link to={"/account/giftlist/" + giftlist.id} key={index}>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        selected={
                          pathname === `/account/giftlist/${giftlist.id}`
                        }
                      >
                        <ListItemText primary={giftlist.user.username} />
                      </ListItemButton>
                    </Link>
                  ))}
                </div>
              ))}
            </List>
          </Collapse>
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
    getAllLists:  () => {
      dispatch(getAllLists());
    },
    getAllMembers: (groupRouteId) => {
      dispatch(getAllMembers(groupRouteId));
    },
    getAllGiftlist: (userId) => {
      dispatch(getAllGiftlist(userId));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(AccountSidePanel);
