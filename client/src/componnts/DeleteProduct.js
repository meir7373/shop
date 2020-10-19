import React, { useContext } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import ProductsContext from "./ProductsContext";
function DeleteProduct(props) {
  const productsAndChange = useContext(ProductsContext);

  const columns = [
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "image",
      render: (product) => {
        return (
          <img
            src={product.image}
            style={{
              height: "50px",
            }}
            alt="img"
          />
        );
      },
    },
    {
      title: "delete",
      render: (product) => (
        <span
          onClick={() => {
            if (productsAndChange.products[product.key]._id) {
              productsAndChange.changeProductsInServer(
                "delete",
                `deleteProduct/${productsAndChange.products[product.key]._id}`
              );
              productsAndChange.products.splice(product.key, 1);
              productsAndChange.changeProducts([...productsAndChange.products]);
            } else {
              alert('ע"מ למחוק מוצר זה יש לרענן את העמוד');
            }
          }}
          style={{
            cursor: "pointer",
            color: "#0a0000",
            backgroundColor: "#ec0821",
            padding: "8px",
            fontWeight: 700,
          }}
        >
          delete product
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
      <Table dataSource={productsAndChange.products} columns={columns} />;
    </div>
  );
}

export default DeleteProduct;
