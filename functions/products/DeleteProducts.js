const { Products } = require("../../mongo/Model");

module.exports = function deleteProducts(id, callback) {
  if (id === "ALL") {
    Products.deleteMany(function (err) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    Products.findByIdAndDelete(id).then(() => {
      callback();
    });
  }
};
