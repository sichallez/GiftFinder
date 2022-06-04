import React from "react";
import { connect } from "react-redux";
import {
  withRouter,
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

const Account = () => {
  return (
    <div className="container">
      <Router>
        <UserProfileSideBar />
        <Switch>
          <Route exact path="/account" component={UserInfo} />
          <Route path="/account/edit" component={EditUserInfo} />
          <Route path="/account/password" component={ChangePassword} />
        </Switch>
      </Router>
    </div>
  );
};

export default Account;
