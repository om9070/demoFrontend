import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
const { api } = require("./api")



const Log_in = () => {
	const [data, setdata] = useState({ email: "", password: "" })
	let navigate = useNavigate()

	const handleTextChange = (e) => {
		console.log(e.target.value)
		const { name, value } = e.target;
		setdata({ ...data, [name]: value })
	}

	const handleClick = async () => {
		try {
			const postapi = await fetch(`${api}login`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: data?.email, password: data?.password })
			})
			const registerUser = await postapi.json();
			if (registerUser.status === 1) {
				toast.success(registerUser.message);
				localStorage.setItem("token", registerUser.token);
				navigate("/home")
			} else {
				toast.success(registerUser.message);
			}

		} catch (e) {
			console.log(e)
		}

	}

	return (
		<>
			<div className="d-flex align-items-center vh-100">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-md-5 col-xl-4 my-5">
							<h1 className="display-4 text-center mb-3"> Log In</h1>
							<div className="form-group">
								<label className="mt-2">Email Address</label>
								<input
									type="email"
									name="email"
									className="form-control"
									placeholder="name@address.com"
									value={data.email}
									onChange={(e) => handleTextChange(e)}
								/>

								<label className="mt-2">password</label>
								<input
									type="password"
									name="password"
									className="form-control"
									placeholder="enter your password"
									value={data.password}
									onChange={(e) => handleTextChange(e)}

								/>
							</div>

							<button className="my-3 btn btn-info" onClick={handleClick}>submit</button>
						</div>
					</div>
				</div>

			</div>
		</>
	)
}
export default Log_in;