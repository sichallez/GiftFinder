import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  InputBase,
  Grid,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BackspaceIcon from "@mui/icons-material/Backspace";
// import "./SearchBar.css";
// import { Theme, createStyles, makeStyles, withStyles } from '@mui/styles';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // const classes = useStyles();

  const clearInput = () => {
    setSearchQuery("");
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={0}
      align="center"
      alignItems="center"
      sx={{ margin: "auto" }}
    >
      <form>
        <Grid
          item
          flexDirection="row"
          display="flex"
          justifyContent="center"
          sx={{
            border: "1px solid gray",
            borderBottomLeftRadius: "25px",
            borderTopLeftRadius: "25px",
            borderBottomRightRadius: "25px",
            borderTopRightRadius: "25px",
          }}
        >
          <InputBase
            sx={{ margin: 0, paddingLeft: 2, paddingTop: 1, paddingBottom: 1 }}
            id="search-bar"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search Gift Ideas"
            inputProps={{ "aria-label": "search gift ideas" }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </Grid>
      </form>

      <Grid
        xs={1}
        item
        display="flex"
        justifyContent="center"
      >
        <h5>OR</h5>
      </Grid>
      <Grid item flexDirection="column" display="flex" justifyContent="center">
        <Button variant="contained" color="primary">
          Need Guidence?
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
