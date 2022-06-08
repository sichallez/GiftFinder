import React from "react";
import { connect } from "react-redux";
import {
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import AccountSidePanel from "./AccountSidePanel";
import UserProfile from "./UserProfile";
import WishlistMenu from "./WishlistMenu";
import Wishlist from "./Wishlist";
import Wishlists from "./Wishlists";
import MyGroups from "./MyGroups";
import GiftFor from "./GiftFor";
import Notification from "./Notification";
import CreateList from "./CreateList";
import FavoriteList from "./FavoriteList";

const Account = ({ auth }) => {
  const { pathname } = useLocation();

  return (
    <Grid
      container
      direction="row"
      display="flex"
      justifyContent="start"
      alignItems="top"
      wrap='nowrap'
    >
        <AccountSidePanel />
        {pathname === "/account" ? <UserProfile /> : null}
        <Switch>
          <Route path="/account/profile" component={UserProfile} />
          {/* <Route exact path="/account/wishlist" component={WishlistMenu} /> */}
          <Route exact path="/account/wishlist/new" component={CreateList} />
          <Route path="/account/wishlist/:listId" component={Wishlist} />
          <Route path="/account/wishlist" component={Wishlists} />
          <Route path="/account/group" component={MyGroups} />
          <Route path="/account/gift" component={GiftFor} />
          <Route path="/account/favlist" component={FavoriteList} />
          <Route path="/account/notification" component={Notification} />
        </Switch>
    </Grid>
  );
};

const mapState = ({ auth }) => {
  return { auth };
};

export default connect(mapState)(Account);
