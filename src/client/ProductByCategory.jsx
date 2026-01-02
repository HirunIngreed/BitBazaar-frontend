import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../compenents/Header"
import Loader from "../compenents/Loader"
import ProductCard from "../compenents/ProductCard"
import toast from "react-hot-toast"

export default function ProductByCategory(){
    const params = useParams()
    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(
        ()=>{
            setIsLoading(true)
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/category/${params.category}`).then(
                (res)=>{
                    setProducts(res.data.products)
                    setIsLoading(false)
                }
            ).catch(
                (err)=>{
                    toast.error("Error. Please try again")
                    setIsLoading(false)
                }
            )
        },[]
    )
    return(
        <div className="w-full h-screen overflow-y-scroll flex flex-col">
        {
            isLoading&&<Loader/>
        }

        
            <div className="flex hidden lg:flex"><Header /></div>
        
                <div className="w-full h-[calc(100%-100px)] flex flex-wrap items-center justify-center ">
                    {products.length<=0?<div className="w-full h-full flex items-center justify-center"><h1 className="text-2xl flex">No products found in this category</h1></div>:
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