require("dotenv/config");
module.exports = {
	name: 'fuel',
  description: 'checks fuel prices',
  execute(client) {
    const axios = require('axios');
    let prices = '';

    async function getUser() {
      try {
        const response = await axios.get('https://projectzerothree.info/api.php?format=json');
        // console.log(response);
        prices = response.data['regions'][0]['prices']

        logg(prices)

      } catch (error) {
        console.error(error);
      }
    }
    getUser()

    function logg(prices) {
      prices.forEach(priceObj => {
        let channel = client.channels.cache.get(process.env[priceObj.type])
        channel.send({
          content: `${priceObj.price} ${priceObj.suburb}${priceObj.state}
          lat:${priceObj.lat} lng: ${priceObj.lng}`
        })
      });
    }
  }
};
