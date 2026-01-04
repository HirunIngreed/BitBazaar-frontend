import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from "../compenents/Loader"
import { useNavigate } from "react-router-dom"
import GetOrderStatus from "../compenents/GetOrderStatus"

export default function AdminOrders(){

    const [isLoading,setIsLoading] = useState(false)
    const [orders,setOrders] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    
    

    useEffect(
        ()=>{
            setIsLoading(true)
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,
                {
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }
            ).then(
                (res)=>{setOrders(res.data.orders)
                    setIsLoading(false)
                }
            ).catch(
                ()=>{toast.error("Loading failed")
                    setIsLoading(false)
                }
            )
        },[]
        
    )
    


    return(
        
        <div className="w-full h-screen flex justify-center items-center">
            {
               isLoading&&<Loader/>
            }
                <div className="w-[95%] h-[95%] rounded-2xl lg:overflow-y-auto bg-gray-300 overflow-x-scroll">
                    {
                    orders.length==0&&
                    <div className="w-full h-full flex items-center justify-center text-2xl font-mono">
                        No Orders Found
                    </div>
                    }
                    <table className="w-full border-separate border-spacing-y-4 text-center">
                        <thead>
                            <tr>
                                <th className="lg:text-2xl text-xl font-mono">Order ID</th>
                                <th className="lg:text-2xl text-xl font-mono">Costomer</th>
                                <th className="lg:text-2xl text-xl font-mono">Date</th>
                                <th className="lg:text-2xl text-xl font-mono">Status</th>
                                <th className="lg:text-2xl text-xl font-mono">Total Price</th>
                                <th className="lg:text-2xl text-xl font-mono">Address</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                orders.map(
                                    (item,index)=>{
                                        return(
                                            <tr className=" cursor-pointer" key={index} onClick={()=>{navigate('/admin/orders/orderoverview',{state : item})}}>
                                                <td>{item.orderId}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                {item.date.split("T")[0]}
                                                </td>
                                                <td className="flex justify-center">{GetOrderStatus(item.status)}</td>
                                                <td>{item.total}</td>
                                                <td>{item.address}</td>
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