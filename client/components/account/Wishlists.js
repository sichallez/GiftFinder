import React, { Component } from "react";
import { connect } from "react-redux";
import {HashRouter, BrowserRouter, Route, Link} from 'react-router-dom';
import { getAllLists } from "../../store/wishlists";
import CreateList from "./CreateList";
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
  Stack,
  Box,
  CssBaseline,
  Divider,
  Fab
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

class Wishlists extends Component {
  componentDidMount() {
    this.props.getAllLists();
  }

  render() {
    
    const lists = this.props.wishlists;


    if(!lists || lists.length === 0){
      return <CreateList/>;
    }

    return (
      <div>
        <Container maxWidth="md" sx={{ margin: "25px 60px" }}>
          <Typography variant="h5" component="h2" margin='auto 20px' fontSize='20px' gutterBottom>
            You have {this.props.wishlists.length} wishlists:
          </Typography>
            
            <List>
              {this.props.wishlists.map(list => (
                <Box sx={{display: 'flex', margin: '10px 0'}}>
                    <ListItem>
                      <Link
                    key={list.id}
                    to={`/account/wishlist/${list.id}`}
                  >
                  <Fab variant="extended" size="medium" sx={{ backgroundColor: '#f4ecee'}} >
                  <ListItemText
                    primary={`${list.name} (${list.gifts.length} items)`}
                    primaryTypographyProps={{
                      fontSize: '16px',
                    }}
                  />
                  </Fab>
                  </Link>
                </ListItem>
                  <Button
                    variant="contained"
                    startIcon={<SettingsIcon />}
                    color="error"
                  >
                    Settings
                  </Button>
              </Box>
              ))}
            </List>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLists: function () {
      dispatch(getAllLists());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlists);