import React from "react";
import {
    Button,
    Typography,
    InputBase,
    Grid,
    Paper,
    IconButton,
  } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Welcome = () => {
  
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "90%",
    margin: "20px auto",
    backgroundColor: "#2f303a",
    color: "white",
  };

  return (
    <Grid align="center">
        <Paper elevation={3} style={paperStyle}>
            <Typography
                variant="h3"
                sx={{
                fontFamily: "Helvetica",
                fontWeight: "500",
                marginTop: "5px",
                marginBottom: "15px",
                }}
            >
                Looking for a spectacular gift idea for your cared ones?
            </Typography>
            <Grid>
            <Grid xs={6}>
                <InputBase
                sx={{ ml: 1, flex: 1, color: "white" }}
                placeholder="Search Gift Ideas"
                inputProps={{ 'aria-label': 'search gift ideas' }}
                />
                <IconButton type="submit" sx={{ p: '10px', color: "white" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Grid>
            <Grid xs={1}>
                <h5>OR</h5></Grid>
            <Grid xs={5}>
                <Button variant="contained" sx={{backgroundColor: '#DB4437'}}>Tell us more about you</Button>
            </Grid>
            </Grid>
        </Paper>
    </Grid>
  );
};

export default Welcome;
