import React, { useContext } from "react";
import "antd/dist/antd.css";
import { Form, Input, notification, Button, Row, Col } from "antd";
import { useHistory } from "react-router";
import { AppContext } from "../../utils/context";
import { authenticate } from "../../api/auth";
import { IUser } from "../../models/user";

export default function LoginPage() {
  const history = useHistory();
  const { setProfile, users } = useContext(AppContext);

  const onFinish = async (values: IUser) => {
    const { profile, errorText } = await authenticate(users, values);

    if (errorText) {
      notification["error"]({
        message: "Ошибка",
        duration: 2,
        description: "Не удалось авторизоваться",
      });
    } else {
      setProfile(profile);
      history.push("/calendar");
    }
  };

  return (
    <Row justify="space-around" align="middle" style={{ minHeight: "100%" }}>
      <Col span={4}>
        <Form
          className={`login-form`}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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

          <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
