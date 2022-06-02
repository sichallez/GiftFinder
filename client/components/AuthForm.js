import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import history from "../history";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  InputAdornment,
  Checkbox,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import styles from "./authForm.module.css";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  const [isRemember, setIsRemember] = useState(
    localStorage.getItem("isRemember") === "true" ? true : false
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 380,
    margin: "20px auto",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Abril Fatface",
              fontWeight: "600",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            Welcome to GiftFinder
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit} name={name}>
          {name === "signup" && (
            <FormControl
              variant="standard"
              className="textfield"
              sx={{ margin: "8px" }}
              fullWidth
              required
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input name="email" />
            </FormControl>
          )}
          <FormControl
            variant="standard"
            className="textfield"
            sx={{ margin: "8px" }}
            fullWidth
            required
          >
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input name="username" />
          </FormControl>
          <FormControl
            variant="standard"
            className="textfield"
            sx={{ margin: "8px" }}
            fullWidth
            required
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {name === "login" && (
            <Typography color="textSecondary" sx={{ margin: "8px" }}>
              <strong>Forgot your password?</strong>
            </Typography>
          )}
          <FormControlLabel
            label="Remember Me"
            control={
              <Checkbox
                checked={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
            }
            sx={{ marginTop: "8px", marginBottom: "8px", marginLeft: "-3px" }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              margin: "0",
              backgroundColor: "#007BFF",
              fontWeight: "600",
              ":hover": {
                bgcolor: "primary.main",
              },
            }}
            type="submit"
            fullWidth
          >
            {displayName}
          </Button>
        </form>
        <Grid align="center">
          {/* <h5>OR</h5>
          <hr />
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            render={(renderProps) => (
              <GoogleLoginButton
                disabled={renderProps.disabled}
                align="center"
                style={{ backgroundColor: "#dc4a3d", color: "white" }}
                activeStyle={{ backgroundColor: "#e82517" }}
                onClick={renderProps.onClick}
              >
                <span>Log in with Google</span>
              </GoogleLoginButton>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLoginButton
            align="center"
            onClick={() => (window.location = "/auth/facebook")}
          >
            <span>Log in with Facebook</span>
          </FacebookLoginButton>
          <TwitterLoginButton
            align="center"
            onClick={() => (window.location = "/auth/twitter")}
          >
            <span>Log in with Twitter</span>
          </TwitterLoginButton>
          <InstagramLoginButton
            align="center"
            onClick={() => console.log("Instagram login")}
          >
            <span>Log in with Instagram</span>
          </InstagramLoginButton> */}
          <Typography
            color="textSecondary"
            sx={{ marginTop: "15px", fontSize: 14, marginBottom: "10px" }}
          >
            By continuing, you agree to GiftFinder's{" "}
            <strong>Terms of Service, Privacy Policy</strong>
          </Typography>
          <hr style={{ width: "50%" }}></hr>
          {name === "login" && (
            <Typography color="textSecondary" sx={{ marginTop: "10px" }}>
              <strong>Not on GiftFinder yet?</strong>
              <br />
              <a href="/signup">
                <span style={{ color: "#98798E", textDecoration: "underline" }}>
                  {" "}
                  Sign up{" "}
                </span>
              </a>
            </Typography>
          )}
        </Grid>
      </Paper>
    </Grid>
  );

  // return (
  //   <div className={styles.authform}>
  //     <form onSubmit={handleSubmit} name={name} className="formContainer">
  //       <div className={styles.text_field}>
  //         <input
  //           name="username"
  //           type="text"
  //           placeholder="Username"
  //           required
  //           autoFocus="on"
  //         />
  //       </div>
  //       <div className={styles.text_field}>
  //         <input
  //           name="password"
  //           type="password"
  //           placeholder="Password"
  //           required
  //         />
  //       </div>
  //       <div className={styles.authBtn}>
  //         <button type="submit">{displayName}</button>
  //       </div>
  //       {error && error.response && <div> {error.response.data} </div>}
  //       <div className={styles.divider}>
  //         <span></span>
  //       </div>
  //       <div className={styles.authBtn}>
  //         {displayName === "Login" ? (
  //           <>
  //             <p className={styles.message}>Not registered?</p>
  //             <Link to="/signup">
  //               <button style={{ backgroundColor: "#F1F1F1", color: "#000" }}>
  //                 Sign Up
  //               </button>
  //             </Link>
  //           </>
  //         ) : (
  //           <Link to="/login">
  //             <button style={{ backgroundColor: "#F1F1F1", color: "#000" }}>
  //               LogIn
  //             </button>
  //           </Link>
  //         )}
  //       </div>
  //     </form>
  //   </div>
  // );
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
