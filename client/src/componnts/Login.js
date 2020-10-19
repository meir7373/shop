import React, { useContext } from "react";
import ProductsContext from "./ProductsContext";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 10,
  },
};

const Login = (props) => {
  let history = useHistory();
  const productsAndChange = useContext(ProductsContext);
  const onFinish = (values) => {
    productsAndChange.login
      .funcLogin(values.username, values.password)
      .then((res) => {
        if (res === "admin") {
          history.push("/admin");
          props.func("admin");
        } else if (res === "user") {
          history.push("/");
          props.func("user");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
