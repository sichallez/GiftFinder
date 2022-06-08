import React from "react";
import { connect } from "react-redux";
import {
  Route,
  Switch,
} from "react-router-dom";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import AccountSidePanel from "./AccountSidePanel";
import UserProfile from "./UserProfile";
import Wishlists from "./Wishlists";
import MyGroups from "./MyGroups";
import GiftFor from "./GiftFor";
import Notification from "./Notification";

const Account = ({ auth }) => {
  return (
    <Grid
      container
      direction="row"
      display="flex"
      justifyContent="start"
      alignItems="top"
    >
        <AccountSidePanel />
        <Switch>
          <Route path="/account/profile" component={UserProfile} />
          <Route path="/account/wishlist" component={Wishlists} />
          <Route path="/account/group" component={MyGroups} />
          <Route path="/account/gift" component={GiftFor} />
          <Route path="/account/notification" component={Notification} />
        </Switch>
    </Grid>
  );
};

const mapState = ({ auth }) => {
  return { auth };
};

export default connect(mapState)(Account);
