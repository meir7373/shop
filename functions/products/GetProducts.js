const { Products } = require("../../mongo/Model");

module.exports = function getProducts() {
  return Products.find(function (err) {
    if (err) return console.error(err);
  });
};
