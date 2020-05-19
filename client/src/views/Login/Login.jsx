import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
// const { Form, Input, Button, Checkbox } = antd;

const css = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid rgb(214, 212, 212)",
  padding: "50px",
};

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 0,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 0,
  },
};

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={css}>
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
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
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
