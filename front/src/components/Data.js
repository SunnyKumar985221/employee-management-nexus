import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Data = () => {
  const [userData, setUserData] = useState([]);
  console.log(userData)

  const getUser = async () => {
    // const res = await axio.get('/getdata')
    // const data = await res.json();

    try {
      // const response = await axios.get('https://randomuser.me/api/');
      const { data } = await axios.get('/getdata')
      // or we can use fetch api as 

      // const {data} = await res.json();
      setUserData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    // console.log(data);
    // setUserData(data);

    //
  }

  useEffect(() => {
    getUser();
  }, [])
  const deletetuser = async (id) => {
    const res2 = await fetch(`delete/${id}`, {

      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const deldata = await res2.json();
    // console.log(data);
    // setUserData(data);

    if (res2.status === 404 || !deldata) {
      console.log("error")
    } else {
      console.log("deleted");
      getUser();
    }
  }


  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Work</th>
            <th>Photo</th>
          </tr>
        </thead>

        {
          userData.map((val, key) => {
            return <>

              <tbody>
                <tr>
                  <td>{key + 1} </td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.work}</td>
                  <td><img src={`/uploads/${val.photo}`} style={{ "width": "50px" }} /></td>
                  <td><NavLink to={`view/${val._id}`}><button className="btn btn-success">View</button></NavLink></td>
                  <td><NavLink to={`edit/${val._id}`}><button className="btn btn-primary">Edit</button></NavLink></td>
                  <td><button className="btn btn-danger" onClick={() => deletetuser(val._id)}>Delete</button></td>
                </tr>

              </tbody>
            </>
          })
        }
      </table>

    </div>

  );
}

export default Data