import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GradeIcon from "@mui/icons-material/Grade";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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


const AddItem = () => {
  //const [title, setTitle] = useState("");
  //const [details, setDetails] = useState("");
  const [createValues, setCreateValues] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false)
  const inputImageEl = useRef(null);
console.log('selected', selectedFile)
  const handleChange = (e) => {
    const change = {};
    change[e.target.name] = e.target.value;
    setCreateValues({ ...createValues, ...change });
  };


  useEffect(() => {
    
  }, []) 

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
console.log('file', file)
    const reader = new FileReader();
console.log('reader', reader)
    let url = reader.readAsDataURL(file);
console.log('url', url)
    reader.onloadend = function (e) {
      setSelectedFile([reader.result]);
    };

    // console.log(url); // Would see a path?

    setSelectedFile(event.target.files[0]);
  };
  
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          url='url'
          value={createValues.url ?? ""}
          onChange={handleChange}
          label="Web link"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
        />
       {/*<Button variant="contained" startIcon={<AutoFixHighIcon />}></Button>*/}
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
        {
          selectedFile ? <img src={ selectedFile } style={{ width: '100px', height: '100px'}}/> : null
        }
        <input
          //accept="image/*"
          id="upload-image-button"
          multiple
          type="file"
          onChange={handleUploadClick}
          ref={inputImageEl}
          style={{display:'none'}}
        />
        <label htmlFor="upload-image-button" style={{marginLeft:'18px'}}>
          <Fab component="span">
            <AddPhotoAlternateIcon/>
          </Fab>
        </label>

        <Box>
          <StyledRating
            name="rating"
            value={createValues.rating ?? ""}
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
  );
};

const mapDispatch = dispatch => {
  return {
      addToWishlist: function (product, wishlistId) {
        dispatch(addToWishlist(product, wishlistId));
    },
  }
}

export default connect(null, mapDispatch)(AddItem);
