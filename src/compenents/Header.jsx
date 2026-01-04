import { useState } from "react";
import { BsTruck } from "react-icons/bs";
import { RiShoppingBag2Line } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import OrderReviewCoustomer from "./OrderReviewCostomer";
import UserData from "./UserData";

export default function Header(){

    const navigate = useNavigate()
    const [isToggel,setIsToggel] = useState(false)

    return(
            <>
                <div className="lg:w-full lg:h-[100px] h-full bg-[#83AF9B] rounded-b-xl flex">
                    <img src="/logo.png" className="h-full aspect-square hidden lg:flex"/>

                    <div className="w-[calc(100%-200px)] h-full flex justify-center items-center">
                        <div className="w-[150px] h-full flex items-center justify-center ">
                                <NavLink to="/" className={({isActive})=>`font-mono text-2xl bottom-2 font-bold ${isActive?"underline":""}`}>Home</NavLink>
                        </div>

                        <div className="w-[150px] h-full flex items-center justify-center">
                                <NavLink to="/products" className={({isActive})=>`font-mono text-2xl bottom-2 font-bold ${isActive?"underline":""}`}>Products</NavLink>
                        </div>

                        <div className="w-[150px] h-full flex items-center justify-center">
                                <NavLink to="/about" className={({isActive})=>`font-mono text-2xl bottom-2 font-bold ${isActive?"underline":""}`}>About</NavLink>
                        </div>

                        <div className="w-[150px] h-full flex items-center justify-center">
                                <NavLink to="/contact" className={({isActive})=>`font-mono text-2xl bottom-2 font-bold ${isActive?"underline":""}`}>Contact us</NavLink>
                        </div>
                        <div className="w-[150px] h-full flex items-center justify-center">
                                <NavLink to="/reviews" className={({isActive})=>`font-mono text-2xl bottom-2 font-bold ${isActive?"underline":""}`}>Reviews</NavLink>
                        </div>
                    </div>
                    
                    <div className="flex">
                        <div className="h-full flex items-center font-semibold mx-4">
                            <UserData/>
                        </div>
                        <div className="h-full flex items-center font-semibold">
                            <BsTruck className="text-3xl cursor-pointer" onClick={()=>{setIsToggel(true)}}/>
                        </div>
                        <div className="w-[100px] h-[100px] flex items-center justify-center">
                            <RiShoppingBag2Line className="text-3xl cursor-pointer" onClick={()=>{navigate("/cart")}}/>
                        </div>
                    </div>
                    
                </div>
                {isToggel&&<OrderReviewCoustomer toggel={()=>{setIsToggel(false)}}/>}
            </>
    )
}