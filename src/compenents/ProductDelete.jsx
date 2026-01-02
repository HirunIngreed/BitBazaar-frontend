import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { CgClose } from "react-icons/cg"
import { FiAlertTriangle } from "react-icons/fi"
import { MdOutlineDeleteForever } from "react-icons/md"

export default function DeleteProduct(props){

    const [isLoding,setIsLoading] = useState(false)
    const [isMessageOpen,setIsMessageOpen] = useState(false)
    const productId = props.productId
    const reload = props.reload

       async function handleDelete(){

        setIsLoading(true)

        const token = localStorage.getItem("token")

        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`,
                {headers : {
                    "Authorization" : "Bearer "+token
                }}
            )
            toast.success("Product is deleted successfully")
            reload()
            setIsLoading(false)
            setIsMessageOpen(false)
        } catch (error) {
            console.log(error)
            toast.error("Product is not deleted")
            setIsLoading(false)
            setIsMessageOpen(false)
        }
       }
    return(
        <>
            <MdOutlineDeleteForever onClick={()=>{setIsMessageOpen(true)}} className="mx-1.5 text-red-600 text-2xl cursor-pointer"/>

        {
            isMessageOpen&&
            <div className="w-full h-screen bg-black/35 fixed top-0 left-0 flex items-center justify-center">
                <div className="w-[650px] h-[400px] bg-white flex items-center  flex-col gap-3 rounded-2xl relative">

                    <div>
                        <h1 className="text-5xl">Are you sure?</h1>
                        <h2 className="my-3 text-2xl">Do you really want to delete these product? This process cannot be undone.</h2>
                    </div>

                    <FiAlertTriangle className="text-9xl text-red-600"/>

                    <div className="flex flex-row">
                        <button onClick={handleDelete} className="w-[100px] h-[50px] bg-red-400 rounded-xl mx-20 cursor-pointer active:bg-red-600 flex items-center justify-center">{isLoding?<div className="w-[35px] h-[35px] border-2 border-t-transparent animate-spin rounded-full"></div>:<h1>Yes</h1>}</button>
                        <button onClick={()=>{setIsMessageOpen(false)}} className="w-[100px] h-[50px] bg-blue-400 rounded-xl mx-20 cursor-pointer active:bg-blue-600">No</button>
                    </div>

                    <CgClose onClick={()=>{setIsMessageOpen(false)}} className="text-red-500 text-xl top-3 right-3 absolute cursor-pointer active:outline-1 active:rounded-full"/>
                </div>
            </div>
        }
        </>
    )
}