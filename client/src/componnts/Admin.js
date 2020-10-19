import React from "react";

function Admin(props) {
  return (
    <div>
      <div
        style={{
          fontSize: "xx-large",
          textAlign: "end",
          padding: "4%",
        }}
      >
        {props.RouteToShop}
      </div>
      <div>
        <div
          style={{
            backgroundColor: "beige",
            border: "solid",
            borderColor: "darkorchid",
            borderWidth: "thin",
            width: "33%",
            height: "100px",
            float: "left",
            fontSize: "35px",
            textAlign: "center",
            paddingTop: "2%",
          }}
        >
          {props.RouteToAddProduct}
        </div>
        <div
          style={{
            backgroundColor: "beige",
            border: "solid",
            borderColor: "darkorchid",
            borderWidth: "thin",
            width: "33%",
            height: "100px",
            float: "left",
            fontSize: "35px",
            textAlign: "center",
            paddingTop: "2%",
          }}
        >
          {props.RouteToDeleteProduct}
        </div>
        <div
          style={{
            backgroundColor: "beige",
            border: "solid",
            borderColor: "darkorchid",
            borderWidth: "thin",
            width: "33%",
            height: "100px",
            float: "left",
            fontSize: "35px",
            textAlign: "center",
            paddingTop: "2%",
          }}
        >
          {props.RouteToEditProduct}
        </div>
      </div>
    </div>
  );
}

export default Admin;
