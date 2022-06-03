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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import "./ProductCard.css";

const ProductCard = ({
  key,
  loggedIn,
  page_type,
  handleBookmark,
  id,
  handleDelete,
  image,
  url,
  title,
  price,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const showIcon = () => {
    if (loggedIn) {
      if (page_type === "homepage") {
        return (
          <i
            className={
              isClicked
                ? "fa fa-bookmark fa-lg circle-icon"
                : "far fa-bookmark fa-lg circle-icon"
            }
            onClick={() => {
              handleBookmark(id);
              setIsClicked(true);
            }}
          ></i>
        );
      } else {
        return (
          <i
            className="fa fa-trash fa-lg circle-icon"
            aria-hidden="true"
            onClick={() => handleDelete(id)}
          ></i>
        );
      }
    }
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
            >
              <FavoriteBorderIcon />
            </IconButton>
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default ProductCard;
