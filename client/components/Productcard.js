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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import "./Productcard.css";

const Productcard = ({ key, loggedIn, page_type, handleBookmark, id, handleDelete, image, url, title, price }) => {
  const [isClicked, setIsClicked] = useState(false);

  const showIcon = () => {
    if (loggedIn) {
      if (page_type === "homepage") {
        return <i className={isClicked ? "fa fa-bookmark fa-lg circle-icon" : "far fa-bookmark fa-lg circle-icon"} onClick={() => {
          handleBookmark(id);
          setIsClicked(true)
        }}></i>
      } else  {
        return <i className="fa fa-trash fa-lg circle-icon" aria-hidden="true" onClick={() => handleDelete(id)}></i>
      }
    }
  }

  return (
    <Grid key={id} item xs={3}>
      <a href={url}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            width="100%"
            image={image}
            alt={id}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography sx={{ fontSize: "18px" }} component="div">
                {`${title}...`}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                ${price}
              </Typography>
            </CardContent>
          </Box>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </a>
    </Grid>
  )
}

export default Productcard;