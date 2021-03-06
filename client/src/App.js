import React from "react";
import MyRouter from "./componnts/MyRouter";
import axios from "axios";
import { ProductsProvider } from "./componnts/ProductsContext";
const { useEffect, useState } = React;
const ServerAddress =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://shop3737.herokuapp.com";
console.log(ServerAddress);
function App() {
  const [products, setProducts] = useState();
  const [user, setUser] = useState();
  function productToCart(indxeProduct, plusOrMinus) {
    if (plusOrMinus === "plus" && products[indxeProduct].quantity > 0) {
      products[indxeProduct].inCart += 1;
      products[indxeProduct].quantity -= 1;

      const plosInServer = (user) => {
        if (user) {
          let obj = {
            idUser: user?._id,
            idProduct: products[indxeProduct]._id,
            productInCart: products[indxeProduct].inCart,
          };
          axios
            .post(`${ServerAddress}/api/productToCart`, obj)
            .then((res) => console.log(res));
        }
      };
      plosInServer(user);
      setProducts([...products]);
    } else if (plusOrMinus === "minus" && products[indxeProduct].inCart > 0) {
      products[indxeProduct].inCart -= 1;
      products[indxeProduct].quantity += 1;

      const minusInServer = (user) => {
        if (user) {
          let obj = {
            idUser: user?._id,
            idProduct: products[indxeProduct]._id,
            productInCart: products[indxeProduct].inCart,
          };
          axios
            .post(`${ServerAddress}/api/productToCart`, obj)
            .then((res) => console.log(res));
        }
      };
      minusInServer(user);

      setProducts([...products]);
    }
  }

  const productsAndChange = {
    products: products,
    productToCart: productToCart,

    changeProducts: (newProducts) => {
      newProducts.map((product, index) => (product.key = index));
      setProducts(newProducts);
    },

    changeProductsInServer: (method, ruote, product) => {
      if (method === "post") {
        axios
          .post(`${ServerAddress}/api/${ruote}`, product)
          .then((res) => console.log(res));
      } else if (method === "delete") {
        axios
          .delete(`${ServerAddress}/api/${ruote}`)
          .then((res) => console.log(res));
      } else if (method === "put") {
        axios
          .put(`${ServerAddress}/api/${ruote}`, product)
          .then((res) => console.log(res));
      }
    },

    login: {
      registeredUser: user,
      funcLogin: async (username, password) => {
        let response = "fault";
        await axios
          .post(`${ServerAddress}/api/login`, {
            username: username,
            password: password,
          })
          .then(async (res) => {
            if (res.data.user.admin) {
              response = "admin";
            } else if (res.data.user._id) {
              response = "user";
            }
            setUser(res.data.user);
            let products = await axios
              .get(`${ServerAddress}/api`)
              .then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                  res.data[i].key = i;
                }
                return res.data;
              });
            if (res.data.products !== undefined) {
              setProducts([
                ...getProductsFromUser(products, res.data.products),
              ]);
            }
          });
        return response;
      },
    },
  };

  useEffect(() => {
    axios.get(`${ServerAddress}/api`).then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].key = i;
      }
      setProducts(res.data);
    });
  }, []);

  return (
    <div
      className="App"
      style={{
        userSelect: "none",
      }}
    >
      <ProductsProvider value={productsAndChange}>
        <MyRouter />
      </ProductsProvider>
    </div>
  );
}

export default App;

function getProductsFromUser(products, products_from_user) {
  products_from_user.map((itme) => {
    for (let i = 0; i < products.length; i++) {
      if (itme._id === products[i]._id) {
        products[i].inCart = itme.inCart;
      }
    }
    return products;
  });

  return products;
}
