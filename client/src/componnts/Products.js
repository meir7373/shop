import React, { useContext } from "react";
import ProductsContext from "./ProductsContext";
function Products(props) {
  let product = { image: "img", price: 0, quantity: 0, title: "title" };
  const productsAndChange = useContext(ProductsContext);

  if (productsAndChange.products) {
    product = productsAndChange.products[props.index];
  }
  return (
    <div
      className="divProducts"
      style={{
        width: "33%",
        border: "2px solid #c8c7cc78",
        margin: "1px",
        height: "293px",
        padding: "2px",
        boxSizing: "border-box",
        float: "left",
        backgroundImage: `url(${product.image})`,
        backgroundSize: "auto 80%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.30)",
        backgroundBlendMode: "color",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "22px",
          margin: "6px",
          marginTop: "26px",
          fontWeight: 700,
        }}
      >
        {product.title}
      </div>
      <div
        style={{
          fontSize: "25px",
          fontWeight: 700,
        }}
      >
        price:{product.price}
      </div>
      <div
        style={{
          marginTop: "90px",
          fontSize: "53px",
          height: "68px",
          userSelect: "none",
        }}
      >
        <span
          style={{
            height: "36px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => {
            productsAndChange.productToCart([props.index], "plus");
          }}
        >
          +
        </span>
        <span> {product.inCart} </span>
        <span
          style={{
            height: "36px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => {
            productsAndChange.productToCart([props.index], "minus");
          }}
        >
          -
        </span>
      </div>
      <div>Quantity:{product.quantity}</div>
    </div>
  );
}

export default Products;
