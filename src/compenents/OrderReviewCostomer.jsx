import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import GetOrderStatus from "./GetOrderStatus";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsTruck } from "react-icons/bs";

export default function OrderReviewCoustomer(props){
    const [orders,setOrders] = useState([])
    const toggel = props.toggel
    const message = props.message


    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/orderByUser`,
                {
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }
            ).then(
                (res)=>{
                    setOrders(res.data.orders)
                }
            ).catch(
                (err)=>{
                    toast.error("Please try again")
                }
            )
        },[]
    )
    return(
        <div className="w-full h-screen fixed top-0 left-0 bg-black/35 z-50 flex items-center justify-center">
            <div className="w-[85%] h-[85%] bg-white relative  rounded-2xl flex items-center justify-center p-5 my-5">
                <RxCross2  className="text-3xl hidden lg:flex text-red-600 absolute top-1 right-1 cursor-pointer hover:scale-130" onClick={()=>{toggel(false)}}/>
                    <RxCross2  className="text-2xl lg:hidden text-red-600 absolute top-1 right-1 cursor-pointer hover:scale-130" onClick={()=>{message(false)}}/>
                    {(orders.length==0)?<h1>You have not orders yet</h1>:
                        orders.map(
                            (item,index)=>{
                                return(
                                    <div key={index} className="lg:w-[400px] lg:h-[85%] w-full h-[95%] shadow-2xl flex relative justify-center">
                                        <div className="w-full h-[calc(100%-80px)] overflow-y-scroll scrollbar-hide">
                                            <div className="w-full h-20 absolute bottom-0 left-0 flex items-center justify-between p-3">
                                                <h1 className="text-xl">Total : LKR{item.total.toFixed(2)}</h1>
                                                <div className="flex"><h1 className="text-xl align-middle">Status : </h1> {GetOrderStatus(item.status)}</div>
                                            </div>
                                            {
                                                item.items.map(
                                                    (orderItem,orderIndex)=>{
                                                        return(
                                                            <div key={orderIndex} className="w-full h-[150px] flex relative justify-center rounded-2xl shadow-2xl">
                                                                <img className="h-full aspect-square rounded-l-2xl" src={orderItem.image}/>
                                                                <div className="w-[calc(100%-150px)] h-full flex flex-col justify-center gap-4 pl-4">
                                                                    <h1 className="text-[20px] font-semibold font-mono">{orderItem.name}</h1>
                                                                    <h1>{orderItem.productId}</h1>
                                                                    <div>
                                                                        <h1 className="text-[20px] font-semibold font-mono">LKR {orderItem.price.toFixed(2)} <span>*</span> <span>{orderItem.quantity}</span></h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                            

                                            
                                        </div>  
                                    </div>
                                )
                            }
                        )
                    }
            </div>
        </div>
    )
}