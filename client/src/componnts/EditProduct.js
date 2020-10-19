import React, { useContext } from "react";
import "./css.css";
import { Table } from "antd";
import "antd/dist/antd.css";
import ProductsContext from "./ProductsContext";
import URLOrFileFromComputer from "./URLOrFileFromComputer";

function EditProduct(props) {
  const productsAndChange = useContext(ProductsContext);

  const func = (value, id) => {
    productsAndChange.products[id].image = value;
  };

  const columns = [
    {
      title: "title",
      render: (product) => {
        return (
          <input
            type="text"
            name="title"
            placeholder={product.title}
            onChange={(e) => {
              productsAndChange.products[product.key].title = e.target.value;
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
            placeholder={product.quantity}
            onChange={(e) => {
              productsAndChange.products[product.key].quantity = e.target.value;
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
            placeholder={product.price}
            onChange={(e) => {
              productsAndChange.products[product.key].price = e.target.value;
            }}
          />
        );
      },
    },
    {
      title: "image",
      render: (product) => {
        return <URLOrFileFromComputer func={func} product={product.key} />;
      },
    },
    {
      title: "add",

      render: (product) => (
        <span
          onClick={() => {
            productsAndChange.changeProductsInServer(
              "put",
              `putProduct/${productsAndChange.products[product.key]._id}`,
              productsAndChange.products[product.key]
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
          edit product
        </span>
      ),
      width: 150,
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
      <Table dataSource={productsAndChange.products} columns={columns} />;
    </div>
  );
}

export default EditProduct;
