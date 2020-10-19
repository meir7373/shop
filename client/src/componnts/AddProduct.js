import React, { useContext } from "react";
import "./css.css";
import { Table } from "antd";
import "antd/dist/antd.css";
import ProductsContext from "./ProductsContext";
import URLOrFileFromComputer from "./URLOrFileFromComputer";

function AddProduct(props) {
  const productsAndChange = useContext(ProductsContext);

  const newProduct = [
    {
      title: "",
      image: "",
      quantity: 0,
      price: 0,
      inCart: 0,
      key: 123,
    },
  ];

  const func = (value) => {
    newProduct[0].image = value;
  };

  const columns = [
    {
      title: "title",
      render: (product) => {
        return (
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={(e) => {
              newProduct[0].title = e.target.value;
            }}
          />
        );
      },
    },
    {
      title: "quantity",
      render: (product) => {
        return (
          <input
            type="number"
            name="quantity"
            placeholder="quantity"
            onChange={(e) => {
              newProduct[0].quantity = e.target.value;
            }}
          />
        );
      },
    },
    {
      title: "price",
      render: (product) => {
        return (
          <input
            type="number"
            name="price"
            placeholder="price"
            onChange={(e) => {
              newProduct[0].price = e.target.value;
            }}
          />
        );
      },
    },
    {
      title: "image",
      render: (product) => {
        return <URLOrFileFromComputer func={func} />;
      },
    },
    {
      title: "add",
      render: (product) => (
        <span
          onClick={() => {
            productsAndChange.products.push(newProduct[0]);
            productsAndChange.changeProductsInServer(
              "post",
              "addProduct",
              newProduct[0]
            );
            productsAndChange.changeProducts([...productsAndChange.products]);
          }}
          style={{
            cursor: "pointer",
            color: "#0a0000",
            backgroundColor: "#ec0821",
            padding: "8px",
            fontWeight: 700,
          }}
        >
          add product
        </span>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          fontSize: "xx-large",
          textAlign: "end",
          padding: "4%",
        }}
      >
        {props.RouteToAdmin}
      </div>
      <Table dataSource={newProduct} columns={columns} />;
    </div>
  );
}

export default AddProduct;
