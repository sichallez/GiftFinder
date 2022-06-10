import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  Container,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import {createWishlist} from '../../store/wishlists'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  
});

const initialState = {
  name: "",
  details: "",
  team8project: false,
  WifeAndHusband: false,
  RocAndRoll: false,
  FullstackAcademyFolks: false,
}
const CreateList = ({ userId }) => {
  const [createValues, setCreateValues] = useState(initialState)
  const classes = useStyles();
  //const history = useHistory();
  ///const [title, setTitle] = useState("");
  ///const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  ////const [category, setCategory] = useState("money");

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const onChange = (e) => {
    const change = {};
    change[e.target.name] = e.target.value;
    setCreateValues(change);
  };

  const handleCheckboxChange = () => {

  };

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      details,
      team8project,
      WifeAndHusband,
      RocAndRoll,
      FullstackAcademyFolks,
    } = createValues;

    dispatch(createWishlist({...createValues, userId}))
    setCreateValues('')
  };


  return (
    <Container maxWidth="md" sx={{marginTop: "30px"}}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create A New List
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          name='name'
          value={createValues.name ?? ''}
          onChange={onChange}
          label="Name your list"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          className={classes.field}
          name='details'
          value={createValues.details ?? ''}
          onChange={onChange}
          label="Add a note (optional)"
          variant="outlined"
          color="secondary"
          fullWidth
          error={detailsError}
        />

        <Typography variant="h6" component="h2" gutterBottom>
          Who can see this list?
        </Typography>

        <Grid>
          <Tabs
            value={selectedTab}
            indicatorColor="secondary"
            onChange={handleTabChange}
            aria-label="icon label tabs"
          >
            <Tab
              icon={<LockIcon sx={{ fontSize: "large" }} />}
              label="Private: just you"
            />
            <Tab
              icon={<GroupsIcon sx={{ fontSize: "large" }} />}
              label="Shared: Groups"
            />
            <Tab
              icon={<PublicIcon sx={{ fontSize: "large" }} />}
              label="Public: anyone"
            />
          </Tabs>
        </Grid>
        <TabPanel value={selectedTab} index={0}>
          Private list ONLY visible to yourself.
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <FormControl className={classes.field}>
            <FormLabel>Select Groups to Share With</FormLabel>
            <FormGroup>
              <FormControlLabel
                value="team8project"
                control={
                  <Checkbox
                    checked={true}
                    onChange={handleCheckboxChange}
                    name="team-8-project"
                  />
                }
                label="Team-8-Project"
              />
              <FormControlLabel
                value="WifeAndHusband"
                control={
                  <Checkbox
                    checked={true}
                    onChange={handleCheckboxChange}
                    name="WifeAndHusband"
                  />
                }
                label="Wife-and-Husband"
              />
              <FormControlLabel
                value="RocAndRoll"
                control={
                  <Checkbox
                    checked={true}
                    onChange={handleCheckboxChange}
                    name="RockAndRoll"
                  />
                }
                label="Rock-and-Roll"
              />
              <FormControlLabel
                //value="FullstackAcademyFolks"
                control={
                  <Checkbox
                    checked={true}
                    onChange={handleCheckboxChange}
                    name="FullstackAcademyFolks"
                  />
                }
                label="Fullstack Academy Folks"
              />
            </FormGroup>
          </FormControl>
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          Anyone can shop your list – no account required. Choose this option
          for baby & wedding registries.
        </TabPanel>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Create
        </Button>
      </form>
    </Container>
  );
};

const mapState = ({auth}) => {
  return {
    userId: auth.id
  }
}

const mapDispatch = (dispatch)=> {
  return {
    createWishlist: (wishlist) => {
      dispatch(createWishlist(wishlist))
    } 
  }
}


export default connect(mapState, mapDispatch)(CreateList);
