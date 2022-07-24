import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import "../css/about.css";
import profile from '../images/profile.jpg';
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
const About = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {

        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      // console.log(data);
      setUserData(data);
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  useEffect(() => {
    callAboutPage();
  }, [])

  return (
    <div>
      <div><NavLink to="/data" ><button className="btn btn-primary">View all Data</button></NavLink></div>
      <div>name : {userData.name}</div>
      <div>email : {userData.email}</div>
      <div>work : {userData.work}</div>
      <div>photo : {userData.photo}</div>
      {/* <div>work : {userData}</div> */}

      {/* {/* </form> */}

      <div className="about1">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center">
            <span className="about2">
              Hi {userData.name}
            </span>

          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <span className="about2">
            <img className="about3" style={{width:"250px"}}src={profile}/>
            </span>

          </div>
        </div>
      </div>




    </div>
  )
}

export default About