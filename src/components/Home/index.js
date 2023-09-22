import React, { useState } from "react";
import { ProductinformationApi } from "../Helper/Customerfrom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Store/reducers/userReducer";
import { Link } from "react-router-dom";
import { deleteUser } from "../../Store/reducers/userReducer";

const Home = () => {
  const [loading, setloading] = useState(false);
  const userData = useSelector((state) => state.userData.value);
  console.log("user", userData.value);
  // const [tabledata, settabledata] = useState([]);
  const dispatch = useDispatch();

  const handeldelete = (id) => {
    dispatch(deleteUser({id: id}))
  }
  return (
    <div className="container">
      <h2>crud Data</h2>
      <Link to="/Create">
        <button className="btn btn-success my-3">Create +</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th> CustomerName</th>
            <th>ProductName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              <Link to={`/edit/${user.id}`}>
              <button className="btn-primary" >Edit </button>
              </Link>
              
                <button className="btn-danger ms-2" onClick={() => handeldelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
