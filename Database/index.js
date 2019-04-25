const mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'FEC'
});

connection.connect(error => {
	if (error) {
		console.log(error, 'Error with DB Connection!');
	}
	console.log('Connected to DB FEC!');
});

// createProduct = function (product, callback) {
// 	connection.query(
// 		'Insert into product(productName, tid) values(?, ?)',
// 		[product.productName, product.tid],
// 		(error, productResult) => {
// 			if (error) {
// 				console.log(error, 'Issue inserting into DB!');
// 			} else {
// 				console.log(productResult, 'what are results from insert???');
// 				var bulkPhotoInsert = product.photos.map(url => {
// 					return [productResult.insertId, url];
// 				});
// 				connection.query(
// 					'Insert into images(product_id, urlLink) values ?',
// 					[bulkPhotoInsert],
// 					(error, results) => {
// 						if (error) {
// 							console.log(error, 'Issue inserting into DB!');
// 						} else {
// 							console.log(
// 								results,
// 								'what are results from insert???'
// 							);
// 							callback(null, results);
// 						}
// 					}
// 				);
// 			}
// 		}
// 	);
// };

// getAllPhotos = function (callback) {
// 	connection.query('SELECT * from images', (error, images) => {
// 		if (error) {
// 			console.log('Error getting All Images from DB!', error)
// 		} else {
// 			console.log(images, 'what are the images we are sending back?????')
// 			callback(null, images)
// 		}
// 	})
// };

// getAllProducts = function (callback) {
// 	connection.query('SELECT * from product', (error, product) => {
// 		if (error) {
// 			console.log('Error getting All Products from DB', error);
// 		} else {
// 			console.log('what are the products we get?!?!', product)
// 			callback(null, product)
// 		}
// 	})
// }

getSpecificProductPhotos = function (productId, callback) {
	connection.query('SELECT * from images WHERE product_id=(?)', [productId], (error, results) => {
		if (error) {
			console.log('Error getting Pictures of Specific Product!', error);
			callback(error, null);
		} else {
			console.log('what are the pics?!?!', results);
			callback(null, results);
		}
	})
}



getProductInformation = function (productId, callback) {
	connection.query('Select * from product where id=(?)', [productId], (error, results) => {
		if (error) {
			console.log(error, 'Issue getting Product Info DB Query!');
			callback(error, null);
		} else {
			console.log('This is the Product Info from DB Query!!!');
			callback(null, results);
		}
	})
}


module.exports = {
	// getAllPhotos,
	// getAllProducts,
	getSpecificProductPhotos,
	getProductInformation
	// createProduct
};
