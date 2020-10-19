import React, { useContext } from "react";
import Header from "./Header";
import Products from "./Products";
import { ProductsProvider } from "./ProductsContext";
import ProductsContext from "./ProductsContext";

function Shop(props) {
  const productsAndChange = useContext(ProductsContext);

  return (
    <div>
      <Header />
      <div
        style={{
          fontSize: "xx-large",
          width: "fit-content",
          position: "absolute",
          top: "2%",
          left: "90%",
        }}
      >
        {props.RouteToCart}
      </div>
      <div>{props.RouteToLoginUser}</div>
      {!productsAndChange.products
        ? null
        : productsAndChange.products.map((product, index) => (
            <ProductsProvider key={index + 0.321} value={productsAndChange}>
              <Products key={index + 0.123} index={index} />
            </ProductsProvider>
          ))}
      <div
        style={{
          position: "absolute",
          bottom: "1%",
          left: "1%",
        }}
      >
        {props.RouteToAdmin}
      </div>
    </div>
  );
}

export default Shop;
