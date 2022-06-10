import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
  List,
  ListItem,
  ListItemText,
  Stack,
  Box,
  CssBaseline,
  Divider,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@mui/styles";
import { createGroup, getAllGroups, getAllMembers } from "../../store/group";
import { generateString } from "../../../utils";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const MyGroups = ({ auth, group, getAllGroups }) => {
  const userId = auth.id;
  useEffect(() => {
    getAllGroups(userId);
  }, []);

  const allGroup = group.group;

  console.log("NOW GROUPS FETCHED?", group);

  const history = useHistory();

  const handleRouteChange4Create = () => {
    let path = "/account/group/new";
    history.push(path);
  };

  const handleRouteChange4SingelGroup = (groupRouteId) => {
    let path = `/account/group/${groupRouteId}`;
    history.push(path);
  };

  const handelJoinGroup = () => {};

  if (!allGroup.length) {
    // if a user does not belongs to any group
    // show the page for Creating a group or Finding a group
    return (
      <Container maxWidth="md" sx={{ marginTop: "30px" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Don't have a group yet?
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleRouteChange4Create}
          >
            Create A New Group
          </Button>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handelJoinGroup}
          >
            Join A Group
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Groups that I belong to (Total: {allGroup.length})
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleRouteChange4Create}
      >
        Create A New Group
      </Button>
      <List>
        {allGroup.map((item) => (
          <Link
            to={"/account/group/" + item.groupRouteId}
            onClick={() => handleRouteChange4SingelGroup(item.groupRouteId)}
          >
            <ListItem>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: 30,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                color="error"
              >
                Settings
              </Button>
            </ListItem>
          </Link>
        ))}
      </List>
    </Container>
  );
};

const _SingleGroup = ({ auth, group, getAllMembers, match }) => {
  console.log("Single single here here", group, match);
  const allGroup = group.group;
  const groupRouteId = match.params.groupRouteId;
  const currentGroup = allGroup.filter(item => item.groupRouteId === groupRouteId)[0];
  console.log("CURRENT GROUP", currentGroup);

  useEffect(() => {
    getAllMembers(groupRouteId);
  }, []);

  console.log("ALL MEMBERS!!", group.member)
  const allMembers = group.member;

  const handleInviteMembers = () => {
    
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {currentGroup.name}
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleInviteMembers}
      >
        Invite more members
      </Button>
      <Typography variant="h5" component="h2" gutterBottom>
        Members
      </Typography>
      <Divider />
      <List>
        {allMembers.map((item) => (
          // <Link
          //   to={"/account/" + item.groupRouteId}
          //   onClick={() => handleRouteChange4SingelGroup(item.groupRouteId)}
          // >
            <ListItem>
              <ListItemText
                primary={item.username}
                primaryTypographyProps={{
                  fontSize: 30,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
              <ListItemText
                primary={item.email}
                primaryTypographyProps={{
                  fontSize: 30,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                color="error"
              >
                Settings
              </Button>
            </ListItem>
          // </Link>
        ))}
      </List>
    </Container>
  );
};

const _CreateGroup = ({ auth, createGroup }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");

  const dummyData = [];

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (name == "") {
      setTitleError(true);
    }

    if (name) {
      const groupRouteId = generateString(5);
      const newGroup = { name, groupRouteId };
      console.log("USERID USERID??", auth.id, typeof auth.id);
      createGroup(newGroup, auth.id);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create A New Group
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setName(e.target.value)}
          label="Name your group"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          placeholder="Visible to your group (eg. Smith Family)"
          multiline
          error={titleError}
        />

        <Typography variant="h5" component="h2" gutterBottom>
          Invite Members
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2" color="gray" gutterBottom>
              {auth.username}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2" color="gray" gutterBottom>
              {auth.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.field}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              placeholder="Full name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.field}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              placeholder="Email address"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.field}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              placeholder="Full name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.field}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              placeholder="Email address"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Create Group & Invite
        </Button>
      </form>
    </Container>
  );
};

export const JoinGroup = () => {};

const mapState = ({ auth, group }, { match }) => {
  console.log("GROUP HEER", auth, group, match);
  return { auth, group };
};

const mapDispatch = (dispatch) => {
  return {
    getAllGroups: (userId) => {
      dispatch(getAllGroups(userId));
    },
    createGroup: (newGroup, userId) => {
      dispatch(createGroup(newGroup, userId));
    },
    getAllMembers: (groupRouteId) => {
      dispatch(getAllMembers(groupRouteId));
    },
  };
};

export const SingleGroup = connect(mapState, mapDispatch)(_SingleGroup);
export const CreateGroup = connect(mapState, mapDispatch)(_CreateGroup);
export default connect(mapState, mapDispatch)(MyGroups);
