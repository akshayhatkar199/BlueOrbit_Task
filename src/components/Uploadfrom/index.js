import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { updateUsername } from "../../Store/reducers/userReducer";
import {
  customerfromsubmitByApi,
  uploadProductApi,
} from "../Helper/Customerfrom";
import swal from "sweetalert";

const Uploadfrom = () => {
  const [loading, setloading] = useState(false);
  const {id} = useParams();
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const existingUser = userData.filter(f => f.id == id);
  const {name, email} = existingUser[0]
 const [uname, setName] = useState(name);
 const [uemail, setEmail] = useState(email);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // console.log("userData", userData);
  console.log("existingUser", existingUser);

  const onFinish = (value) => {
    console.log("Success:", value);
    dispatch(updateUsername(
      {
        id: id,
        name: uname,
        email: uemail 
      }))
    navigate("/")
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h2 className="text-center mb-3">Update User</h2>
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
            name: uname,
            email: uemail
          }}
          onFinish={onFinish}
          // initialValues={}
          form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=" Name"
            name="name"
            value={uname} 
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
            value={uemail}
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Uploadfrom;
