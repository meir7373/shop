import React, { useContext } from "react";
import ProductsContext from "./ProductsContext";
import ProductsInCart from "./ProductsInCart";
import { ProductsProvider } from "./ProductsContext";
var a = 1;
function Cart(props) {
  const productsAndChange = useContext(ProductsContext);
  const products = productsAndChange.products;
  const productsInCart = [];

  if (products) {
    for (var i = 0; i < products.length; i++) {
      products[i].inCart ? productsInCart.push(i) : (a += 1);
    }
  }

  return (
    <div>
      <div
        style={{
          fontSize: "xx-large",
          margin: "3%",
          marginLeft: "90%",
        }}
      >
        {props.RouteToShop}
      </div>
      {!productsInCart
        ? null
        : productsInCart.map((indexProduct, index) => (
            <ProductsProvider key={index + 0.321} value={productsAndChange}>
              <ProductsInCart key={index + 0.123} index={indexProduct} />
            </ProductsProvider>
          ))}
    </div>
  );
}

export default Cart;
