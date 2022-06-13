import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  Tabs,
  Tab,
  Grid,
  OutlinedInput,
  Box,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import {
  WeddingGift,
  Birthday,
  Graduation,
  SmallHearts,
  Mother,
  Valentine,
  Christmas,
} from "./CustomizedIcons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import "./CategoryTabs.css";

export function Category(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  function handleChange(event, newValue) {
    props.resetPage()
    setSelectedTab(newValue);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const tabStyle = {
    fontSize: "0.7rem",
  };

  return (
    <Grid>
      <Tabs
        value={selectedTab}
        indicatorColor="secondary"
        onChange={handleChange}
        aria-label="icon label tabs"
      >
        <Tab
          icon={<WeddingGift sx={{ fontSize: "large" }} />}
          label="Anniversary"
          onClick={() => props.handleFilter("anniversary")}
          sx={tabStyle}
        />
        <Tab
          icon={<FavoriteIcon sx={{ fontSize: "large" }} />}
          label="Baby Shower"
          onClick={() => props.handleFilter("baby shower")}
          sx={tabStyle}
        />
        <Tab
          icon={<Birthday sx={{ fontSize: "large" }} />}
          label="Birthday"
          onClick={() => props.handleFilter("birthday")}
          sx={tabStyle}
        />
        <Tab
          icon={<Graduation sx={{ fontSize: "large" }} />}
          label="Graduation"
          onClick={() => props.handleFilter("graduation")}
          sx={tabStyle}
        />
        <Tab
          icon={<SmallHearts sx={{ fontSize: "large" }} />}
          label="Wedding"
          onClick={() => props.handleFilter("wedding")}
          sx={tabStyle}
        />
        <Tab
          icon={<PersonPinIcon sx={{ fontSize: "large" }} />}
          label="Father's Day"
          onClick={() => props.handleFilter("father's day")}
          sx={tabStyle}
        />
        <Tab
          icon={<Mother sx={{ fontSize: "large" }} />}
          label="Mother's Day"
          onClick={() => props.handleFilter("mother's day")}
          sx={tabStyle}
        />
        <Tab
          icon={<Valentine sx={{ fontSize: "large" }} />}
          label="Valentine's Day"
          onClick={() => props.handleFilter("valentine's day")}
          sx={tabStyle}
        />
        <Tab
          icon={<Christmas sx={{ fontSize: "large" }} />}
          label="Christmas"
          onClick={() => props.handleFilter("christmas gift")}
          sx={tabStyle}
        />
      </Tabs>
      {/* <Grid direction="row" display="flex" justifyContent="end">
        <Button
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ textDecoration: "underline", textUnderlineOffset: "5px" }}
        >
          SORT/FILTER
        </Button>
      </Grid> */}
    </Grid>
  );
}

export function FilterResults({
  name,
  value,
  onChange,
  disabled,
  onClick,
  handlePrice,
  handleMostViews
}) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <Grid
      container
      direction="row"
      display="flex"
      justifyContent="end"
      alignItems="center"
    >
      <form>
        <Grid
          container
          direction="row"
          display="flex"
          alignItems="center"
          sx={{ margin: 0, paddingRight: "40px" }}
        >
          <FormControl sx={{ width: "25ch" }}>
            <OutlinedInput
              name={name}
              value={value}
              onChange={onChange}
              placeholder="Filter your results"
            />
          </FormControl>
          <Button variant="contained" disabled={disabled} onClick={onClick}>
            Filter
          </Button>
        </Grid>
      </form>
      <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }}>
        <InputLabel id="priceGroup-label">Price Range</InputLabel>
        <Select
          labelId="priceGroup"
          id="priceGroup"
          value="1"
          label="Price"
          onChange={(event) => handlePrice(event.target.value)}
        >
          <MenuItem value="1">Under $50</MenuItem>
          <MenuItem value="2">$50 to $100</MenuItem>
          <MenuItem value="3">$100 to $250</MenuItem>
          <MenuItem value="4">Over $250</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
            label="Most Views"
            control={
              <Checkbox
                checked={checked}
                onChange={(e) =>{ 
                  handleChange(e);
                  handleMostViews(e)
                  }
                }
              />
            }
            sx={{ marginTop: "8px", marginBottom: "8px", marginLeft: "-3px" }}
        />
    </Grid>
  );
}
