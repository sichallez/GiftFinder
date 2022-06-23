import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  Paper,
  Button,
  Grid,
  Item,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddItem from "./AddItem";
import { getWishlist, deleteFromWishlist, moveItem, changeSetting } from "../../store/wishlist";
import { getAllLists } from "../../store/wishlists";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

class Wishlist extends Component {
  constructor(){
    super();
    this.state={
      anchorEl: null,
      open: false,
      giftID: -1,
      anchorElShared: null,
      openShared: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickShared = this.handleClickShared.bind(this)
    this.handleCloseShared = this.handleCloseShared.bind(this)
  }

  componentDidMount() {
    this.props.getWishlist(this.props.match.params.id);
    this.props.getAllLists();
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.props.getWishlist(this.props.match.params.id);
    }
  }

  onClick(gift,wishlistId){
    this.props.deleteFromWishlist(gift,wishlistId);

  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    })
  }

  handleClose() {
    this.setState({
      anchorEl: null,
      open: !this.state.open
    })
  }

  handleClickShared(event) {
    this.setState({
      anchorElShared: event.currentTarget,
      openShared: !this.state.openShared
    })
  }

  handleCloseShared() {
    this.setState({
      anchorElShared: null,
      openShared: !this.state.openShared
    })
  }

  renderMenu(){
    console.log('render menu')
    return(
    <Menu
      id="list-menu"
      anchorEl={this.state.anchorEl}
      open={this.state.open}
      onClose={this.handleClose}
      >
      {this.props.wishlists.map(list=>{
        return (
        <MenuItem key = {list.id} onClick={()=>{
          this.props.moveItem(this.props.wishlist.id,list.id,this.state.giftID);
          this.handleClose();
          }}>
          {list.name}
        </MenuItem>)
      })}
    </Menu>
    )
  }
  sharedMenu(){
    console.log('shared menu')
    return(
    <Menu
      id="shared-menu"
      anchorEl={this.state.anchorElShared}
      open={this.state.openShared}
      onClose={this.handleCloseShared.bind(this)}
      >
      <MenuItem onClick={()=>{
        this.props.changeSetting(this.props.wishlist)
        this.handleCloseShared();
        }}>
        {this.props.wishlist.isShared ? 'Private' : 'Shared'}
      </MenuItem>
    </Menu>
    )
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
              borderColor: "black",
              backgroundColor: "#f4f4f4",
              margin: '70px auto',
              width: '80%'
            }}
          >
            <Button variant="contained" sx={{ margin: '.5rem'}} startIcon={<AddIcon />}>
              Add Item
            </Button>
            {/* <Button
              variant="outlined"
              startIcon={<AddIcon />}
              endIcon={<FavoriteBorderIcon />}
            >
              Add Item From Your Favorite List
            </Button> */}
            <AddItem />
          </Paper>
        </Box>
      );
    }

    const wishListGifts = this.props.wishlist.gifts;
    return (
      <Grid container m="5px 50px">
        <div>
        <span><Typography variant='h3'  display="inline">{this.props.wishlist.name}</Typography>
          <Typography ml = '20px' fontSize = '20pt' display="inline">{this.props.wishlist.isShared? 'Shared' : 'Private'} 
          <Button 
            aria-owns={this.state.openShared ? 'shared-menu' : undefined}
            onClick={this.handleClickShared.bind(this)}
            >
              <EditIcon/>
          </Button>
          {this.sharedMenu()}
          </Typography></span>
          {wishListGifts.map((gift) => {
            return (
              <div key={gift.id}>
                <Grid container spacing={2}>
                  <Grid item sx={{ width: 300, height: 'auto' }}>
                    <img src={gift.image_url} width="90%" />
                  </Grid>

                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          fontSize="20px"
                          component="div"
                        >
                          <a href={gift.url}>{gift.name}</a>
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          fontSize="19px"
                        >
                          {`$${gift.price}`}
                        </Typography>
                        <Box  display="flex" gap='20px'>
                        <Button
                          onClick={this.onClick.bind(this,gift,this.props.wishlist.id)}
                          color="primary"
                          variant="contained"
                          endIcon={<DeleteIcon style={{ fontSize: 20 }} />}
                        >
                          Delete
                        </Button>
                        <Button
                          aria-owns={this.state.open ? 'list-menu' : undefined}
                          onClick={(e)=>{
                            this.setState({giftID: gift.id})
                            this.handleClick(e)
                          }
                            }
                          color="primary" 
                          variant="contained" 
                          endIcon={<ArrowDropDownIcon style={{ fontSize: 20 }}/>}>
                          Move To Wishlist
                        </Button>
                        {this.renderMenu()}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </Grid>
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
    deleteFromWishlist: function(gift,wishlistId){
      dispatch(deleteFromWishlist(gift,wishlistId));
    },
    moveItem: function(oldListId,newListId,giftId){
      dispatch(moveItem(oldListId,newListId,giftId));
    },
    changeSetting: function(wishlist){
      dispatch(changeSetting(wishlist))
    }
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlist);