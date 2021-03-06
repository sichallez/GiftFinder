import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  IconButton,
  Container,
  TextField,
  Menu,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { makeStyles } from "@mui/styles";
import { createGroup, getAllGroups, getAllMembers, removeMember, inviteMember} from "../../store/group";
import { generateString } from "../../../utils";
import axios from "axios";

const useStyles = makeStyles({
  field: {
    margin: '25px 100px',
    display: "block",
  },
  menuItemText: {
    fontWeight: "600",
  },
});

const MyGroups = ({ group }) => {
  const allGroup = group.group;

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
      <Container maxWidth="md"  sx={{margin: '25px 100px'}}>
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
    <Container maxWidth="md">
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
        {allGroup.map((item, index) => (
          <Link
            key={index}
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

const _SingleGroup = ({ auth, group, getAllMembers, removeMember, inviteMember, match }) => {
  const allGroup = group.group;

  // // buys time for the component to update its state from redux store
  if (!allGroup.length) {
    return null;
  }
  const groupRouteId = match.params.groupRouteId;
  const currentGroup = allGroup.filter(
    (item) => item.groupRouteId === groupRouteId
  )[0];

  useEffect(() => {
    getAllMembers(groupRouteId);
  }, []);

  const allMembers = group.member;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openPopUp, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleButtonMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosePopUp = () => {
    setOpen(false);
    setEmail('');
  };

  const handleInviteMembers = (group,email) => {
    console.log('adding')
    inviteMember(group,email)
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  if(!currentGroup){
    return null;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" component="h2" gutterBottom>
        {currentGroup.name}
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Invite more members
      </Button>
      <Dialog open={openPopUp} onClose={handleClosePopUp}>
        <DialogTitle>Invite Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the email of the user you wish to add to your group.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value ={email}
            onChange={handleChange}
            placeholder={'Enter Email'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Cancel</Button>
          <Button onClick={()=>{
            handleInviteMembers(currentGroup,email)
            handleClosePopUp()}}>Add</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h5" component="h2" gutterBottom>
        Members
      </Typography>
      <Divider />
      <List>
        {allMembers.map((item, index) =>
          currentGroup.ownerId === auth.id ? (
            <ListItem key={index}>
              {item.id === auth.id ? (
                <>
                  <ListItemText
                    primary={`${item.username} (YOU)`}
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

                  <ListItemText
                    primary="group owner"
                    primaryTypographyProps={{
                      fontSize: 20,
                      color: "gray",
                      fontWeight: "medium",
                      letterSpacing: 0,
                    }}
                  />
                </>
              ) : (
                <>
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
                  <IconButton
                    aria-label="more"
                    color="error"
                    onClick={handleButtonMenuClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>Message member</MenuItem>
                    <MenuItem
                      sx={{ color: "#c74152", fontWeight: "550" }}
                      onClick={()=>{
                        removeMember(currentGroup,item.id);
                        handleClose()}}
                    >
                      Remove from group
                    </MenuItem>
                  </Menu>
                </>
              )}
            </ListItem>
          ) : (
            <ListItem key={index}>
              {item.id === auth.id ? (
                <ListItemText
                  primary={`${item.username} (YOU)`}
                  primaryTypographyProps={{
                    fontSize: 30,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              ) : (
                <ListItemText
                  primary={item.username}
                  primaryTypographyProps={{
                    fontSize: 30,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              )}
              <ListItemText
                primary={item.email}
                primaryTypographyProps={{
                  fontSize: 30,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
              {item.id === currentGroup.ownerId ? (
                <ListItemText
                  primary="group owner"
                  primaryTypographyProps={{
                    fontSize: 20,
                    color: "gray",
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              ) : (
                <></>
              )}
            </ListItem>
          )
        )}
      </List>
    </Container>
  );
};

const _CreateGroup = ({ auth,createGroup, inviteMember }) => {
  const classes = useStyles();
  const [groupName, setGroupName] = useState("");
  const [email1, setEmail1] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");

  const [selectedTab, setSelectedTab] = React.useState(0);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (groupName === "") {
      setTitleError(true);
    }

    if (groupName) {
      const groupRouteId = generateString(5);
      const newGroup = { name: groupName, groupRouteId, ownerId: auth.id };
      await createGroup(newGroup, auth.id);
      await inviteMember(newGroup,email1);
      // after it is created, redirect it to the url of the newly created group
      const newGroupPath = `/account/group/${groupRouteId}`;
      history.push(newGroupPath);
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
          onChange={(e) => setGroupName(e.target.value)}
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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2" color="gray" gutterBottom>
              Please enter the user's email below. 
            </Typography>
          </Grid>
          <Grid item xs={20}>
            <TextField
              className={classes.field}
              onChange={(e) => setEmail1(e.target.value)}
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
    removeMember:(group,userId)=>{
      dispatch(removeMember(group,userId));
    },
    inviteMember:(group,email)=>{
      dispatch(inviteMember(group,email))
    }
  };
};

export const SingleGroup = connect(mapState, mapDispatch)(_SingleGroup);
export const CreateGroup = connect(mapState, mapDispatch)(_CreateGroup);
export default connect(mapState, mapDispatch)(MyGroups);
