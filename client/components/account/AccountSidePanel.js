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
import { connect } from "react-redux";
import {HashRouter, BrowserRouter, Route} from 'react-router-dom';
import { getAllLists } from "../../store/wishlists";
import Wishlists from "./Wishlists";
import wishlist from "../../store/wishlist";


const drawerWidth = 240;

class AccountSidePanel extends Component {
  constructor(props){
    super(props);
    this.state={
      open: false,
      pathname: ''
    }
  }

  componentDidMount() {
    this.props.getAllLists();
  }
  // componentDidUpdate(prevProps){
  //   console.log(prevProps)
  // }

  handleClick (){
    this.setState({open: !open});
  };

  render() {
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
            selected={this.state.pathname === "/account/profile"}
          >
            <ListItemText>Account Profile</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/wishlist">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={this.state.pathname === "/account/wishlist"}
            onClick={()=>{
              this.setState({open: !this.state.open})
              this.props.getAllLists()
            }}
          >
            <ListItemText>Wish List</ListItemText>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
        </Link>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/account/wishlist/new">
              <ListItemButton
                sx={{ pl: 4 }}
                selected={this.state.pathname === "/account/wishlist/new"}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="new list" />
              </ListItemButton>
            </Link>
            <Divider />
            {this.props.wishlists.map(list=>{
              return(
                <div key={list.id}>
                  <Link to={`/account/wishlist/${list.id}`}>
                   <ListItemButton sx={{ pl: 4 }} selected={this.state.pathname === `/account/wishlist/${list.id}`}>
                   <ListItemText primary={list.name} />
                  </ListItemButton>
                  </Link>
                </div>
              )
            })}
          </List>
        </Collapse>
        <Link to="/account/group">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={this.state.pathname === "/account/group"}
          >
            <ListItemText>My Groups</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/gift">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={this.state.pathname === "/account/gift"}
          >
            <ListItemText>Shop For</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/favlist">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={this.state.pathname === "/account/favlist"}
          >
            <ListItemText>Favorite List</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/account/notification">
          <MenuItem
            sx={{
              padding: "10px",
            }}
            selected={this.state.pathname === "/account/notification"}
          >
            <ListItemText>Notification</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Box>
  );
}
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLists: function () {
      dispatch(getAllLists());
    },
  };
};


export default connect((state) => state, mapDispatchToProps)(AccountSidePanel);
