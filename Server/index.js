const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const {
  getAllPhotos,
  getAllProducts,
  getSpecificProductPhotos,
  getProductInformation,
  createProduct
} = require('../database/index.js');
const path = require('path');
const axios = require('axios');
const port = 3000;

app.use(bodyParser.json({ type: 'application/json' }));
// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/', express.static('./client/dist/'));
app.use(/\/\d+\//, express.static('./client/dist/'));

app.get('/api/item/:itemId', (req, res) => {
  getProductInformation(req.params.itemId, (error, productInfo) => {
    if (error) {
      console.log(error, 'Error with Getting Product Info from SERVER!');
      res.status(500).send(error);
    } else {
      console.log(productInfo, 'this is ProductInfo from GET on SERVER!');
      res.json(productInfo);
    }
  });
});

app.get('/api/itemImages/:itemId', (req, res) => {
  var imagesArray = {
    images: []
  };
  getSpecificProductPhotos(req.params.itemId, (error, images) => {
    if (error) {
      console.log('Error from Server GET function!', error);
      res.status(500).send(error);
    } else {
      console.log('Results from the Server GET Function!', images);
      imagesArray.images = images;
      res.json(imagesArray);
    }
  });
});

// app.get('/api/seedData', (req, res) => {
//     // console.log(req.body, 'what is req body?');
//     console.log(req.query, 'what is query??');
//     var totalResults = []; // for results from async code but may have issues for this is synchronous not async
//     var { productId = 0, quantity = 100 } = req.query;
//     // destructure the productId and qunatity off of req.query - if not provided make them 0 and 100
//     var idList = [];
//     // created this array to push the productId's into this, normal For Loops arent Async but For oF loops are so setting this up so we can for of loop later
//     for (var i = 0; i < quantity; i++) {
//         idList.push(Number(productId) + i);
//         // looping through incrementing Id numbers and pushing to the idList so we can use a for of with this data later
//     }

//     // console.log('array check', idList);
//     for (currentProductId of idList) {
//         // console.log('axios id check', currentProductId);
//         axios
//             .get(`https://redsky.target.com/v2/pdp/tcin/${currentProductId}`)
//             // hitting targets api for items, able to pass params in postman to generate more information for DB Seeding
//             .then(response => {
//                 const { item } = response.data.product;
//                 // destructure item off of resp.data.product to stop reperition of long object name for the proper data
//                 const productObj = {
//                     productName: item.product_description.title,
//                     tid: item.tcin,
//                     photos: targetImageMapper(item.enrichment.images)
//                 };
//                 // creating a productObj that we are passing for the DB functions as params for the insert query statement
//                 // console.log(data, 'This is AXIOS DATA!');
//                 // console.log(productObj, 'productObj');
//                 createProduct(productObj, (error, results) => {
//                     if (error) {
//                         console.log(error, 'Error on Server GET!');
//                     } else {
//                         // console.log(results, 'what are results from GET?');
//                         // res.json(results);
//                         totalResults.push(productObj);
//                         // pushing results - may have issues for synchronous code while axios is async
//                         currentProductId++;
//                         // increase currentProductId to go to the next id in the loop/query
//                     }
//                 });
//             })
//             .catch(error => {
//                 currentProductId++;
//                 if (error) {
//                     console.log('Error in AXIOS GET!', error);
//                 }
//             });
//     }
//     res.json(totalResults);
//     // send back results from the loop/query
// });

// const targetImageMapper = images => {
//     var result = [];
//     images.forEach((image, index) => {
//         // looping through the obj response body of targets API response for the images we need
//         // console.log(image, 'what level are we in?');

//         image.alternate_urls.forEach(url => {
//             // looping the nested object for the base url and the images url array for the proper information
//             // console.log(url, 'confirming image url?!?');
//             var baseUrl = image.base_url;
//             result.push(`${baseUrl}${url} `);
//             // concatting base url for target API and the image url together to form the complete url for the images needed.
//         });
//     });
//     return result;
// };

app.listen(port, error => {
  if (error) {
    console.log('error on server not Listening!!!!');
  }
  console.log(`Listening on Port ${port}!`);
});
