import React, { useContext } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import Shop from "./Shop";
import Cart from "./Cart";
import Admin from "./Admin";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProductsProvider } from "./ProductsContext";
import ProductsContext from "./ProductsContext";

const { useState } = React;

function MyRouter() {
  const productsAndChange = useContext(ProductsContext);
  const [adminUser, setAdminUser] = useState(false);

  const RouteToCart = <Link to="/cart">cart</Link>;
  const RouteToAdmin = adminUser ? (
    <Link to="/admin">admin</Link>
  ) : (
    <Link to="/login">admin</Link>
  );

  const RouteToShop = <Link to="/">Shop</Link>;
  const RouteToAddProduct = <Link to="/admin/add-product">add product</Link>;
  const RouteToDeleteProduct = (
    <Link to="/admin/delete-product">delete product</Link>
  );
  const RouteToEditProduct = <Link to="/admin/edit-product">edit product</Link>;
  const RouteToLogin = <Link to="/login">login</Link>;

  function func(value) {
    if (value === "admin") {
      setAdminUser(true);
    } else if (value === "user") {
      console.log("user");
    }
  }

  return (
    <ProductsProvider value={productsAndChange}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Shop
              RouteToLoginUser={RouteToLogin}
              RouteToCart={RouteToCart}
              RouteToAdmin={RouteToAdmin}
            />
          </Route>
          <Route exact path="/login">
            <Login RouteToShop={RouteToShop} func={func} />
          </Route>
          <Route exact path="/cart">
            <Cart RouteToShop={RouteToShop} />
          </Route>

          {adminUser && (
            <>
              <Route exact path="/admin">
                <Admin
                  RouteToAddProduct={RouteToAddProduct}
                  RouteToDeleteProduct={RouteToDeleteProduct}
                  RouteToShop={RouteToShop}
                  RouteToEditProduct={RouteToEditProduct}
                />
              </Route>
              <Route exact path="/admin/add-product">
                <AddProduct RouteToAdmin={RouteToAdmin} />
              </Route>
              <Route exact path="/admin/delete-product">
                <DeleteProduct RouteToAdmin={RouteToAdmin} />
              </Route>
              <Route exact path="/admin/edit-product">
                <EditProduct RouteToAdmin={RouteToAdmin} />
              </Route>
            </>
          )}
          <Route path="*">
            <Shop
              RouteToLoginUser={RouteToLogin}
              RouteToCart={RouteToCart}
              RouteToAdmin={RouteToAdmin}
            />
          </Route>
        </Switch>
      </Router>
    </ProductsProvider>
  );
}

export default MyRouter;
