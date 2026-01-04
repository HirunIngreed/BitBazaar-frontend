import { useState } from "react";
import Header from "../compenents/Header";
import { addCart, getCart, getCartTotal } from "../utils/cart";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

export default function CartPage(){
    const [cart,setCart] = useState(getCart())
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    return(
        <div className="w-full h-screen flex flex-col bg-[url('/home.jpg')]">
            <IoArrowBackSharp className="text-2xl fixed top-3.5 left-3.5 z-50 lg:hidden" onClick={()=>{navigate("/")}}/>
            <div className="w-full h-[100px] hidden lg:flex"><Header/></div>
            <div className="w-full h-[calc(100%-100px)] lg:flex-row overflow-y-scroll flex flex-col  items-center">
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
                        <h1 className="text-2xl">Total :LKR {getCartTotal().toFixed(2)}</h1>
                        <button className="w-[150px] h-[50px] bg-[#83AF9B] rounded-2xl hover:rounded-full active:bg-[#6d9080] font-semibold font-mono" onClick={()=>{navigate('/cart/checkout',{state : cart})}}>{isLoading ? <div className="w-[35px] h-[35px] border-2 border-t-transparent animate-spin rounded-full"></div> : <h1>Chechout</h1>}</button>
                    </div>
            

                <div className="w-[20%] h-full flex items-center justify-center">



                    <div className="w-[25%] h-[35%] shadow-2xl fixed rounded-2xl flex items-center justify-center flex-col right-3 gap-5 bg-white hidden lg:flex"> 
                        <div className="w-full flex items-center flex-col">
                            <h1 className="text-2xl font-mono my-3 lg:flex">Your cart has {cart.length}<br/> unique products and {cart.reduce((all,item)=>{return ( all + item.quantity )}, 0)}<br/> total items.</h1>
                            <h1></h1>
                            <h1 className="text-3xl font-mono my-3">Total :  <span className="text-red-400">LKR {getCartTotal().toFixed(2)}</span></h1>
                        </div>

                        <div className="flex w-full h-[100px] justify-center items-center ">
                            <button className="w-[150px] h-[50px] bg-[#83AF9B] rounded-2xl hover:rounded-full active:bg-[#6d9080] font-semibold font-mono" onClick={()=>{navigate('/cart/checkout',{state : cart})}}>{isLoading ? <div className="w-[35px] h-[35px] border-2 border-t-transparent animate-spin rounded-full"></div> : <h1>Checkout</h1>}</button>
                        </div>

                    </div>
                    
                </div>
            </div>

        </div>
    )
}