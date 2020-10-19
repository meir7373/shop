const { Users } = require("../../mongo/Model");

module.exports = function toCart(idUserAndProduct, callback) {
  Users.findById(idUserAndProduct.idUser).then((user) => {
    if (user) {
      let UnitsInCartClientSide = idUserAndProduct.productInCart;
      let UnitsInCartServerSide = getUnitsInCartServerSide(
        idUserAndProduct.idProduct,
        user.inCart
      );

      for (
        ;
        UnitsInCartClientSide > UnitsInCartServerSide;
        UnitsInCartServerSide++
      ) {
        user.inCart.push(idUserAndProduct.idProduct);
      }
      for (
        ;
        UnitsInCartClientSide < UnitsInCartServerSide;
        UnitsInCartServerSide--
      ) {
        let index = user.inCart.indexOf(idUserAndProduct.idProduct);

        if (index > -1) {
          user.inCart.splice(index, 1);
        }
      }

      Users.findByIdAndUpdate(idUserAndProduct.idUser, {
        inCart: user.inCart,
      }).then((a) => callback(a));
    }
  });
};
function getUnitsInCartServerSide(idProduct, productsInCart) {
  let num = 0;
  productsInCart.map((product) => {
    if (product == idProduct) {
      num += 1;
    }
  });
  return num;
}
