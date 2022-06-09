import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { getWishlist } from "../../store/wishlist";

const WishlistMenu = () => {

  const subWishList = [
    {
      name: "Birthday",
      listId: "WKbna",
      get url() {
        return `/account/wishlist/${this.listId}`;
      },
    },
    {
      name: "Travel",
      listId: "WAWrX",
      get url() {
        return `/account/wishlist/${this.listId}`;
      },
    },
    {
      name: "Graduation",
      listId: "lddsX",
      get url() {
        return `/account/wishlist/${this.listId}`;
      },
    },
  ];

  return (
    <Container maxWidth="sm" sx={{marginTop: "30px"}}>
      <Typography variant="h6" component="h2" gutterBottom>
        You have {subWishList.length} Wishlist avaible:
      </Typography>
      <List>
        {subWishList.map((item) => (

          <Link to={item.url}>
            <ListItem>
              <ListItemText primary={item.name} />
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
              >
                Delete
              </Button>
            </ListItem>
          </Link>
        ))}
      </List>
      <Button variant="contained" startIcon={<AddIcon />}>
        Add a New List
      </Button>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: function () {
      dispatch(getWishlist());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(WishlistMenu);
