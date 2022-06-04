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

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Grid
      container
      justifyContent="center"
      spacing={0}
      align="center"
      sx={{ margin: "auto" }}
    >
      <form>
        <Grid item display="flex" justifyContent="center">
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="search gift ideas"
            variant="outlined"
            placeholder="Search Gift Ideas"
            size="small"
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
      <Grid item  display="flex" justifyContent="center">
        <Button variant="contained" sx={{ backgroundColor: "#DB4437" }}>
          Tell us more about you
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
