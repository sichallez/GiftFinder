import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, connect } from "react-redux";

const ProductCard = ({
  id,
  image,
  url,
  title,
  price,
  views,
  product,
  onClick,
  wishlists,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid key={id} item xs={3}>
      <Card
        sx={{
          maxWidth: 345,
          border: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <a href={url} style={{ color: "inherit" }}>
            <CardMedia
              component="img"
              height="288px"
              image={image}
              alt={id}
              sx={{ borderRadius: "5%" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography sx={{ fontSize: "16px" }} component="div">
                  {`${title}...`}
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  ${price}
                </Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "normal", color: 'rgba(0, 0, 0, 0.55)' }}>
                  Views: {views}
                </Typography>
              </CardContent>
            </Box>
          </a>
          <CardActions disableSpacing>
            <IconButton
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                padding: "2px",
                backgroundColor: "white",
              }}
              aria-label="add to favorites"
              aria-controls="list-menu"
              aria-haspopup="true"

              onClick={(event)=>{
                handleClick(event)
              }}
            >
              <AddIcon />
            </IconButton>
            <Menu
              id="list-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {wishlists.map(list=>{
                return (
                <MenuItem key = {list.id} onClick={()=>{
                  console.log(product)
                  onClick(product,list.id)
                  handleClose()
                  }}>
                  {list.name}
                </MenuItem>)
              })}
            </Menu>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default connect(state=>state)(ProductCard);
