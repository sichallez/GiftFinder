import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Grid,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  ListItemIcon,
  Stack,
  Box,
  CssBaseline,
  Divider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import {
  getAllGiftlist,
  getAllGroupsAndMembers,
  getAllMembers,
} from "../../store";

const GiftFor = () => {
  const { auth, group } = useSelector((state) => state);
  console.log("GIFT FOR", group);

  const allGroup = group.group;
  const allMembers = group.member;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGroupsAndMembers(auth.id));
  }, []);
  // dispatch(getAllGiftlist(allGroup));
  console.log("ALL GROUP", allGroup, allMembers, group.groupsAndMembers);
  const groupsAndMembers = group.groupsAndMembers;

  const [openState, setOpenState] = useState({});

  useEffect(() => {
    setOpenState(
      allGroup.reduce((acc, currentGroup) => {
        const id = currentGroup.id;
        return { ...acc, [id]: false };
      }, {})
    );
  }, [allGroup]);

  if (!groupsAndMembers.length) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Groups that I can shop for (Total: {allGroup.length})
      </Typography>
      <List>
        {allGroup.map((group, index) => {
          return (
            // <Link
            //   key={index}
            //   to={"/account/gift/" + group.groupRouteId}
            //   onClick={() => handleRouteChange4SingelGroup(group.groupRouteId)}
            // >
            <div key={index}>
              <ListItem
                onClick={() =>
                  setOpenState({
                    ...openState,
                    [group.id]: !openState[group.id],
                  })
                }
              >
                <ListItemText
                  primary={group.name}
                  primaryTypographyProps={{
                    fontSize: 30,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
                {openState[group.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openState[group.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {groupsAndMembers
                    .filter((item) => item.groupId === group.id)[0]
                    .members.map((list) => {
                      if (list.id !== auth.id)
                        return (
                          <div key={list.id}>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary={list.username} />
                            </ListItemButton>
                          </div>
                        );
                      else return <></>;
                    })}
                </List>
              </Collapse>
            </div>
            // </Link>
          );
        })}
      </List>
    </Container>
  );
};

export const GiftForOne = (userId) => {
  const members = groupsAndMembers.filter(
    (item) => item.groupId === currentGroup.id
  )[0].members;
  const membersWithoutMe = members.filter((item) => item.id !== userId);
  return (<></>);
};

export default GiftFor;
