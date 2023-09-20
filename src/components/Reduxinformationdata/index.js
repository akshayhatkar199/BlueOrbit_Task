import React from "react";
import { Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux'

const Reduxinformationdata = () => {
    const userData = useSelector((state)=>state.userData);
    const URLidimage = 'http://localhost:3000/api/fileuploads/product/download/';
    console.log("userData", userData)
  return (
    <div className="container mt-5">
        {userData.value.length > 0 ? (
    userData.value.map((e, index) => {
      return (<>  
    <Card
    title="Redux store data use"
    bordered={false}
    style={{
      width: 500,
    }}
  >
     <h5>Customer Name :</h5>
    <p>{e.CustomerName}</p>
    <h5>Product Name :</h5>
    <p>{e.ProductName}</p>
    <h5>Product Image :</h5>
        {/* <p>{e.Productimage}</p> */}
        <div className="m-4">
        <img
        src={URLidimage + e.images}
        alt=""
        className="img-thumbnail w-50"
        />                                    
        </div>
  </Card>
  </>)})):(<><h3 className="text-danger">No Data</h3> </>)}
  </div>
  )
};

export default Reduxinformationdata;
