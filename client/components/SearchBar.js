import React, { useState } from "react";
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
      direction="row"
      justifyContent="center"
      spacing={0}
      align="center"
      sx={{ margin: "auto" }}
    >
      <form>
        <Grid item direction="row" display="flex" justifyContent="center">
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
        direction="column"
        display="flex"
        justifyContent="center"
      >
        <h5>OR</h5>
      </Grid>
      <Grid item direction="column" display="flex" justifyContent="center">
        <Button variant="contained" sx={{ backgroundColor: "#DB4437" }}>
          Tell us more about you
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
