import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData(){
    const [user,setUser] = useState(null)
    const [selectedOption, setSelectedOption] = useState("user");

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if (token) {
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/find/`,{
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }).then(
                    (res)=>{
                        setUser(res.data)
                    }
                ).catch(
                    ()=>{
                        setUser(null)
                    }
                )
            }
        },[]
    )

    return(
        <>
            {
                user ? <div className="flex h-[50px] w-[100px] items-center">
                    <select className="bg-transparent ml-2 mt-0 align-middle4"defaultValuevalue={selectedOption} onChange={
                        (e)=>{
                            if(e.target.value=="logout"){
                                localStorage.removeItem("token")
                            }
                            setSelectedOption("user")
                        }
                    }>
                        <option className="bg-black/30" selected={"user"}>{user.firstName} </option>
                        <option className="bg-black/30" value={"logout"}>LogOut</option>
                    </select>

                </div>:
                <div>
                    <Link className="mx-2" to="/login">Login</Link>
                    <Link className="mx-2"to="/register">Register</Link>
                </div>
            }
        </>
    )
}