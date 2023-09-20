import React,{useState,useEffect} from 'react'
import {Navigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {checkLogin} from '../Store/reducers/userReducer'
import { ProductinformationApi } from './Helper/Customerfrom';
function RequireAuth({children}) {
    const dispatch = useDispatch()  
    const [isLogin,setIsLogin] = useState(true);
    const [loading,setLoading] = useState(true);
//     const [customerinformationdata, setcustomerinformationdata] = useState(false);
 
//   useEffect(() => {
//     Infromationfun();
//   }, []);

//   const Infromationfun = () => {
//     ProductinformationApi().then(
//       (res) => {
//         console.log("information", res);
//         setcustomerinformationdata(res)
//         setLoading(false);
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   };
    const checkIsLogin = async() => {
        const token = localStorage.getItem("token"); 
        if(token){
          const data=await dispatch(checkLogin(token))
          console.log("data",data.payload?.info?.data)
          if(data.payload?.info){
            setIsLogin(true)
          }else{
            setIsLogin(false);
          }
        }else{
          setIsLogin(false);
        }
        setLoading(false);
      }
    useEffect(() => {
        checkIsLogin();
      },[]);
      if(loading){
        return(
          <div>
            Loading...
          </div>
        )
      }
      if(isLogin === false){
       return <Navigate to="login"/>
      }
  return (
    <div>{children}</div> 
  )
}

export default RequireAuth