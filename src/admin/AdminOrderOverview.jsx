import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import GetOrderStatus from "../compenents/GetOrderStatus"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import axios from "axios"
import toast from "react-hot-toast"
import Loader from "../compenents/Loader"

export default function AdminOderOverview(){
    const location = useLocation()
    const [status,setStatus] = useState(location.state.status)
    const [notes,setNotes] = useState(location.state.notes)
    const scrollRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    

    function scrollUp(){
        if (scrollRef.current) {
            scrollRef.current.scrollTo ({
                top:scrollRef.current.scrollTop-100 ,behavior: "smooth"
            })
        }
    }

    function scrollDown(){
        if (scrollRef.current) {
            scrollRef.current.scrollTo ({
                top:scrollRef.current.scrollTop+100,behavior: "smooth"
            })
        }
    }

    async function handleUpdateOrderStatus(){
        try {
            setIsLoading(true)
            const token = localStorage.getItem("token")
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${location.state.orderId}`,{
                notes : notes,
                status : status
            },
                {
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }
            )
            toast.success("Order is updated")
            setIsLoading(false)
        } catch (error) {
            toast.error("Order update failed")
            setIsLoading(false)
        }
    }

    return(
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            {isLoading&&<Loader/>}
            <div className="w-[90%] h-[90%] rounded-2xl flex pl-10 bg-gray-300">
                
                    <div className="w-[35%] h-full flex relative justify-center items-center shadow-2xs">
                        <IoIosArrowUp className="text-2xl absolute -top-7 left-1/2 hover:scale-150 " onClick={scrollUp}/>
                            
                                <div ref={scrollRef} className="w-full h-[90%] rounded-2xl flex flex-col  gap-6 shadow-2xl overflow-y-scroll scrollbar-hide bg-gray-100">
                                    
                                    {
                                        location.state.items.map(
                                            (item,index)=>{
                                                return(
                                                    <div key={index} className="w-full h-[70px] border-2 bg-gray-100 rounded-2xl flex">
                                                        <img className="h-full aspect-square object-cover rounded-l-2xl" src={location.state.items[0].image}/>
                                                        <div className="w-[calc(100%-70px)] flex flex-col justify-center items-center">
                                                            <h1>{item.name.length>25?item.name.substring(0,25)+"..." : item.name}</h1>
                                                            <h1>{item.quantity}</h1>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                    

                                </div>
                        <IoIosArrowDown className="text-2xl absolute -bottom-7 left-1/2 hover:scale-150" onClick={scrollDown}/>
                    </div>
                
                <div className="w-[65%] h-full rounded-2xl flex flex-col pl-25 gap-4 justify-center">
                    
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Order ID : </span>{location.state.orderId}</h1></div>
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Costomer's Name : </span>{location.state.name}</h1></div>
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Costomer's Address : </span>{location.state.address}</h1></div>
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Costomer's Phone number : </span>{location.state.phone}</h1></div>
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Date of ordered : </span>{location.state.date.split('T')[0]}</h1></div>
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Total : </span>LKR {location.state.total.toFixed(2)}</h1></div>
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Unic products : </span>{location.state.items.length}</h1></div>
                    <div className="font-mono text-xl"><h1><span className="font-bold ">Total items : </span>{location.state.items.reduce((all,item)=>{return ( all + item.quantity )}, 0)}</h1></div>
                    <div className="flex flex-row">
                    <div className="font-mono text-xl w-[100px]"><h1><span className="font-bold ">Status : </span><span className="text-[15px]"><select value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                        <option value="pending">pending</option>
                        <option value="shipped">shiped</option>
                        <option value="canceled">canceled</option>
                        <option value="hold">hold</option>
                    </select>
                    </span>
                    </h1>
                    </div>
                    <div className="w-[70px]">{GetOrderStatus(status)}</div>
                    </div>
                    <div className="font-mono text-xl"><h1 className="font-bold">Notes : </h1>
                            <textarea onChange={(e)=>{setNotes(e.target.value)}} value={notes} className="w-[80%] h-[50px] border focus:border-2 rounded-2xl"></textarea>
                    </div>
                    <div className="w-full"><button onClick={handleUpdateOrderStatus} className={((status != location.state.status)||notes !=location.state.notes)?"w-[150px] h-[50px] bg-[#67897a] rounded-2xl hover:rounded-full active:bg-[#4b6359]":" hidden"}>Save Changes</button></div>
                </div>
            </div>
        </div>
    )
}