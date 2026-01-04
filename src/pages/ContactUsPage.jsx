import { useState } from "react";
import Header from "../compenents/Header";
import axios from "axios";
import toast from "react-hot-toast";
import { IoArrowBackSharp } from "react-icons/io5";

export default function ContactUsPage(){
    const[firstName,setFirstName] = useState("")
    const[lastName,setLastName] = useState("")
    const[email,setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    async function handleSubmit(){
        try {
            setIsLoading(true)
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/message`,{
                firstName:firstName,
                lastName:lastName,
                email:email,
                message:message
            })
            toast.success("Your message is submitted")
            setIsLoading(false)
        } catch (error) {
            toast.error("Message is not submitted")
             setIsLoading(false)
        }
    } 

    return(
        <div className="w-full h-screen flex flex-col bg-[url('/home.jpg')]">
            <IoArrowBackSharp className="text-2xl fixed top-3.5 left-3.5 z-50 lg:hidden" onClick={()=>{navigate("/")}}/>
            <div className="hidden lg:flex"><Header/></div>

            <div className="w-full h-[calc(100vh-100px)] flex lg:flex-row flex-col">
                <div className="lg:w-[50%] w-full h-full flex items-center justify-center flex-col">
                    <h1 className="text-3xl font-bold font-mono">Contact us</h1>
                    <h1 className="text-xl p-3 font-mono">Need to get in touch with us? Either fill out the form with your inquiry or
                        find the department E-mail you'd like to contact below.
                    </h1>
                </div>

                <div className="lg:w-[50%] w-full h-full flex items-center justify-center">
                    <div className="w-[400px] h-[325px] bg-white shadow-2xl rounded-2xl flex flex-col gap-3 p-3">
                        <div className="flex justify-between">
                            <div>
                                <label className="font-mono">First Name</label>
                                <input className="w-[175px] h-[45px] border focus:border-2 rounded-xl text-center p-3 font-mono" onChange={(e)=>{setFirstName(e.target.value)}}></input>
                            </div>
                            <div>
                                <label className="font-mono">Last Name</label>
                                <input className=" border focus:border-2 w-[175px] h-[45px] rounded-xl text-center p-3 font-mono" onChange={(e)=>{setLastName(e.target.value)}}></input>
                            </div>
                        </div>
                        <div>
                            <label className="font-mono">E-mail</label>
                            <input className=" border focus:border-2 w-full h-[45px]  rounded-xl text-center p-3" placeholder="Please use the same email used for entry " onChange={(e)=>{setEmail(e.target.value)}}></input>
                        </div>
                        <label className="font-mono">What can we help you with?</label>
                        <textarea className=" border focus:border-2 w-full h-[45px]2 rounded-xl text-center font-mono" onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                        <button className="w-[100px] h-[45px] bg-[#83AF9B] rounded-xl cursor-pointer active:bg-[#759a8a] font-mono flex items-center justify-center"  onClick={handleSubmit}>{isLoading ? <div className="w-[35px] h-[35px] border-2 border-t-transparent animate-spin rounded-full"></div> : <h1>Submit</h1>}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}