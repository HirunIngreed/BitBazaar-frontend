import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

export default function RegisterPage(){

    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [address,setAddress] = useState("")
    const [isLoading,setIsLoading]= useState(false)

    async function handleRegister(){

        

    try{
        
        if (password != confirmPassword) {
            toast.error("Oops! Your confirmation doesn’t match the password.")
            
            return
        }

        if (!firstName || !lastName || !email || !password ||!confirmPassword || !address) {
            toast.error("Please, fill all fields." )
            
            return
        }
        setIsLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`,{
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            email : email.trim(),
            password : password.trim(),
            
        })
        toast.success(response.data.message)
        setIsLoading(false)
    
        
    
    }catch(error){
        console.log(error)
        toast.error("User is not added.")
        setIsLoading(false)
    }finally{
        setIsLoading(false)
    }
}


    return(
        <div className="w-full h-screen bg-[url(/login.jpg)] bg-cover bg-center flex">

            <div className="w-full h-full bg-black/45 flex">

                <div className="w-full h-full lg:w-1/2 flex items-center justify-center">

                <div className="w-[450px] h-[525px] rounded-3xl bg-white/70 backdrop-blur-2xl shadow-2xl backdrop:brightness-200 flex flex-col items-center justify-center gap-4">

                <h1 className="text-[#406036] text-5xl font-bold text-center">Register</h1>
                    
                    <input
                    className="w-[300px] h-[45px] rounded-xl border text-center hover:rounded-full outline-1"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e)=>{setFirstName(e.target.value)}}
                    ></input>

                    <input
                    className="w-[300px] h-[45px] rounded-xl border text-center hover:rounded-full outline-1"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e)=>{setLastName(e.target.value)}}
                    ></input>

                    <input
                    className="w-[300px] h-[45px] rounded-xl border text-center hover:rounded-full outline-1"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    ></input>

                    <input
                    className="w-[300px] h-[45px] rounded-xl border text-center hover:rounded-full outline-1"
                    placeholder="Password"
                    value={password}
                    type = "password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    ></input>

                    <input
                    className="w-[300px] h-[45px] rounded-xl border text-center hover:rounded-full outline-1"
                    placeholder="Comfirm Password"
                    value={confirmPassword}
                    type = "password"
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    ></input>

                    <input
                    className="w-[300px] h-[45px] rounded-xl border text-center hover:rounded-full outline-1"
                    placeholder="Address"
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                    ></input>

                    <button 
                        className="lg:w-[200px] lg:h-[45px] w-[50%] h-[45px] bg-[#406036] rounded-xl active:bg-[#2a3f24] cursor-pointer text-white font-bold text-xl outline-1 flex items-center justify-center hover:rounded-full"
                        onClick={handleRegister}
                        disabled={isLoading}
                    >{isLoading ? <div className="w-[35px] h-[35px] border-2 border-t-transparent animate-spin rounded-full"></div> : <h1>Register</h1>}</button>

                    <h1 className="text-black text-[15px]">Have already an account? <Link to = "/login" className="font-bold hover:underline" >Login</Link></h1>

                </div>

            </div>

            <div className="w-[50%] hidden lg:h-full lg-flex"></div>

            </div>

        </div>
    )
}
