import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
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
      // justifyContent="center"
      // spacing={0}
      // align="center"
      // alignItems="center"
    >
      <form>
        <Grid
          item
          width='280px'
          flexDirection="row"
          display="flex"
          alignContent="center"
          sx={{
            border: "1px solid gray",
            borderBottomLeftRadius: "25px",
            borderTopLeftRadius: "25px",
            borderBottomRightRadius: "25px",
            borderTopRightRadius: "25px",
          }}
        >
          <InputBase
          
            sx={{ margin: '0 4rem 0 0', paddingLeft: 2, paddingTop: 0.75, paddingBottom: 0.5, fontFamily: 'Quicksand'}}
            id="search-bar"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="search gift ideas"
            inputProps={{ "aria-label": "search gift ideas" }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "purple"}} />
          </IconButton>
        </Grid>
      </form>

      {/* <Grid
        xs={1}
        item
        display="flex"
        justifyContent="center"
      >
        <h5>OR</h5>
      </Grid>
      <Grid item flexDirection="column" display="flex" justifyContent="center">
        <button className='searchbar-btn'>
          <Link to='/questions'>Personalized Gift</Link>
        </button>
      </Grid> */}
    </Grid>
  );
};

export default SearchBar;
