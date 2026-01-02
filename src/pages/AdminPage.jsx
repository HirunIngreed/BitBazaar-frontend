import { AiOutlineProduct } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { Link, Route, Routes } from "react-router-dom";
import { IoIosStarOutline } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useState } from "react";
import AdminProducts from "../admin/AdminProducts";
import AdminOrders from "../admin/AdminOrders";
import AdminUsers from "../admin/AdminUsers";
import AddProducts from "../admin/AdminAddProducts";
import AdminOderOverview from "../admin/AdminOrderOverview";
import AdminUpdateProducts from "../admin/AdminUpdateProducts";
import { MdOutlineMessage } from "react-icons/md";
import AdminMessages from "../admin/AdminMessages";
import axios from "axios";
import Loader from "../compenents/Loader";


export default function AdminPage (){

    const [isToggel,setIsToggel] = useState(false)
    const [user,setUser] = useState(null)

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if (!token) {
                window.location.href='/'
                return
            }
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/find`,{
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(
                (res)=>{
                    if (res.data.role=="admin") {
                        setUser(res.data)
                    }else{
                        window.location.href = '/'
                    }
                }
            ).catch(
                (err)=>{
                    window.location.href = '/login'
                }
            )
        }
    )

    return(
        
        <div className="w-full h-full flex relative">
            {!user?<Loader/>:
                <>
            
                    <div className={"flex w-full lg:bg-white h-full fixed "+(isToggel?"bg-black/35 transition-colors duration-500":"")}>
                        


                        <div className={`w-[300px] h-full lg:h-full lg:left-0 lg:flex bg-[#83AF9B] flex flex-col gap-4 absolute transition-all duration-500 rounded-tr-xl rounded-br-xl
                            ${isToggel ? "left-0" : "left-[-300px]"}`
                            }>

                                <SlOptionsVertical
                            className="fixed top-3.5 left-3.5 text-black cursor-pointer text-2xl lg:hidden"
                            onClick={() => setIsToggel(!isToggel)}></SlOptionsVertical>

                            <div className="w-full aspect-square">
                                
                            </div>

                            <Link to="/admin" onClick={()=>{setIsToggel(false)}} className="flex items-center justify-center text-xl font-mono"><AiOutlineProduct className="align-middle"/>Products</Link>
                            <Link to="/admin/users" onClick={()=>{setIsToggel(false)}} className="flex items-center justify-center text-xl font-mono"><FiUsers className="align-middle"/>Users</Link>
                            <Link to="/admin/orders" onClick={()=>{setIsToggel(false)}} className="flex items-center justify-center text-xl font-mono"><CiBoxList className="align-middle"/>Orders</Link>
                            <Link to="/admin/messages" onClick={()=>{setIsToggel(false)}} className="flex items-center justify-center text-xl font-mono"><MdOutlineMessage className="align-middle"/>Messages</Link>
                            
                        </div>

                    </div>
                    <div className="lg:w-[calc(100vw-300px)] lg:fixed top-0 left-[300px] w-full items-center justify-center flex">
                        <Routes>
                            <Route path="/" element={<AdminProducts/>}/>
                            <Route path="/users" element={<AdminUsers/>}/>
                            <Route path="/orders" element={<AdminOrders/>}/>
                            <Route path="/add-products" element={<AddProducts/>}/>
                            <Route path="/orders/orderoverview" element={<AdminOderOverview/>}/>
                            <Route path="/update" element={<AdminUpdateProducts/>}/>
                            <Route path="/messages" element={<AdminMessages/>}/>
                        </Routes>
                    </div>
                </>
        }
        </div>
    )
}