import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import pic from "../images/login.jpg";



const Login = () => {

	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const loginUser = async (e) => {

		e.preventDefault();

		const res = await fetch('/signin', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email, password
			})
		});

		const data = res.json();
		console.log(data);
		if (res.status === 400 || !data) {
			window.alert("invalid");
			console.log("error hai")
		} else {
			// window.alert("success login cls");
			navigate('/about');
		}
	}
	return (
		<>
		{/* <div>{data}</div> */}
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100" >
						<form method="POST" className="login100-form validate-form" id="login-form" style={{ marginTop: "7%" }}>
							<span className="login100-form-title p-b-34" >
								Account Login
							</span>

							<div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
								<input id="first-name" className="input100" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="User name" />
								<span className="focus-input100"></span>
							</div>
							<div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
								<input className="input100" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
								<span className="focus-input100"></span>
							</div>

							<div className="container-login100-form-btn">
								<button className="login100-form-btn" name="signin" onClick={loginUser} type="submit">
									Sign in
								</button>
							</div>

							<div className="w-full text-center p-t-27 p-b-239">

								{/* <a  className="txt2" style={{ textDecoration: "none" }}>
									Forgot Password
								</a> */}
							</div>


						</form>

						<div className="login100-more" style={{ backgroundImage: `url(${pic})` }}></div>
					</div>
				</div>
			</div>



			<div id="dropDownSelect1"></div>

		</>
	)
}

export default Login