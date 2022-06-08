import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddItem from "./AddItem";
import { getWishlist } from "../../store/wishlist";

class Wishlist extends Component {
  componentDidMount() {
    const { listId } = this.props.match.params;
    // this.props.getWishlist(listId);
  }

  render() {
    const { listId } = this.props.match.params;

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
            variant="outlined"
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
      // return (
      //   <div className="productList">
      //     <Box
      //       sx={{
      //         display: "flex",
      //         justifyContent: "space-between",
      //         alignItems: "center",
      //       }}
      //       direction="row"
      //       spacing={5}
      //     >
      //       <Link to="/account/wishlist/addItem">
      //         <Box sx={{ "& > :not(style)": { m: 1 } }}>
      //           <Fab
      //             variant="extended"
      //             size="medium"
      //             color="primary"
      //             aria-label="add"
      //           >
      //             <AddIcon sx={{ mr: 1 }} />
      //             Add Item
      //           </Fab>
      //         </Box>
      //       </Link>
      //     </Box>

      //     <div style={{ height: "87%", width: "100%" }}>
      //       <DataGrid
      //         sx={{
      //           boxShadow: 2,
      //           backgroundColor: "white",
      //         }}
      //         rowHeight={85}
      //         headerHeight={40}
      //         rows={flowersToRender}
      //         columns={columns}
      //         pageSize={6}
      //         disableSelectionOnClick
      //       />
      //     </div>
      //   </div>
      // );
    }

    const wishListGifts = this.props.wishlist.gifts;

    return (
      <div>
        {wishListGifts.map((gift) => {
          console.log(gift);

          return (
            <div key={gift.id}>
              {gift.name} <br />
              <img src={gift.image_url} width="50%" /> <br />
              {`$${gift.price}`}
              <br />
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: function () {
      dispatch(getWishlist());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlist);
