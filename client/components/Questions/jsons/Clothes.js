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
        fetch(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://openapi.etsy.com/v2/listings/active?&keywords='fun'&limit=10&api_key=igx6b90unhkjik68jacmq0jc`)}`
          )
            .then((res) => res.json())
            .then((data) => {
              this.setState({ clothes: data })
              console.log(data, 'data')
            });

                // category_id: null
                // description: "Water-resistant. Wipe clean with a damp cloth. Not dishwasher safe.\nSet of 4\nCeramic Coasters Designed from Original Acrylic Paintings\nStandard size 4&quot; x 4&quot; with nonslip cork back\nNumerous varieties of colorful designs are available.\n\nCeramic Coasters make GREAT Christmas Gifts for Family, Friends, Teachers, Office, Stocking Stuffers, Unisex, etc.  Original Artwork. impressionist ceramic coaster\n\nAll images are copyright material of Dana Struemph Tranquility."

                // materials: ['Ceramic']
                // non_taxable: false
                // num_favorers: 0
                // original_creation_tsz: 1602984207
                // price: "38.00"
                // processing_max: 20
                // processing_min: 15
                // quantity: 10
                // shipping_template_id: 78563611214
                // shop_section_id: 30869034
                // should_auto_renew: true
                // sku: []
                // state: "active"
                // state_tsz: 1602984207
                // style: null
                // tags: (13) ['Someone Special', 'Scenic Landscape', 'Family Game Night', 'Unisex Gift Item', 'Teachers', 'Grandparents', 'Gift Exchange Gifts', 'Original Design', 'Novel', 'Creative', 'Artistic', 'Relaxing', 'Fun']
                // taxonomy_id: 1060
                // taxonomy_path: (5) ['Home & Living', 'Kitchen & Dining', 'Drink & Barware', 'Drinkware', 'Coasters']
                // title: "Artistic, Coaster, Ceramic Coasters, Ceramic Coaster Tiles, set of 4 Ceramic Coasters, Ceramic Coaster Sets, Scenic Design Coasters, Drinks"
                // url: "https://www.etsy.com/listing/888723273/artistic-coaster-ceramic-coasters?utm_source=johndoeapplication&utm_medium=api&utm_campaign=api"
                // used_manufacturer: false
                // user_id: 248669551
                // views: 47
                // when_made: "2010_2019"
                // who_made: "i_did"
            // fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://wikipedia.org')}`)
            //         .then(response => {
            //           if (response.ok) return response.json()
            //           throw new Error('Network response was not ok.')
            //         })
            //         .then(data => console.log(data.contents));
                  
    }
    render() {
        return (
            <div>
               hi
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        state
    }
}

export default connect(mapState)(Clothes)