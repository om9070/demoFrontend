import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
const { api } = require("./api")


const Home = () => {
    const [data, setdata] = useState({ name: "", email: "", phone: "", password: "", date: "", status: "pending", gender: "", newpassord: "" })
    const[active,setacive]=useState(true)
	let navigate = useNavigate()

    const handleTextChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
    }

    const getProfileDetails = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const getProfile = await fetch(
                `${api}getprofiledata`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const resProfile = await getProfile.json();
            if (resProfile.status == 1) {
                console.log(resProfile)
                toast.success(resProfile.message);
                setdata({ ...data, name: resProfile?.data?.name, email: resProfile?.data?.email, phone: resProfile?.data?.phone, date: resProfile?.data?.date, status: resProfile?.data?.status, gender: resProfile?.data?.gender })
            } else {
                toast.error("something went wrongs")
            }
        } catch (e) {
            toast.error("something went wrongs")
            console.log(e)
        }
    }

    useEffect(() => {
        getProfileDetails()
    }, [])

    const handleStatusChange = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const getStatus = await fetch(
                `${api}getstatusupdate?status=${data.status}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const resStatus = await getStatus.json();
            if (resStatus.status == 1) {
                toast.success(resStatus.message);
                getProfileDetails()
            } else {
                toast.error("something went wrongs")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const postapi = await fetch(`${api}changepassword`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ newpassord: data?.newpassord, password: data?.password })
            })
            const registerUser = await postapi.json();
            if (registerUser.status === 1) {
                toast.success(registerUser.message);

            } else {
                toast.success("something went wrong");

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleUserDelete=async()=>{
        try{
            var authToken = localStorage.getItem("token");
            const postapi = await fetch(`${api}deleteprofile`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            })
            const deleteuser=await postapi.json();
            if (deleteuser.status === 1) {
                toast.success(deleteuser.message);
                localStorage.removeItem("token")
                navigate("/")
            } else {
                toast.success("something went wrong");

            }
        }catch(E){
            console.log(E)
        }
    }

    const handlChangeProfile=async()=>{
        try{
            var authToken = localStorage.getItem("token");
            const updataProfile = await fetch(`${api}updateprofile`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ name: data?.name, email:data?.email, phone: data?.phone, date:data?.date,gender: data.gender })
            })
            const updataProfileData = await updataProfile.json();
            if (updataProfileData.status === 1) {
                toast.success(updataProfileData.message);
                getProfileDetails()
                setacive(true)

            } else {
                toast.success("something went wrong");

            }
        }catch(e){
            console.log(e)
        }
    }

    const handleclearSession=()=>{
        try{
            localStorage.removeItem("token")
            navigate("/")
        }catch(e){
            console.log(e)
        }
    }

    return (
        <>
            <div class="container">
                <div class="row card my-2 align-items-start ">
                    <div class="d-flex justify-content-around my-5"><label className=" mt-2">status</label>
                        <select value={data.status} name="status" onChange={(e) => handleTextChange(e)} className="w-50 py-2 mx-2">
                            <option value="pending">pending</option>
                            <option value="active">active</option>
                            <option value="de-active">de-active</option>
                        </select>
                        <button className="col-md-4 btn btn-info" onClick={handleStatusChange}>change</button>
                    </div>
                    <h2 className="text-center text-primary my-3">{data?.status}</h2>
                </div>
                <div class="container row align-items-start my-5">
                    <div class="col-md-8">
                        <div class="card" >
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">name = <span className="ms-3">{active?data?.name:<input
									type="text"
									name="name"
									className="form-control w-75"
									placeholder="enter your name"
									value={data.name}
									onChange={(e) => handleTextChange(e)}
								/>}</span></li>
                                <li class="list-group-item">email = <span className="ms-3">{active?data?.email:<input
									type="email"
									name="email"
									className="form-control"
									placeholder="name@address.com"
									value={data.email}
									onChange={(e) => handleTextChange(e)}
								/>}</span></li>
                                <li class="list-group-item">phone = <span className="ms-3">{active?data?.phone:<input
									type="number"
									name="phone"
									className="form-control"
									placeholder="enter your phone number"
									value={data.phone}
									onChange={(e) => handleTextChange(e)}

								/>}</span></li>
                                <li class="list-group-item">date = <span className="ms-3">{active?data?.date:<input
									type="Date"
									name="date"
									className="form-control"
									placeholder="name@address.com"
									value={data.date}
									onChange={(e) => handleTextChange(e)}

								/>}</span></li>
                                <li class="list-group-item w-50">gender = <span className="ms-3">{active?data?.gender:<select value={data.gender} name="gender" onChange={(e) => handleTextChange(e)} className="w-100 py-2">
									<option value="female">female</option>
									<option value="male">male</option>
								</select>}</span></li>
                            </ul>

                        </div>
                       {active?
                          <button className="col-md-3 btn btn-info my-3" onClick={()=>setacive(false)}>Edit profile</button>:<>
                        <button className="col-md-3 btn btn-info my-3 mx-3" onClick={()=>setacive(true)}>CANCLE</button>
                        <button className="col-md-3 btn btn-info my-3" onClick={handlChangeProfile}>changeProfile</button></>
                       } 

                    </div>
                    <div class="col-md-4">
                        <div className="form-group">

                            <label className="mt-2">password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="enter your password"
                                value={data.password}
                                onChange={(e) => handleTextChange(e)}

                            />

                            <label className="mt-2">new password</label>
                            <input
                                type="password"
                                name="newpassord"
                                className="form-control"
                                placeholder="enter your passeord"
                                value={data.newpassord}
                                onChange={(e) => handleTextChange(e)}
                            />

                        </div>
                        <button className="col-md-8 btn btn-info my-3" onClick={handleChange}>change password</button>
                    </div>


                </div>
            </div>
                    <div class="col-md-4 d-flex">

                        <button className="col-md-8 btn btn-danger my-3 mx-4" onClick={handleUserDelete}>delete User</button>
                        <button className="col-md-8 btn btn-info my-3" onClick={handleclearSession}>logOut</button>
                    </div>
        </>
    )
}
export default Home;