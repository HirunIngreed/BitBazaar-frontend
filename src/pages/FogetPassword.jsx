import axios, { Axios } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function FogeTPassword(){
    const [isLoading,setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [otp,setOtp] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [isLoaded,setIsLoaded] = useState(false)
    const navigate = useNavigate()

    function handleGetOtp(){
        setIsLoading(true)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP/${email}`).then(
            (res)=>{
                toast.success("OTP is sent")
                setIsLoading(false)
            }
        ).catch(
            (err)=>{
                toast.error("OTP is not sent")
                setIsLoading(false)
            }
        )
    }

    function handleChangePassword(){
        setIsLoaded(true)
        if (password != confirmPassword) {
           toast.error("Password is not mached")
           setIsLoaded(false)
           return
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/changePassword`,{
            otp : otp,
            newPassword : password,
            email :email
        }).then(
            (res)=>{
                toast.success("Your password is successfully changed")
                setIsLoaded(false)
                navigate('/login')
            }
        ).catch(
            (err)=>{
                toast.error("Password is not changed")
                setIsLoaded(false)
            }
        )
    }

    return(
        <div className="w-full h-screen flex bg-[url(home.jpg)] items-center justify-center">
            <div className="lg:w-[600px] lg:h-[650px] w-[99%] h-[99%] bg-white rounded-2xl shadow-2xl flex items-center justify-center flex-col gap-7">
                <div className="flex flex-col items-center">
                    <label className="text-xl font-mono">Enter your email</label>
                    <input value={email} className="lg:w-[400px] h-[50px] w-[80%] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>
                <button disabled={isLoading} className="w-[200px] h-[50px] w-[80%] rounded-2xl hover:rounded-full bg-[#83AF9B] active:bg-[#69887a] flex items-center justify-center" onClick={handleGetOtp}>{isLoading ? <div className="w-[30px] h-[30px] rounded-full border-4 border-transparent border-t-gray-300 animate-spin"></div>:<h1 className="font-mono">Get OTP</h1>}</button>
                <div className="flex flex-col items-center">
                    <label  className="text-xl font-mono">Enter OTP</label>
                    <input className="lg:w-[400px] h-[50px] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setOtp(e.target.value)}}></input>
                </div>
                <div className="flex flex-col items-center">
                    <label  className="text-xl font-mono">Enter new password</label>
                    <input value={password} type="password" className="lg:w-[400px] h-[50px] w-[80%] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <label  className="text-xl font-mono">Re-enter password to confirme it</label>
                    <input value={confirmPassword} type="password" className="lg:w-[400px] h-[50px] w-850%] border focus:border-2 rounded-2xl text-center" onChange={(e)=>{setConfirmPassword(e.target.value)}}></input>
                </div>
                <button disabled={isLoading} className="w-[200px] h-[50px] rounded-2xl hover:rounded-full bg-[#83AF9B] active:bg-[#69887a] flex items-center justify-center" onClick={handleChangePassword}>{isLoaded ? <div className="w-[30px] h-[30px] rounded-full border-4 border-transparent border-t-gray-300 animate-spin"></div>:<h1 className="font-mono">Change Password</h1>}</button>
            </div>

        </div>
    )
}