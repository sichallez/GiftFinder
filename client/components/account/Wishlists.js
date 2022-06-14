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
} from "@mui/material";

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
        <Container maxWidth="md" sx={{ marginTop: "30px" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            You have {this.props.wishlists.length} wishlists.
          </Typography>
            
            {/* {this.props.wishlists.map(list=>{
              return(
                <div key={list.id}>
                   
                   <Link to={`/account/wishlist/${list.id}`}>{list.name}</Link>
                   
                </div>
              )
            })} */}

            <List>
              {this.props.wishlists.map(list => (
                <Link
                  key={list.id}
                  to={`/account/wishlist/${list.id}`}
                >
                  <ListItem>
                    <ListItemText
                      primary={`${list.name} (${list.gifts.length} items)`}
                      primaryTypographyProps={{
                        fontSize: 30,
                        fontWeight: "medium",
                        letterSpacing: 0,
                      }}
                    />
                  </ListItem>
                </Link>
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