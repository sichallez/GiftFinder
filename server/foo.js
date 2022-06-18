const axios = require('axios');
const {JSDOM} = require('jsdom');

(async() => {
	try {
		const {data} = await axios.get('https://www.apple.com/shop/buy-mac/macbook-air/midnight-apple-m2-chip-with-8-core-cpu-and-10-core-gpu-512gb')
		let dom = new JSDOM(data).window.document
		let name = dom.getElementsByClassName('rf-configuration-maintitle')[0].innerHTML.trim()
		let price = dom.getElementsByClassName('rc-prices-fullprice')[0].innerHTML.trim()	
		
	} catch (error) {
		console.log(error)
	}

})()