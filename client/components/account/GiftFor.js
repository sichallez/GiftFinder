import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import TaskIcon from '@mui/icons-material/Task';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import {
  getAllGiftlist,
  getAllGroupsAndMembers,
  getOneGiftlist,
} from "../../store";

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
  const allGiftlist = giftlist.allGiftlist;

  const [openState, setOpenState] = useState({});

  useEffect(() => {
    setOpenState(
      allGroup.reduce((acc, currentGroup) => {
        const id = currentGroup.id;
        return { ...acc, [id]: false };
      }, {})
    );
  }, [allGroup]);

  const history = useHistory();
  const handleRouteChange = (wishlistId) => {
    let path = `/account/giftlist/${wishlistId}`;
    history.push(path);
  };

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
          const giftlistsInThisGroup = allGiftlist?.filter(
            (item) => item.group.id === group.id
          )[0]?.giftlists;
          return (
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
                                  <ListItemButton
                                    onClick={() => handleRouteChange(item.id)}
                                    key={index}
                                  >
                                    <ListItemText primary={item.name} />
                                  </ListItemButton>
                                ))}
                              </div>
                            );
                          else
                            return (
                              <div key={member.id}>
                                <ListItemButton sx={{ pl: 4 }}>
                                  <ListItemText
                                    primary={`${member.username} (0 shared lists)`}
                                  />
                                </ListItemButton>
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
          );
        })}
      </List>
    </Container>
  );
};

export const GiftForOne = ({ match }) => {
  const wishlistId = match.params.id * 1;

  const giftlist = useSelector((state) => state.giftlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneGiftlist(wishlistId));
  }, []);

  const oneGiftlist = giftlist.oneGiftlist;
  
  return (
    <Grid container m="50px">
      <div>
        <h1>{oneGiftlist.name}</h1>
        {oneGiftlist.gifts?.length ? (
          oneGiftlist.gifts?.map((gift) => {
            return (
              <div key={gift.id}>
                <Grid container spacing={2}>
                  <Grid item sx={{ width: 500, height: 500 }}>
                    <img src={gift.image_url} width="90%" />
                  </Grid>

                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          fontSize="30px"
                          component="div"
                        >
                          <a href={gift.url}>{gift.name}</a>
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          fontSize="28px"
                        >
                          {`$${gift.price}`}
                        </Typography>
                        <Button
                          color="primary"
                          fontSize="30 "
                          variant="outline"
                          endIcon={<TaskIcon style={{ fontSize: 40 }} />}
                        >
                          Reserve
                        </Button>
                        <Button
                          color="primary"
                          fontSize="30 "
                          variant="outline"
                          endIcon={<PriceCheckIcon style={{ fontSize: 40 }} />}
                        >
                          Purchase
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
                <br />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </Grid>
  );
};

export default GiftFor;
