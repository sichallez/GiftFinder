import React from "react";
import { connect } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import AccountSidePanel from "./AccountSidePanel";
import UserProfile from "./UserProfile";
import Wishlist from "./Wishlist";
import MyGroups, { CreateGroup, SingleGroup } from "./MyGroups";
import GiftFor, { GiftForOne } from "./GiftFor";
import Notification from "./Notification";
import CreateList from "./CreateList";
import Wishlists from "./Wishlists"

const Account = ({ auth }) => {
  const { pathname } = useLocation();

  return (
    <Grid
      container
      direction="row"
      display="flex"
      justifyContent="start"
      alignItems="top"
      wrap="nowrap"
    >
        <AccountSidePanel pathname={pathname}/>
        {pathname === "/account" ? <UserProfile /> : null}
        <Switch>
          <Route path="/account/profile" component={UserProfile} />
          <Route exact path="/account/wishlist/new" component={CreateList} />
          <Route path="/account/wishlist/:id" component={Wishlist} />
          <Route path="/account/wishlist" component={Wishlists} />
          <Route exact path="/account/group/new" component={CreateGroup} />
          <Route path="/account/group/:groupRouteId" component={SingleGroup} />
          <Route path="/account/group" component={MyGroups} />
          <Route exact path="/account/giftlist" component={GiftFor} />
          <Route exact path="/account/giftlist/:id" component={GiftForOne} />
          <Route path="/account/notification" component={Notification} />
        </Switch>
    </Grid>
  );
};

const mapState = ({ auth }) => {
  return { auth };
};

export default connect(mapState)(Account);
