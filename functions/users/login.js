const { Users } = require("../../mongo/Model");

module.exports = function (usernameAndPassword, callback) {
  let response = {};
  Users.findOne({
    username: usernameAndPassword.username,
    password: usernameAndPassword.password,
  }).then((objUser) => {
    if (objUser === null) {
      callback("Username or password incorrect");
    } else {
      const user = {
        _id: objUser._id,
        username: objUser.username,
        admin: objUser.admin,
      };
      response.user = user;

      Users.findOne({
        username: usernameAndPassword.username,
        password: usernameAndPassword.password,
      })
        .populate("inCart")
        .exec(async (err, USER) => {
          if (USER.inCart[0]) {
            var products = await remove_duplicates(USER.inCart);
            var inCart = await get_quantity_in_cart(USER.inCart, products);
            response.products = inCart;
          }

          callback(response);
        });
    }
  });
};

function remove_duplicates(array) {
  var newArray = [];
  array.map((itme) => {
    var num = 0;
    for (let i = 0; i < newArray.length; i++) {
      if (itme._id === newArray[i]._id) {
        num += 1;
      }
    }
    if (num === 0) {
      newArray.push(itme);
    }
  });
  return newArray;
}

function get_quantity_in_cart(array, newArray) {
  newArray.map((itme) => {
    console.log(itme);
    var num = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === itme._id) {
        num += 1;
      }
    }
    itme.inCart = num;
  });
  return newArray;
}
