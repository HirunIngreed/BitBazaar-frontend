import { useNavigate } from "react-router-dom"
import { addCart } from "../utils/cart"

export default function ProductCard(props){

    const product = props.products
    const navigate = useNavigate()
    


    return(
        <div className="lg:w-[350px] lg:h-[275px] w-[200px] h-[300px] rounded-2xl shadow-2xl  flex  relative flex-col transition duration-500 transform hover:scale-110 m-3 hover:[&_.buttons]:opacity-100">

           <img className="w-full h-[185px] rounded-t-2xl object-cover object-center" src={product.images[0]}/>

           <div className="w-full h-[90px] rounded-b-2xl flex relative">
                <div className="w-[50%] h-full items-center justify-center flex">
                        <h1 className="font-semibold font-mono p-3 overflow-hidden">{product.name}</h1>
                </div>
                <div className="w-[50%] h-full flex items-center justify-center">
                        <h1 className="font-semibold font-mono">LKR {product.price}</h1>
                </div>  
            </div>

            <div className="w-full h-[90px] rounded-b-2xl flex absolute left-0 bottom-0 opacity-0 buttons bg-white">
                <div className="w-full h-full flex items-center justify-center ">
                        <button className="w-[50%] h-[50%] bg-[#83AF9B] hover:rounded-full rounded-xl"onClick={()=>{navigate('/overview/'+product.productId)}}>View More</button>
                </div>
                
            </div>
            
        </div>
    )
}