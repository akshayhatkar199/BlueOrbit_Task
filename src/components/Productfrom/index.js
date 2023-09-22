import React, { useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import {
  customerfromsubmitByApi,
  uploadProductApi,
} from "../Helper/Customerfrom";
import swal from "sweetalert";

const Productfrom = () => {
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [imgError, setImageError] = useState("");
  const props = {
    listType: "picture",
    defaultFileList: [...fileList],
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      console.log("file", file);
      if (!isPNG) {
        setImageError(`${file.name} is not a png file`);
        message.error(`${file.name} is not a png file`);
        console.log("okkk");
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList([]);
        return isPNG || Upload.LIST_IGNORE;
      } else {
        setImageError("");
        setFileList([...fileList, file]);
        console.log("kkkooooo");
        return false;
      }
    },
    // maxCount: 1,
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("----------", values);
    setloading(true);
    console.log("Success:", values);
    const formData = new FormData();
    if (values.image) {
      formData.append("files", values.image.file);
    }
    uploadProductApi(formData, "product")
      .then(
        async (res) => {
          let filename = "";
          if (
            res.result &&
            res.result.files &&
            res.result.files.files.length > 0
          ) {
            filename = res.result.files.files[0].name;
          }
          let payloadData = {
            ...values,
            images: filename,
          };
          console.log("payloaddata", payloadData);
          await customerfromsubmitByApi(payloadData).then(
            (res) => {
              console.log("customer", res);
              swal("success", "success fully", "success");
              navigate("/Productinformation");
              setloading(false);
            },
            (err) => {
              console.log(err);
              swal("err", "Enqury Types ", "error");
            }
          );
        },
        (err) => {
          setloading(false);
        }
      )
      .catch();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container mt-5">
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
          label="Customer Name"
          name="CustomerName"
          rules={[
            {
              required: true,
              message: "Please input your Customer Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="ProductName"
          rules={[
            {
              required: true,
              message: "Please input your Product Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: "Please Enter image Upload.",
            },
          ]}
        >
          <Upload {...props} maxCount={1}>
            <Button style={{ marginLeft: "200px" }} icon={<UploadOutlined />}>
              Select File
            </Button>
          </Upload>
        </Form.Item>
        <lable className="text-danger">{imgError}</lable>

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
  );
};

export default Productfrom;
