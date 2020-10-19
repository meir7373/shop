var mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  title: String,
  image: String,
  id: Number,
  quantity: Number,
  price: Number,
  inCart: Number,
  // author: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const UsersSchema = new mongoose.Schema({
  username: String,
  password: Number,
  admin: Boolean,
  inCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

module.exports = {
  Products: mongoose.model("Products", ProductsSchema),
  Users: mongoose.model("Users", UsersSchema),
};
