import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Fab,
  Button,
  Container,
  TextField,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Tabs,
  Tab,
  Box,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { styled } from "@mui/material/styles";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import AddIcon from "@mui/icons-material/Add";
import GradeIcon from "@mui/icons-material/Grade";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import GradeIcon from "@mui/icons-material/Grade";

import {addToWishlist} from '../../store/wishlist'

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "rgb(250, 179, 0)",
  },
  "& .MuiRating-iconHover": {
    color: "rgb(255, 217, 133)",
  },
});

const initialState = {
  url: "",
  name: "",
  image_url: "",
  rating: 0,
  price: "",
  description: ""
};

const AddItem = ({ id }) => {
  const [createValues, setCreateValues] = useState(initialState);
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false)


  const handleChange = (e) => {
    const change = {};
    change[e.target.name] = e.target.value;
    setCreateValues({ ...createValues, ...change });
  };
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      url,
      name,
      image_url,
      rating,
      price,
      description
    } = createValues

    dispatch(addToWishlist({...createValues}, id))
   
    setCreateValues("")
  };

  return (

    <Container 
      maxWidth="md" 
      sx={{ 
        backgroundColor: '#f4f4f4',
        width: '95%'
      }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          name='url'
          value={createValues.url ?? ""}
          onChange={handleChange}
          label="Web link"
          variant="outlined"
          color="secondary"
          fullWidth
          autoFocus={true}
          error={titleError}
        />
        <TextField
          onChange={handleChange}
          value={createValues.name ?? ""}
          label="Gift Name"
          name='name'
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={detailsError}
        />
        <TextField
          onChange={handleChange}
          value={createValues.image_url ?? ""}
          label="Image link"
          name='image_url'
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <Box>
          <StyledRating
            name="rating"
            value={createValues.rating*1 ?? ""}
            onChange={handleChange}
            //getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<GradeIcon fontSize="inherit" />}
            emptyIcon={<GradeIcon fontSize="inherit" />}
          />
        </Box>

        <TextField
          name='price'
          value={createValues.price ?? "" }
          onChange={handleChange}
          label="Price"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
        />
        {/*<TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Where to buy"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
        />*/}
          <TextField
            name='description'
            value={createValues.description ?? ""}
            onChange={handleChange}
            label="Description"
            variant="outlined"
            color="secondary"
            fullWidth 
            multiline
            error={titleError}
          />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Save
        </Button>

      </form>
    </Container>
    </>
  );
};

const mapState = ({ wishlist }) => {
  const id = wishlist.id
  return {
    id
  }
}
const mapDispatch = dispatch => {
  return {
      addToWishlist: function (product, id) {
        dispatch(addToWishlist(product, id));
    },
  }
}

export default connect(mapState, mapDispatch)(AddItem);
