import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from "../compenents/Loader"
import { MdOutlineDeleteForever } from "react-icons/md"

export default function AdminUsers(){
    const [users,setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isButtonLoading,setIsButtonLoading] = useState(false)

    useEffect(
        ()=>{
            if (!isLoading) {
                
            
            const token = localStorage.getItem("token")
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`,{
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(
                (res)=>{
                    setUsers(res.data.users)
                    setIsLoading(false)
                }
            ).catch(
                (err)=>{
                    toast.error("Failed to fetch users")
                    setIsLoading(false)
                }
            )
        }
        },[isLoading]
    )


    return(
        <div className="w-full h-screen flex items-center justify-center">
            {
                isLoading && <Loader/>
            }
                <div className="w-[95%] h-[95%] rounded-2xl overflow-y-auto bg-gray-300">
                    <table className={(users.length==0)?"hidden":"w-full border-separate border-spacing-y-4 text-center table-fixed"}>
                        <thead>
                            <tr>
                                <th className="font-mono font-bold text-xl lg:text-2xl">Name</th>
                                <th className="font-mono font-bold text-xl lg:text-2xl">E-mail</th>
                                <th className="font-mono font-bold text-xl lg:text-2xl">Images</th>
                                <th className="font-mono font-bold text-xl lg:text-2xl">Role</th>
                                <th className="font-mono font-bold text-xl lg:text-2xl">Status</th>
                                <th className="font-mono font-bold text-xl lg:text-2xl">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="text-center divide-y divide-black">
                            {
                                users.map(
                                    (user,index)=>{
                                        return(
                                            <tr key={index} className="border-b">
                                                <td>{user.firstName+" "+user.lastName }</td>
                                                <td>{user.email}</td>
                                                <td className="flex justify-center"><img src={user.image} className="w-[50px] h-[50px]"/></td>
                                                <td>{user.role}</td>
                                                <td>{user.isBlocked?'Blocked':"Active"}</td>
                                                <td>
                                                    <button className="w-[120px] h-[30px] bg-blue-600 active:bg-blue-800 rounded-xl hover:rounded-full cursor-pointer" onClick={()=>{
                                                        setIsLoading(true)
                                                        const token = localStorage.getItem("token")
                                                        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/status/${user.email}`,{email : user.email , isBlocked : user.isBlocked},{
                                                            headers : {
                                                                "Authorization" : "Bearer "+token
                                                            }
                                                        }).then(
                                                            (res)=>{
                                                                toast.success("User status is updated")
                                                                setIsLoading(false)
                                                            }
                                                        ).catch(
                                                            (err)=>{
                                                                toast.error("User status updated is failed")
                                                                setIsLoading(false)
                                                            }
                                                        )
                                                    }}>
                                                        {
                                                            user.isBlocked ?"Blocked":"Unblocked"
                                                        }
                                                    </button>
                                                    </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    )
}