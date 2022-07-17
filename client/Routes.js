import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { getAllGroups, me, loadGifts } from "./store";
import Home from "./components/Home";
import Questions from "./components/Questions";
import Budget from "./components/Questions/Budget";
import Person from "./components/Questions/Person";
import Category from "./components/Questions/Category";
import Result from "./components/Questions/Result";
import Account from "./components/account/Account";
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      // fetch all the groups that a user belongs to
      // if she is logged in
      this.props.fetchAllGroups(this.props.userId);
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/questions/budget" component={Budget} />
            <Route path="/questions/person" component={Person} />
            <Route path="/questions/" exact component={Questions} />
            <Route path="/questions/category" component={Category} />
            <Route path="/questions/result" component={Result} />
            <Route path="/account" component={Account} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/questions/budget" component={Budget} />
            <Route path="/questions/person" component={Person} />
            <Route path="/questions/category" component={Category} />
            <Route path="/questions/result" component={Result} />
            <Route path="/questions" exact component={Questions}  />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchAllGroups: (userId) => dispatch(getAllGroups(userId)),
    loadGifts: () => dispatch(loadGifts())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
