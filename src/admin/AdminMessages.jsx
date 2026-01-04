import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export default function AdminMessages(){
    const [messages,setMessages] = useState([])


    useEffect(
        ()=>{
            const token = localStorage.getItem('token')
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/message`,{
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(
                (res)=>{
                    setMessages(res.data.messages)
                }
            ).catch(
                (err)=>{
                    toast.error("Messages loading failed")
                }
            )
        },[]
    )
    return(
        <div className="w-full h-screen flex items-center justify-center">

            <div className="w-[95%] h-[95%] rounded-2xl lg:overflow-y-auto bg-gray-300 overflow-x-scroll">
                {
                    messages.length==0&&
                    <div className="w-full h-full flex items-center justify-center text-2xl font-mono">
                        No Messages Found
                    </div>
                }
                <table className={(messages.length==0)?"hidden":"w-full text-center border-separate border-spacing-y-4"}>
                    <thead className="text-2xl font-mono">
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           messages.map(
                            (item,index)=>{
                                return(
                                    <>
                                    <tr key={index} >
                                        <td>{item.firstName+" "+item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.message}</td>
                                        <td>{item.date.split("T")[0]}</td>
                                                    
                                    </tr>
                                        
                                    </>
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