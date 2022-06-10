import React, { Component } from "react";
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


const WishlistMenu = () => {
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
    <Container maxWidth="sm" sx={{marginTop: "30px"}}>
      <Typography variant="h6" component="h2" gutterBottom>
        You have {subWishList.length} Wishlist available:
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



export default WishlistMenu;
