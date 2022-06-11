import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Paper, Button, Grid, Item, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddItem from "./AddItem";
import { getWishlist } from "../../store/wishlist";
import { getAllLists } from "../../store/wishlists";

class Wishlist extends Component {
  componentDidMount() {
    console.log(this.props)
    this.props.getWishlist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps){
    console.log('UPDATE')
    console.log(this.props)
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.props.getWishlist(this.props.match.params.id);
    }
  }

  render() {
    if (!this.props.wishlist) {
      return null;
    }

    if (!this.props.wishlist.gifts || this.props.wishlist.gifts.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={12}
            sx={{
              border: 1,
              borderColor: "#f4eee0",
              backgroundColor: "#f4eee0",
            }}
          >
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Item
            </Button>
            <Button variant="outlined" startIcon={<AddIcon />} endIcon={<FavoriteBorderIcon />}>
              Add Item From Your Favorite List
            </Button>
            <AddItem />
          </Paper>
        </Box>
      );
    }

    const wishListGifts = this.props.wishlist.gifts;

    return (
      <div><h1>{this.props.wishlist.name}</h1>
      {wishListGifts.map(gift => {

        return (
          <div key={gift.id}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: 500, height: 500 }}>
                  <img src={gift.image_url} width="90%" />
              </Grid>

              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                     {gift.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                     {`$${gift.price}`}
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>

            {/* <img src={gift.image_url} width="20%" />
              {gift.name}
              {`$${gift.price}`} */}


            </Grid>
            <br />
            <br />
          </div>
        );
      })}</div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: function (id) {
      dispatch(getWishlist(id));
    },
    getAllLists: function () {
      dispatch(getAllLists());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlist);