import { useEffect, useState } from "react";
import Header from "../compenents/Header";
import ImageSlider from "../compenents/Imageslider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../compenents/Loader";
import toast from "react-hot-toast";
import { addCart, getCart } from "../utils/cart";

export default function ProductOverviewPage(){
    const params = useParams()
    const [product,setProduct] = useState(null)
    const [status,setStatus] = useState("loading")
    const navigate = useNavigate()
    
    useEffect(
        ()=>{
            if(status=="loading"){
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${params.productId}`).then(
                (res)=>{
                    setProduct(res.data.product)
                    setStatus("success")
                    
                }
                ).catch(
                    (err)=>{
                        toast.error("Product not found")
                        setStatus("error")
                    }
                )
            }
        },[]
    )
    return(
        <div className="w-full overflow-y-scroll">
            {status == "loading"&&<Loader/>}
            {status == "error"&&<h1>Product is not found</h1>}

            {status == 'success'&&
                <div className="w-full h-full flex flex-col">
                <div className="hidden lg:flex"><Header/></div>
                <div className="h-[calc(100vh-100px)] w-full lg:flex-row flex flex-col ">
                    
                    <div className="lg:w-[50%] w-full h-full flex items-center justify-center gap-4">
                        <div className="lg:w-[calc(100%-50px)] lg:h-[calc(100%-50px)] w-full hfull flex items-center justify-center flex-col shadow-2xl">
                            <ImageSlider images={product.images}/> 
                        </div>
                    </div>

                    <div className="lg:w-[50%] h-full w-full flex items-center flex-col gap-4 justify-center ">
                        <div className="w-[calc(100%-50px)] h-[calc(100%-50px)] flex items-center justify-center flex-col shadow-2xl">
                            <div className="w-full h-[100px] flex justify-center items-center flex-col">
                                <h1 className="text-4xl font-mono font-semibold text-center flex">{product.name}</h1>
                                <h1 className="text-2xl font-mono">{product.altNames.join("/")}</h1>
                            </div>
                            <div className="w-full h-[70px] flex flex-col items-center justify-center">
                                <h1 className="flex text-xl font-mono line-through">LKR {product.labeledPrice.toFixed(2)}</h1>
                                <h1 className="flex text-3xl font-mono text-red-500">LKR {product.price.toFixed(2)}</h1>
                            </div>
                            <div>
                                <div className={"w-[60px] h-[45px] bg-red-300 flex items-center justify-center rounded-xl "+(product.price > product.labeledPrice&& "hidden")}>
                                    <h1 className="text-xl text-red-600">
                                        -{
                                            product.price < product.labeledPrice && parseInt((product.price/product.labeledPrice) *100 )
                                        }%
                                    </h1>
                                </div>
                            </div>
                            <div className="w-full h-[300px] flex justify-center flex-col items-center">
                                <div>
                                    <h1 className="text-xl "><span className="font-semibold font-mono">Brand : </span>{product.brand}</h1>
                                    <h1 className="text-xl "><span className="font-semibold font-mono">Model : </span>{product.model}</h1>
                                    <h1 className="text-xl "><span className="font-semibold font-mono">Category : </span>{product.category}</h1>
                                    <div className={"w-[100px] border rounded-xl flex justify-center "+(product.isAvailable==true?"border-green-600 " : "border-red-600")}>
                                        {
                                            product.isAvailable==true?<h1 className="text-green-600">in stock</h1> : <h1 className="text-red-600">out of stock</h1>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <button className="w-[100px] h-[50px] bg-[#406036] rounded-xl active:bg-[#2a3f24] cursor-pointer text-white font-bold text-[15px] outline-1 flex items-center justify-center hover:rounded-ful mx-10 hover:rounded-full" onClick={
                                    ()=>{
                                        navigate('/cart/checkout',{state : [{name:product.name,
                                                                            productId:product.productId,
                                                                            price : product.price,
                                                                            labeledPrice:product.labeledPrice,
                                                                            quantity : 1,
                                                                            image : product.images[0]
                                        }]})
                                    }
                                }>Buy Now</button>
                                <button className="w-[100px] h-[50px] bg-gray-700 rounded-xl active:bg-gray-800 cursor-pointer text-white font-bold text-[15px] outline-1 flex items-center justify-center hover:rounded-ful mx-10 hover:rounded-full" onClick={
                                    ()=>{
                                        addCart(product,1)
                                    }
                                }>Add to cart</button>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                    <div className="w-full h-[200px] my-4 items-center justify-center flex">
                        <div className="w-[calc(100%-50px)] h-[calc(100%-65px)] shadow-2xl flex items-center justify-center">
                            <p className="font-mono">{product.description}</p>
                        </div>
                    </div>
                
                </div>

                
            }
        </div>
    )
}