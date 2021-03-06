import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import { Category, FilterResults } from "./CategoryTabs";
import { Box, Grid } from "@mui/material";
import wishlist, {addToWishlist} from '../store/wishlist'
import { fetchProducts } from "../store";
// import { fetchProducts } from "../store/gifts";
import axios from "axios"; // axios call should NOT appear here in component..
import Pagination from '@mui/material/Pagination';
import {getAllLists} from '../store/wishlists'
import SearchBar from './SearchBar'
/**
 * COMPONENT
 */
class Home extends Component {
  state = {
    products: [],
    filteredProducts: [],
    categorySearch: "",
    giftSearch: "",
    giftOccasion: "Anniversary",
    minPrice: "0",
    maxPrice: "50",
    PageType: "homepage",
    isLoading: true,
    isMostViews: false,
    page: 1,
    amountPerPage: 12,
  }

  componentDidMount = () => {
    this.fetchHomePage()
    this.handleFilter(this.state.giftOccasion);
    this.props.getAllLists();
  };

  fetchHomePage = () => {
    return (
    <div>
      <h1>Summer Birthday Gifts</h1>
    </div>
    )
  }

  fetchProducts = (query, minPrice, maxPrice) => {
    return axios.get("/api/gifts", {
      params: { q: query, minPrice: minPrice, maxPrice: maxPrice },
    });
  };

  handleCategorySearch = (e) => {
    e.preventDefault();
    let keyword = this.state.categorySearch.toLowerCase()
console.log(keyword)
    if(keyword === query) {
      return this.fetchProducts()
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    let term = this.state.giftSearch.toLowerCase();

    let filterProduct = this.state.products.filter(function (product) {
      return product.title.toLowerCase().indexOf(term) !== -1;
    });
    this.setState({ filteredProducts: filterProduct });
  };

  handleInputChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
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
      case "Under $50":
      default:
        minPrice = 0;
        maxPrice = 50;
        break;
      case "$50 to $100":
        minPrice = 50;
        maxPrice = 100;
        break;
      case "$100 to $250":
        minPrice = 100;
        maxPrice = 250;
        break;
      case "Over $250":
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
    if (!this.state.isMostViews) {
      let sortProducts = this.state.products.sort((a, b) => {
        let key1 = a.views;
        let key2 = b.views;
        if (key1 < key2) return 1;
        if (key1 > key2) return -1;
      });
      this.setState({
        isLoading: true,
        products: [],
        filteredProducts: [],
        isMostViews: true,
      }); //set to original state
      this.fetchProducts(
        this.state.giftOccasion,
        this.state.minPrice,
        this.state.maxPrice,
        this.state.isMostViews,
        sortProducts
      )
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
  onClick = (product,id)=>{
    this.props.addToWishlist(product,id);
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  render() {
    const { page, amountPerPage, filteredProducts } = this.state;
    const indexOfLastProduct = page * amountPerPage;
    const indexOfFirstProduct = indexOfLastProduct - amountPerPage;
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return (
      <div>
        <Box sx={{ display: "grid", justifyContent: "center"}}>
          <Category
            handleFilter={this.handleFilter}
            handlePrice={this.handlePrice}
            handleMostViews={this.handleMostViews}
            resetPage={this.resetPage}
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
          {currentProducts.map((product) => {
            return (
              <ProductCard
                key={product.listing_id}
                id={product.listing_id}
                title={product.title.slice(0, 25)}
                image={product.Images?.[0].url_570xN}
                url={product.url}
                price={product.price}
                views={product.views}
                handleBookmark={this.handleBookmark}
                page_type={this.state.PageType}
                loggedIn={this.props.loggedIn}
                product = {product}
                onClick = {this.onClick}
                wishlists = {this.props.wishlists}
                />
            );
          })}
        </Grid>
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          count={Math.ceil(filteredProducts.length / amountPerPage)}
          page={this.state.page}
          onChange={(ev, page) => {
            this.setState({ page });
          }}
        />
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
      dispatch(fetchProducts());
    },
    addToWishlist: function (product,id) {
      dispatch(addToWishlist(product,id));
    },
    getAllLists: function () {
      dispatch(getAllLists());
    },
  };
};

export default connect(mapState, mapDispatchToProps)(Home);
