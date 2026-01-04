import { useEffect, useState } from "react";
import Header from "../compenents/Header";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../compenents/ProductCard";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Products(){

    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    

    const token = localStorage.getItem("token")

    useEffect(
        ()=>{
            setIsLoading(true)
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`,{
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(
                (response)=>{setProducts(response.data.products)
                            setIsLoading(false)
                }
            ).catch(
                (err)=>{
                    toast.error("Products loading is failed.")
                    setIsLoading(false)
                }
            )
        },[]
    )

    return(
        <div className="w-full h-screen">
            <IoArrowBackSharp className="text-2xl fixed top-3.5 left-3.5 z-50 lg:hidden" onClick={()=>{navigate("/")}}/>
            <div className="flex  lg:flex flex-col ">
                <div className="hidden lg:flex"><Header /></div>
                <div className="w-full h-[50px] flex items-center justify-center sticky top-0">
                    <input className="w-[400px] h-[30px] border border-gray-400 text-center" placeholder="Search products" onChange={async (e)=>{
                        if(e.target.value==""){y
                            setIsLoading(true)
                            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`,{
                                headers : {
                                    "Authorization" : "Bearer "+token
                                }
                            }).then(
                                (response)=>{setProducts(response.data.products)
                                            setIsLoading(false)
                                }
                            ).catch(
                                (err)=>{
                                    toast.error("Products loading is failed.")
                                    setIsLoading(false)
                                }
                            )
                        }else{
                            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/search/${e.target.value}`).then(
                                (response)=>{setProducts(response.data.products)
                                            setIsLoading(false)
                                }
                            ).catch(
                                (err)=>{
                                    toast.error("Products loading is failed.")
                                    setIsLoading(false)
                                }
                            )
                        }
                    }}>
                    
                    </input>
                </div>
            </div>

            <div className="w-full h-[calc(100%-100px)] flex flex-wrap items-center justify-center overflow-y-scroll">
                {
                    products.map(
                        (product,index)=>{
                            return(
                            <ProductCard key={index} products={product}/>
                            )
                        }
                    )
                }
            </div>

         
        </div>
    )
}