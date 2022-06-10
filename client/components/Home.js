import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import { Category, FilterResults } from "./CategoryTabs";
import { Typography, Box, Grid } from "@mui/material";
import {addToWishlist} from '../store/wishlist'
import SearchBar from "./SearchBar";
// import { fetchProducts } from "../store/gifts";
import axios from "axios"; // axios call should NOT appear here in component..

/**
 * COMPONENT
 */
class Home extends Component {

  state = {
    products: [],
    filteredProducts: [],
    giftSearch: "",
    giftOccasion: "Anniversary",
    minPrice: "0",
    maxPrice: "50",
    PageType: "homepage",
    isLoading: true,
    isMostViews: false,
    isCustomizable: false
  };

  componentDidMount = () => {
    this.handleFilter(this.state.giftOccasion);
  };

  fetchProducts = (query, minPrice, maxPrice) => {
    return axios.get("/api/gifts", {
      params: { q: query, minPrice: minPrice, maxPrice: maxPrice },
    });
  };



  handleFormSubmit = (event) => {
    event.preventDefault();

    let term = this.state.giftSearch.toLowerCase();

    let filterProduct = this.state.products.filter(function (product) {
      return product.title.toLowerCase().indexOf(term) !== -1;
    });
    this.setState({ filteredProducts: filterProduct });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFilter = (occasion) => {
    this.setState({ isLoading: true, products: [], filteredProducts: [] });
    this.fetchProducts(occasion, this.state.minPrice, this.state.maxPrice)
      .then((res) => {
        this.setState({
          isLoading: false,
          giftSearch: "",                               
          products: res.data.results,
          filteredProducts: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  };
                                
  handlePrice = (value) => {
    let minPrice;
    let maxPrice;
    switch (value) {
      case "1":
      default:
        minPrice = 0;
        maxPrice = 50;
        break;
      case "2":
        minPrice = 50;
        maxPrice = 100;
        break;
      case "3":
        minPrice = 100;
        maxPrice = 250;
        break;
      case "4":
        minPrice = 250;
        break;
    }

    this.setState({ isLoading: true, products: [], filteredProducts: [] });
    this.fetchProducts(this.state.giftOccasion, minPrice, maxPrice)
      .then((res) => {
        this.setState({
          isLoading: false,
          giftSearch: "",
          products: res.data.results,
          filteredProducts: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  };

  handleMostViews = () => {
    if(!this.state.isMostViews) {
      let sortProducts = this.state.products.sort((a, b) => {
        let key1 = a.views
        let key2 = b.views
        if(key1 < key2) return 1
        if(key1 > key2) return -1
      })
      this.setState({isLoading: true, products: [], filteredProducts: [], isMostViews: true}); //set to original state
      this.fetchProducts(this.state.giftOccasion, this.state.minPrice, this.state.maxPrice, this.state.isMostViews, sortProducts)
        .then((res) => {
          this.setState({
            isLoading: false,
            giftSearch: "",
            products: sortProducts,
            filteredProducts: sortProducts,
          });
        })
        .catch((err) => console.log(err));
    }  // in order to render the fliteredProduct so set up this condition
    if (this.state.isMostViews){ // then when most view is false
      this.setState({isLoading: true, products: [], filteredProducts: [], isMostViews: false}); //set filter products back to the original state
      this.fetchProducts(this.state.giftOccasion, this.state.minPrice, this.state.maxPrice, this.state.isMostViews) // this one set query back to ann why?
      .then((res) => {
        this.setState({
          isLoading: false,
          giftSearch: "",
          products: res.data.results,
          filteredProducts: res.data.results,
        });
      })
      .catch((err) => console.log(err)); 
    } // re-render the data 
  }
  handleBookmark = (id) => {  
      console.log('here')
      const savedProduct = this.state.products.filter(
      (product) => product.listing_id === parseInt(id)
    );

    const productTobeSaved = {
      title: savedProduct[0].title,
      image: savedProduct[0].Images[0].url_570xN,
      url: savedProduct[0].url,
      price: savedProduct[0].price,
      listing_id: savedProduct[0].listing_id,
    };

    API.saveProducts(productTobeSaved).then((result) => {
      const nosaved = this.state.products.filter(
        (product) => product.listing_id !== result.data.listing_id
      );
      this.setState({ books: nosaved });
    });
  };

  displayErrorMessage = () => {
    if (this.state.filteredProducts.length === 0 && !this.state.isLoading) {
      return (
        <div
          className="error-message"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          <span>
            Sorry, we couldn't find any matching results. Try searching for a
            different keyword.
          </span>
        </div>
      );
    }
  };

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      );
    }
  };

  onClick = (product)=>{
    this.props.addToWishlist(product);
  };
  

  render() {
    return (
      <div>
        <Box sx={{ display: "grid", justifyContent: "center" }}>
          {/* <SearchBar /> */}
          <Category
            handleFilter={this.handleFilter}
            handlePrice={this.handlePrice}
            handleMostViews={this.handleMostViews}
          />
        </Box>
        <FilterResults
          name="giftSearch"
          value={this.state.giftSearch}
          onChange={this.handleInputChange}
          disabled={!this.state.giftSearch}
          onClick={this.handleFormSubmit}
          handlePrice={this.handlePrice}
          handleMostViews={this.handleMostViews}
        />
        {this.displayErrorMessage()}
        {this.displayLoading()}
        <Grid container spacing={3} sx={{ padding: "2rem" }}>
          {this.state.filteredProducts.map((product) => {
            return (
                <ProductCard
                key={product.listing_id}
                id={product.listing_id}
                { ...product.title?.length > 50 ? `title=${product.title.slice(0, 25)}` : `title=${product.title}`}
                image={product.Images?.[0].url_570xN}
                url={product.url}
                price={product.price}
                views={product.views}
                handleBookmark={this.handleBookmark}
                page_type={this.state.PageType}
                loggedIn={this.props.loggedIn}
                product = {product}
                onClick = {this.onClick}
                />
            );
          })}
        </Grid>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    gifts: state.gifts,
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    addToWishlist: (product) => dispatch(addToWishlist(product)),
  };
};

export default connect(mapState,mapDispatchToProps)(Home);
