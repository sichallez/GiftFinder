import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
import { getAllGiftlist, getAllGroupsAndMembers } from "../../store";

const GiftFor = () => {
  const { auth, group, giftlist } = useSelector((state) => state);

  const allGroup = group.group;
  const allMembers = group.member;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGroupsAndMembers(auth.id));
    dispatch(getAllGiftlist(auth.id));
  }, []);

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

  // buys time for react to update the state from redux store//
  // Or using optional chain in Line 105
  // if (!groupsAndMembers.length) {
  //   return null;
  // }

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Groups that I can shop for (Total: {allGroup.length})
      </Typography>
      <List>
        {allGroup.map((group, index) => {
          const giftlistsInThisGroup = giftlist.filter(
            (item) => item.group.id === group.id
          )[0]?.giftlists;
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
                  primary={`${group.name} (${giftlistsInThisGroup?.length} shared wishlists)`}
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
                  {giftlistsInThisGroup?.length ? (
                    groupsAndMembers
                      .filter((item) => item.group.id === group.id)[0]
                      ?.members.map((member) => {
                        const giftlist4ThisMember = giftlistsInThisGroup.filter(
                          (item) => item.userId === member.id
                        );
                        if (member.id !== auth.id) {
                          if (giftlist4ThisMember.length)
                            return (
                              <div key={member.id}>
                                {/* <Link to={`/account/giftlist/${}`} key={list.id}> */}
                                <ListItemButton sx={{ pl: 4 }}>
                                  <ListItemText
                                    primary={`${member.username} (${giftlist4ThisMember.length} shared lists)`}
                                  />
                                </ListItemButton>
                                {giftlist4ThisMember.map((item, index) => (
                                  <ListItem key={index}>
                                    <ListItemText primary={item.name} />
                                  </ListItem>
                                ))}
                              </div>
                            );
                          else
                            return (
                              <div key={member.id}>
                                {/* <Link to={`/account/giftlist/${}`} key={list.id}> */}
                                <ListItemButton sx={{ pl: 4 }}>
                                  <ListItemText primary={`${member.username} (0 shared lists)`} />
                                </ListItemButton>
                                {/* </Link> */}
                              </div>
                            );
                        } else return <div key={member.id}></div>;
                      })
                  ) : (
                    <></>
                  )}
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
  return <></>;
};

export default GiftFor;
