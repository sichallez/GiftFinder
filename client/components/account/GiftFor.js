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
import axios from "axios";

const GiftFor = () => {
  const { auth, group } = useSelector((state) => state);

  const allGroup = group.group;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGroupsAndMembers(auth.id));
  }, []);

  const groupsAndMembers = group.groupsAndMembers;
  const [openState, setOpenState] = useState({});
  const [allUserLists, setAllUserLists] = useState ([]);

  useEffect(() => {
    setOpenState(
      allGroup.reduce((acc, currentGroup) => {
        const id = currentGroup.id;
        return { ...acc, [id]: false };
      }, {})
    );
  }, [allGroup]);

  useEffect(() => {
    if(allUserLists.length===0){
      console.log('inside', allUserLists.length)
      async function fetchLists (){
        const lists = (await axios.get('/api/wishlist/all')).data
        setAllUserLists({allUserLists: lists});
      }
      
      fetchLists();
    }
  });

  console.log(allUserLists)


  const history = useHistory();
  const handleRouteChange = (wishlistId) => {
    let path = `/account/giftlist/${wishlistId}`;
    history.push(path);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Groups that I can shop for (Total: {allGroup.length})
      </Typography>
      <List>
        {groupsAndMembers.map((group, index) => {
          console.log(group)
          return (
            <div key={group.group.id}>
              <ListItem
                onClick={() =>
                  setOpenState({
                    ...openState,
                    [group.group.id]: !openState[group.group.id],
                  })
                }
              >
                <ListItemText
                  primary={`${group.group.name} (0 shared wishlists)`}
                  primaryTypographyProps={{
                    fontSize: 30,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
                {openState[group.group.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openState[group.group.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {group.members.length === 0 ? 'No Lists.' : group.members.map(member => {
                    return(<div key = {member.id}>
                      {member.username}
                      </div>)
                  })}
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
