import React, { useState } from 'react'
import '../css/registration.css';



const Registration = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    work: "",
    password: "",
    cpassword: "",
    photo: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });           // here this is a form of arroy function in one line
  }

  const postImg = (e) => {
    console.log(e.target.files[0])
    setUser({ ...user, photo: e.target.files[0] });
  }


  const PostData = async (e) => {
    e.preventDefault();
    // let url = 'http://localhost:3000/register'
    const formData = new FormData();
    formData.append('photo', user.photo)
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('work', user.work)
    formData.append('password', user.password)
    formData.append('cpassword', user.cpassword)

    const response = await fetch('/register',{
      method: 'POST',
  body: formData,
});
  // if(response.status === 200){
  //       window.alert("added");
  // }
  // else{
  //     window.alert("something went wrong..!");
  // }
    // const { name, email, work, password, cpassword, filename } = user;
    // const res = await fetch('/register', formData)
    // method: "POST",
    // headers:{
    //   "Content-Type":"application/json"
    // },
    // body: JSON.stringify({
    //   name, email, work, password, cpassword, filename
    // })

    const data = await response.json();
    if (data.status === 422 || !data) {
      window.alert("invalid");
      console.log("error hai")
    }
    else {
      window.alert("success");
      console.log("success")
    }
    // history.push("/login")
  }

  return (
    <>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Responsive Registration Form</h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form method="POST"  encyype="multipart/form-data"  >

                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                  <input type="text" name="name" value={user.name} onChange={handleInputs} placeholder="name" required />
                </div>
                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                  <input type="email" name="email" value={user.email} onChange={handleInputs} placeholder="Email" required />
                </div>
                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                  <input type="text" name="work" value={user.work} onChange={handleInputs} placeholder="work" required />
                </div>
                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                  <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder="Password" required />
                </div>
                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                  <input type="password" name="cpassword" value={user.cpassword} onChange={handleInputs} placeholder="Re-type Password" required />
                </div>
                <div className="row clearfix">
                  <div className="col_half">
                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                      <input type="text" name="name" placeholder="First Name" />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                      <input type="text" name="name" placeholder="Last Name" required />
                    </div>
                  </div>
                </div>
                <div className="input_field radio_option">
                  <input type="radio" name="radiogroup1" id="rd1" />
                  <label htmlFor="rd1">Male</label>
                  <input type="radio" name="radiogroup1" id="rd2" />
                  <label htmlFor="rd2">Female</label>
                </div>
                <div className="input_field select_option">
                  <select>
                    <option>Select a country</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <div className="select_arrow"></div>
                </div>
                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb1" />
                  <label htmlFor="cb1">I agree with terms and conditions</label>
                </div>
                <div>
                  <input type="file" name="photo" accept=".png, .jpg, .jpeg" onChange={postImg} />
                </div>
                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb2" />
                  <label htmlFor="cb2">I want to receive the newsletter</label>
                </div>
                <input className="button" type="submit" name="signup" onClick={PostData} value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration