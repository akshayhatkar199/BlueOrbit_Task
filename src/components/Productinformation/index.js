import React, { useEffect, useState } from "react";
import { Card, Button, notification, message } from "antd";
import { ProductinformationApi } from "../Helper/Customerfrom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Store/reducers/userReducer";
import { Link } from "react-router-dom";

const Productinformation = () => {
  const [loading, setloading] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [customerinformationdata, setcustomerinformationdata] = useState([]);
  const dispatch = useDispatch();
  const URLidimage = "http://localhost:3000/api/fileuploads/product/download/";
  useEffect(() => {
    Infromationfun();
  }, []);

  const Infromationfun = async () => {
    setloading(true);
    ProductinformationApi().then(
      (res) => {
        console.log("information", res);
        setcustomerinformationdata(res);
        setloading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div className="container mt-5">
      <div className="float-end">
        <Link to="/Reduxinformationdata">
          <Button type="primary">Go to Card</Button>
        </Link>
      </div>
      {customerinformationdata.length > 0 ? (
        customerinformationdata.map((e, index) => {
          return (
            <>
              <Card
                style={{
                  width: 500,
                }}
              >
                <h5>Customer Name :</h5>
                <p>{e.CustomerName}</p>
                <h5>Product Name :</h5>
                <p>{e.ProductName}</p>
                <h5>Product Image :</h5>
                <div className="m-4">
                  <img
                    src={URLidimage + e.images}
                    alt=""
                    className="img-thumbnail w-50"
                  />
                </div>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    dispatch(
                      addUser({
                        CustomerName: e.CustomerName,
                        ProductName: e.ProductName,
                        images: e.images,
                      })
                    );
                    if (userData.value) {
                      notification.success({
                        message: "Add Card is success fully",
                        description: "Add Card!",
                        placement: "topRight",
                      });
                    }
                  }}
                >
                  Add Redux
                </Button>
              </Card>
            </>
          );
        })
      ) : (
        <>
          <h4>No Data</h4>
        </>
      )}
    </div>
  );
};

export default Productinformation;
