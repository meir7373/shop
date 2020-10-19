const { Products } = require("../../mongo/Model");

module.exports = function writeProducts(Product, callback) {
  // console.log(typeof Product.body.image);
  Product = Product.body;
  let Product1;

  if (Product[0]) {
    let resp = [...Array(Product.length)];
    Product.map((Product11, i) => {
      Product1 = new Products({
        id: Product11.id,
        title: Product11.title,
        image: Product11.image,
        quantity: Product11.quantity,
        price: Product11.price,
        inCart: Product11.inCart,
      });
      Product1.save((err) => {
        if (err) {
          console.log(err);
        } else {
          resp[i] = `product ${i} saved successfully`;
          console.log(resp);
        }
      });
    });
  } else {
    Product1 = new Products({
      id: Product.id,
      title: Product.title,
      image: Product.image,
      quantity: Product.quantity,
      price: Product.price,
      inCart: Product.inCart,
    });
    Product1.save((err) => {
      callback(err);
    });
  }
};
