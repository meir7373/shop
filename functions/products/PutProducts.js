const { Products } = require("../../mongo/Model");

module.exports = function putProducts(id, obj, callback) {
  Products.findByIdAndUpdate(id, obj).then(() => {
    callback();
  });
};
