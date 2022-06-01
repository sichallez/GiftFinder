import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import history from "../history";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div className="authform">
      <form onSubmit={handleSubmit} name={name} className="formContainer">
        <div className="text_field">
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            autoFocus="on"
          />
        </div>
        <div className="text_field">
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="authBtn">
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <div className="divider">
          <span></span>
        </div>
        <div className="authBtn">
          {displayName === "Login" ? (
            <>
              <p className="message">Not registered?</p>
              <Link to="/signup">
                <button style={{ backgroundColor: "#F1F1F1", color: "#000" }}>
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button style={{ backgroundColor: "#F1F1F1", color: "#000" }}>
                LogIn
              </button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
      history.push("/home");
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
