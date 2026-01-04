import { AiFillPlusSquare } from "react-icons/ai";
import Header from "../compenents/Header";
import { useEffect, useState } from "react";
import AddReviews from "../compenents/AddReviews";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewPage(){
    const [reviews,setReviews] = useState([])
    const [isToggel,setIsToggel]= useState(false)

    useEffect(
        ()=>{
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`).then(
                (res)=>{
                    setReviews(res.data.reviews)
                }
            ).catch(
                (err)=>{
                    toast.error("Error loading reviews")
                }
            )
        }
    ),[]

    return(
        <div className="w-full h-screen bg-[url(/home.jpg)] flex-row">
            <AiFillPlusSquare className="text-5xl fixed bottom-5 right-5 cursor-pointer" onClick={()=>{setIsToggel(true)}}/>
            {
                isToggel && <AddReviews toggel={()=>{setIsToggel(false)}}/>
            }
            <div className="w-full h-[100px] flex hidden lg:flex">
                <Header/>
            </div>

            <div className="w-full h-[calc(100%-100px)] flex items-center justify-center overflow-y-scroll">
                <div className="w-[90%] h-[90%] my-10">
                    {
                        reviews.map(
                            (item,index)=>{
                                return(
                                    <div key={index} className="w-full h-[300px] shadow-2xl bg-white rounded-2xl my-10">
                                        <div className="w-full h-[50px] flex items-center">
                                            <img className="w-[50px] h-[50px] rounded-full" src={item.image}/>
                                            <h1 className="text-2xl font font-semibold font-mono px-5">{item.firstName+" "+item.lastName}</h1>
                                        </div>
                                        <h1 className="text-xl text-center">{item.reviewString}</h1>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>

        </div>
    )
}