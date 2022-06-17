import React, { Component } from 'react';
import { connect } from 'react-redux'

class Clothes extends Component {
    constructor(){
        super()
        this.state = {
            clothes: []
        }
    }
    componentDidMount() {
        fetch('https://openapi.etsy.com/v2/listings', {mode: "no-cors"})
        .then(res => res.json())
        .then((data) => {
            // this.setState({ clothes: data })
            console.log(data, 'clothes')
        })
    }
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}

const mapState = (state) => {
    console.log(state)
    return {
        state
    }
}

export default connect(mapState)(Clothes)
// const response = await axios.get(
//     "https://openapi.etsy.com/v2/listings/active?keywords=" +
//       req.query.q +
//       "&limit=50&min_price=" +
//       req.query.minPrice +
//       "&max_price=" +
//       req.query.maxPrice +
//       "&includes=Images&sort_on=score&api_key=dggfhwkwf5yl2hsyp2mhwn38"
//   );
//   console.log(response.data, 'response')
//   const gifts = response.data;
//   res.json(gifts);

// <div>

//   {/* <script type="text/javascript"> */}
//     function getData(data) {
//         if (data.ok) {
//                 console.log
//             } else {
//                 alert(data.error);
//         }
//     }
//     </script>

// <script src="https://openapi.etsy.com/v2/users/testusername.js?callback=getData&api_key=dggfhwkwf5yl2hsyp2mhwn38"></script>
// </div>