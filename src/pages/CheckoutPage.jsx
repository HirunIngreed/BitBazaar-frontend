import { useState } from "react";
import Header from "../compenents/Header";
import { addCart, getCart, getCartTotal } from "../utils/cart";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import Loader from "../compenents/Loader";

export default function CheckoutPage(){
    const location = useLocation()
    const [cart,setCart] = useState(location.state)
    const [isLoading,setIsLoading] = useState(false)
    const [isToggel,setIsToggel] = useState(false)
    const navigate = useNavigate()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [address,setAddress] = useState()
    const [phone,setPhone] = useState()

    async function handleOrder(){

    try{
        setIsLoading(true)
        const token = localStorage.getItem("token")
        if (token==null) {
            toast.error("Please login first")
            navigate('/login')
            return
        }

        const items = []

        cart.forEach(
            (item)=>{
                items.push(
                    {
                        productId : item.productId,
                        quantity : item.quantity
                    }
                )
            }
        )

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,
            {
                name : name,
                email : email,
                phone : phone,
                address : address,
                items : items
            },
            {
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }
        )
        toast.success("Order saved succsessfully")
        setIsLoading(false)
        setIsToggel(false)
    }catch(err){
        toast.error("Order is not saved")
        console.log(err)
        setIsLoading(false)
        setIsToggel(false)
    }

    }
    
    return(
        <div className="w-full h-screen flex flex-col bg-[url(home.jpg)]">
            {isLoading && <Loader/>}
            <div className="w-full h-[100px] hidden lg:flex"><Header/></div>
            <div className="w-full h-[calc(100%-100px)] flex overflow-y-scroll">
                <div className="lg:w-[80%] w-full h-full flex">
                    <div className="w-full h-full pl-6">
                    {
                        cart.map(
                            (item,index)=>{
                                return(
                                    <div key={index} className="w-[90%] h-[100px] shadow-2xl my-5 rounded-2xl flex justify-between bg-white overflow-hidden">
                                        <img className="h-full aspect-square rounded-l-2xl object-cover" src={item.image}></img>
                                        <div className="w-[400px] h-full gap-10 flex flex-col">
                                            <h1 className="text-2xl font-bold font-mono relative hover:[&_.tooltip]:opacity-100"><span className="text-[15px] top-[25px] opacity-0 tooltip absolute bg-[#83AF9B] rounded-2xl">{item.name}</span>
                                                {
                                                    item.name.length>25 ? item.name.substring(0,25)+"..." : item.name
                                                }
                                            </h1>
                                            <h1 className={item.price<item.labeledPrice?"font-mono":"hidden"}>Labeled Price : <span className="line-through font-mono">LKR {item.labeledPrice.toFixed(2)}</span></h1>
                                        </div>
                                        <div className="h-full flex justify-center items-center">
                                            <h1 className="text-xl font-mono">LKR {item.price.toFixed(2)}</h1>
                                        </div>
                                        <div className="items-center flex flex-col justify-center mx-3 ">
                                            <IoIosArrowUp className="cursor-pointer hover:scale-150" 
                                            onClick={
                                                ()=>{
                                                    addCart(item,1)
                                                    const newCart = getCart()
                                                    setCart(newCart)
                                                }
                                            }
                                            />
                                            <h1>{item.quantity}</h1>
                                            <IoIosArrowDown className="cursor-pointer hover:scale-150"
                                            onClick={
                                                ()=>{
                                                    addCart(item,-1)
                                                    const newCart = getCart()
                                                    setCart(newCart)
                                                }
                                            }
                                            />
                                        </div>
                                        
                                    </div>
                                )
                            }
                        )
                    }
                    </div>

                </div>
                    <div className="w-full h-[100px] lg:hidden bg-amber-50 fixed bottom-0 items-center flex justify-between">
                        <h1 className="text-2xl">Total : LKR {getCartTotal().toFixed(2)}</h1>
                        <button className="w-[150px] h-[50px] bg-[#83AF9B] rounded-2xl hover:rounded-full active:bg-[#6d9080] font-semibold font-mono" onClick={()=>{setIsToggel(true)}}><h1>Order Now</h1></button>

                        {
                                isToggel&&<div className="w-full h-screen fixed bg-black/35 top-0 left-0 flex items-center justify-center">
                                    <div className="w-[500px] h-[80%] bg-white rounded-2xl flex flex-col items-center justify-center relative">
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">Name</label>
                                            <input className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setName(e.target.value)}}></input>
                                        </div>
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">E-mail</label>
                                            <input className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setEmail(e.target.value)}}></input>
                                        </div >
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">Phone</label>
                                            <input className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setPhone(e.target.value)}}></input>
                                        </div>
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">Address</label>
                                            <textarea className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setAddress(e.target.value)}}></textarea>
                                        </div>
                                        <RxCross2 onClick={()=>{setIsToggel(false)}} className="text-2xl absolute top-1 right-1 text-red-600 cursor-pointer"/>
                                            <button className="w-[150px] h-[50px] bg-[#83AF9B] rounded-2xl hover:rounded-full active:bg-[#6d9080] font mono font-semibold my-7" onClick={handleOrder}>Create Order</button>
                                    </div>
                                    
                                </div>
                            }

                    </div>
            

                <div className="w-[20%] h-full flex items-center justify-center hidden lg:flex">
                    <div className="w-[25%] h-[35%] shadow-2xl fixed rounded-2xl flex items-center justify-center flex-col right-3 gap-5 bg-white hidden lg:flex"> 
                        <div className="w-full flex items-center flex-col">
                            
                            <h1></h1>
                            <h1 className="text-3xl font-mono my-3">Total : <span className="text-red-400">LKR {getCartTotal().toFixed(2)}</span></h1>
                        </div>

                        <div className="flex w-full h-[100px] justify-center items-center ">
                            
                            <button className="w-[150px] h-[50px] bg-[#83AF9B] rounded-2xl hover:rounded-full active:bg-[#6d9080] font-semibold font-mono" onClick={()=>{setIsToggel(true)}}><h1>Order Now</h1></button>

                            {
                                isToggel&&<div className="w-full h-screen fixed bg-black/35 top-0 left-0 flex items-center justify-center">
                                    <div className="w-[500px] h-[80%] bg-white rounded-2xl flex flex-col items-center justify-center relative">
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">Name</label>
                                            <input className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setName(e.target.value)}}></input>
                                        </div>
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">E-mail</label>
                                            <input className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setEmail(e.target.value)}}></input>
                                        </div >
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">Phone</label>
                                            <input className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setPhone(e.target.value)}}></input>
                                        </div>
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <label className="font-mono text-xl">Address</label>
                                            <textarea className="w-[80%] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setAddress(e.target.value)}}></textarea>
                                        </div>
                                        <RxCross2 onClick={()=>{setIsToggel(false)}} className="text-2xl absolute top-1 right-1 text-red-600 cursor-pointer"/>
                                            <button className="w-[150px] h-[50px] bg-[#83AF9B] rounded-2xl hover:rounded-full active:bg-[#6d9080] font mono font-semibold my-7" onClick={handleOrder}>Create Order</button>
                                    </div>
                                    
                                </div>
                            }
                            
                        </div>

                    </div>
                    
                </div>
            </div>

        </div>
    )
}