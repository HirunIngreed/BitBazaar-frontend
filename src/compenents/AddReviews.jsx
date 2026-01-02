import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export default function AddReviews(props){
    const toggel = props.toggel
    const [review,setReview] = useState("")
    const [buttonLoded, setIsButtonLoaded]=useState(false)

    async function handleReviews(){
        try {
            setIsButtonLoaded(true)
            const token = localStorage.getItem("token")

            if (review == "") {
                return toast.error("Please give atleast five characters before submittind")
            }

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`,{review:review},{
                headers : {
                    "Authorization" : "Bearer "+token
                }
            })
            toast.success("Submitted")
            setIsButtonLoaded(false)
            toggel()
        } catch (error) {
            toast.error("Submit is failed")
            setIsButtonLoaded(false)
            toggel()
        }
    }
    return(
        <div className="w-full h-screen fixed bg-black/35 top-0 left-0 flex items-center justify-center">
            <div className="w-[60%] h-[60%] rounded-2xl bg-white flex items-center justify-center relative">
                <RxCross2  className="text-3xl hidden lg:flex text-red-600 absolute top-1 right-1 cursor-pointer hover:scale-130" onClick={()=>{toggel()}}/>
                <textarea placeholder="Add your thoughts" className="w-[70%] h-[70%] border rounded-xl focus:border-2 text-center p-5 font-mono" 
                onChange={(e)=>{setReview(e.target.value)}}
                >

                </textarea>
                <button disabled={buttonLoded} className="w-[100px] h-[50px] rounded-2xl bg-[#83AF9B] active:bg-[#6a8c7c] hover:rounded-full absolute bottom-2 flex items-center justify-center cursor-pointer" onClick={handleReviews} >{buttonLoded?<div className="w-[30px] h-[30px] rounded-full border-2 border-transparent border-t-black/55 animate-spin"></div>:<h1>Submit</h1>}</button>
            </div>
        </div>
    )
}