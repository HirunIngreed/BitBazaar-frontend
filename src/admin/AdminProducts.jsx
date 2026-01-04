import axios from "axios"
import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import DeleteProduct from "../compenents/ProductDelete"
import { AiFillPlusSquare } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"


export default function AdminProducts(){

    const[products,setProducts] = useState([])
    const [isLoding,setLoding] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`).then((res)=>{
            setProducts(res.data.products)
            setLoding(false)
        }).catch((err)=>{
            console.log(err)
            setLoding(false)
        })
        
    },[isLoding])

    return(
        <div className="w-full h-screen overflow-y-scroll flex items-center justify-center ">
                <div className="w-[95%] h-[95%] rounded-2xl lg:overflow-y-auto bg-gray-300 overflow-x-scroll">
                    {
                    products.length==0&&
                    <div className="w-full h-full flex items-center justify-center text-2xl font-mono">
                        No Products Found
                    </div>
                    }
                    <Link className="text-4xl fixed bottom-3 right-3 cursor-pointer " to="/admin/add-products"><AiFillPlusSquare /></Link>
                    <table className="w-full ">
                        <thead className="font-mono">
                            <tr className="lg:text-2xl text-1">
                                <th>Name</th>
                                <th>Product ID</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                products.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.productId}</td>
                                        <td><img src={item.images[0]} className="w-[50px] h-[50px]"/></td>
                                        <td>{item.category}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.price}</td>
                                        <td><div className="flex flex-row justify-center"><DeleteProduct productId={item.productId} reload={()=>{setLoding(true)}}/><FaRegEdit onClick={()=>{navigate("/admin/update",{state : item})}} className="mx-1.5 text-blue-600 text-2xl cursor-pointer" /></div></td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    )
}