import React,{useState} from 'react'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


const loginUser = async (e)=>{
e.preventDefault();
const res = await fetch('/signin',{
  method: "POST",
  headers:{
    "Content-Type":"application/json"
  },
  body: JSON.stringify({
     email, password
  })
});
const data = res.json();
if (data.status === 400 || !data) {
  window.alert("invalid");
  console.log("error hai")
}else {
  window.alert("success");
  console.log("success");
  
}
}


    return (
    <form method="post">
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <button name="signin" onClick={loginUser} type="submit" className="btn btn-primary">Submit</button>
    
  </form>
  )
}

export default Login