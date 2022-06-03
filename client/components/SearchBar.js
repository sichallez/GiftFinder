import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Tabs,
  Tab,
  Grid,
  Box,
  Typography,
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
import PropTypes from "prop-types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

export function Input(props) {
  return <input className="form-control" {...props} />;
}

export function FormBtn(props) {
  return (
    <button {...props} className="btn btn-success filterbtn">
      {props.children}
    </button>
  );
}

export function Filters(props) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `category-tab-${index}`,
      "aria-controls": `category-tabpanel-${index}`,
    };
  }

  return (
    <div className="input-group">
      <Grid>
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={() => {
            handleChange();
            props.handleFilter("birthday");
          }}
          //   onChange={() => props.handleFilter("anniversary")}
          aria-label="icon label tabs"
        >
          <Tab icon={<WeddingGift />} label="Anniversary" {...a11yProps(0)} />
          <Tab icon={<FavoriteIcon />} label="Baby Shower" {...a11yProps(1)} />
          <Tab icon={<Birthday />} label="Birthday" {...a11yProps(2)} />
          <Tab icon={<Graduation />} label="Graduation" {...a11yProps(3)} />
          <Tab icon={<SmallHearts />} label="Wedding" {...a11yProps(4)} />
          <Tab
            icon={<PersonPinIcon />}
            label="Father's Day"
            {...a11yProps(5)}
          />
          <Tab icon={<Mother />} label="Mother's Day" {...a11yProps(6)} />
          <Tab icon={<Valentine />} label="Valentine's Day" {...a11yProps(7)} />
          <Tab icon={<Christmas />} label="Christmas" {...a11yProps(8)} />
        </Tabs>
        {/* <TabPanel value={value} index={0}>
            Item One    
        </TabPanel> */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="priceGroup-label">Price Range</InputLabel>
          <Select
            labelId="priceGroup"
            id="priceGroup"
            label="Price"
            onChange={(event) => props.handlePrice(event.target.value)}
          >
            <MenuItem value="1">Under $50</MenuItem>
            <MenuItem value="2">$50 to $100</MenuItem>
            <MenuItem value="3">$100 to $250</MenuItem>
            <MenuItem value="4">Over $250</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* <div className="input-group-append btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-light active" onClick={() => props.handleFilter("anniversary")}>
                    <input type="radio" name="options" id="anniversary" autoComplete="off" /> Anniversary
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("baby shower")}>
                    <input type="radio" name="options" id="babys" autoComplete="off" /> Baby Shower
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("birthday")}>
                    <input type="radio" name="options" id="birthday" autoComplete="off" /> Birthday
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("graduation")}>
                    <input type="radio" name="options" id="graduation" autoComplete="off" /> Graduation
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("wedding")}>
                    <input type="radio" name="options" id="wedding" autoComplete="off" /> Wedding
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("father's day")}>
                    <input type="radio" name="options" id="fathers-day" autoComplete="off" /> Father's Day
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("mother's day")}>
                    <input type="radio" name="options" id="mothers-day" autoComplete="off" /> Mother's Day
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("valentine's day")}>
                    <input type="radio" name="options" id="valentines-day" autoComplete="off" /> Valentine's Day
                </label>
                <label className="btn btn-light" onClick={() => props.handleFilter("christmas gift")}>
                    <input type="radio" name="options" id="christmas" autoComplete="off" /> Christmas
                </label>
            </div> */}
    </div>
  );
}
