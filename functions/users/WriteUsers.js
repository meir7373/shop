const { Users } = require("../../mongo/Model");

module.exports = function writeUsers(User, callback) {
  
  
  let user = new Users({
    username: User.username,
  password: User.password,
  admin: User.admin,
  });
  user.save((err) => {
    console.log(err);
  });

};
