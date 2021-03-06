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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

// import "./authForm.module.css";

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

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
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
           {/*<h5>OR</h5>
          <hr />
          <Button style={{ backgroundColor: "#4285F4", color: "white", width: '100%' }}>
            <GoogleIcon /><a href="/auth/login/google" style={{marginLeft: '20px', color: '#fff'}}>{displayName} with Google</a>
          </Button>*/}
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
