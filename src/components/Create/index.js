import React, { useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { addUser } from "../../Store/reducers/userReducer";
import {
  customerfromsubmitByApi,
  uploadProductApi,
} from "../Helper/Customerfrom";
import swal from "sweetalert";

const Create = () => {
  const [loading, setloading] = useState(false);
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (value) => {
    // event.preventDefault();
    console.log("Success:", value);
    console.log("----------", value);
    dispatch(addUser({id: userData[userData.length - 1].id  + 1, name, email }))
    navigate("/")
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h2 className="text-center mb-3">Add User</h2>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=" Name"
            name="name"
            onChange={e => setName(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Create;
