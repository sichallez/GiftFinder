import React, { useState } from "react";
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
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GradeIcon from "@mui/icons-material/Grade";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
    // color: "dodgerBlue",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");
  
  const subWishList = [];

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCheckboxChange = () => {};

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile([reader.result]);
    };

    // console.log(url); // Would see a path?

    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Web link"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
        />
        <Button variant="contained" startIcon={<AutoFixHighIcon />}></Button>
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          label="Gift Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={detailsError}
        />
        <input
          accept="image/*"
          id="upload-image-button"
          multiple
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="upload-image-button">
          <Fab component="span">
            <AddPhotoAlternateIcon />
          </Fab>
        </label>

        <Box
          sx={{
            mt: 0.5,
          }}
        >
          <StyledRating
            name="customized-color"
            defaultValue={4.5}
            // getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            readOnly
            icon={<GradeIcon fontSize="inherit" />}
            emptyIcon={<GradeIcon fontSize="inherit" />}
          />
        </Box>

        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Price"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
        />
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Where to buy"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
        />
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Description"
          variant="outlined"
          color="secondary"
          fullWidth
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

export default AddItem;
