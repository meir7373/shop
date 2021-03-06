require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const getProducts = require("./functions/products/GetProducts");
const writeProducts = require("./functions/products/WriteProducts");
const deleteProducts = require("./functions/products/DeleteProducts");
const putProducts = require("./functions/products/PutProducts");
const mongoose = require("mongoose");
const writeUsers = require("./functions/users/WriteUsers");
const path = require("path");

mongoose.set("useFindAndModify", false);

app.use(bodyParser.json());
app.use(cors());
const toCart = require("./functions/users/toCart");

const login = require("./functions/users/login");

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/", (req, res) => {
  getProducts().then((Products) => {
    res.send(Products);
  });
});

app.post("/api/addProduct", (req, res) => {
  writeProducts(req.body, callback);
  function callback(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("YOU SUCCEED!!!");
    }
  }
});
app.post("/api/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/api/deleteProduct/:id", (req, res) => {
  deleteProducts(req.params.id, callback);
  function callback() {
    res.send("YOU SUCCEED!!!");
  }
});

app.put("/api/putProduct/:id", (req, res) => {
  putProducts(req.params.id, req.body, callback);
  function callback() {
    res.send("YOU SUCCEED!!!");
  }
});

app.post("/api/login", (req, res) => {
  login(req.body, callback);
  function callback(response) {
    res.send(response);
  }
});

app.post("/api/productToCart", (req, res) => {
  toCart(req.body, callback);
  function callback(response) {
    res.send(response);
  }
});
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});
mongoDB()
  .then(() => {
    app.listen(process.env.PORT ? process.env.PORT : 8001, () => {
      console.log(
        `Example app listening on port ${
          process.env.PORT ? process.env.PORT : 8001
        }!`
      );
    });
  })
  .catch((err) => console.log("aaaaa"));

function mongoDB() {
  return mongoose.connect(
    `mongodb+srv://meir:${process.env.ATLAS}@cluster0.pg9yx.mongodb.net/cluster0?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );
}
// writeUsers({
//   username: "meir",
//   password: 1234,
//   admin: true,
// })
// writeProducts(
//   {
//     id: 222,
//     title: "abc",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Collage_of_Six_Cats-01.jpg/250px-Collage_of_Six_Cats-01.jpg",
//     quantity: 50,
//     price: 50,
//     inCart: 0,
//   },

//   function callback(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("YOU SUCCEED!!!");
//     }
//   }
// );
