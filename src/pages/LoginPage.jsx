import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { IoLogoGoogle } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"

export default function LoginPage (){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin({
        onSuccess:(response) => {
            setIsLoading(true)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/googleLogin`,{
                token : response.access_token
            }).then(
                (res)=>{
                    localStorage.setItem('token',res.data.token)
                    if (res.data.role == "admin") {
                        navigate("/admin")
                    }else{
                        navigate("/")
                    }
                    toast.success("Login successful")
                    setIsLoading(false)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                    setIsLoading(false)
                    toast.error("Login failed")
                }
                
            )
            
        },
        onNonOAuthError: ()=>{toast.error("Google login failed")}
    })
    
    async function handleLogin(){
        try{
        setIsLoading(true)
        if (!email || !password) {
            toast.error("Please fill in both email and password.")
            setIsLoading(false)
            return
        }
         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,{
            email : email,
            password : password
        })
        toast.success(response.data.message)
        localStorage.setItem("token",response.data.token)
        setIsLoading(false)
        if (response.data.role=="admin") {
            navigate("/admin")
            console.log(response)
        }else{
            navigate("/")
            console.log(response)
        }
        
    }catch(err){
        console.log(err)
        setIsLoading(false)
        toast.error("Login failed")
    }
    }

    return(
        <div className="w-full h-screen bg-[url(/login.jpg)] bg-cover bg-center flex">

            <div className="w-full h-full bg-black/45 flex">
            

                <div className="w-[50%] h-full hidden lg:flex">

                </div>

                <div className="w-full lg:w-1/2 h-full flex items-center justify-center">

                    
                    <div className="w-[450px] h-[510px] rounded-3xl bg-white/70 backdrop-blur-2xl shadow-2xl backdrop:brightness-200 flex flex-col items-center justify-center gap-4">

                        <div className="w-full h-[100px]">
                            <h1 className="text-[#406036] text-5xl font-bold text-center">Login</h1>
                        </div>

                        <input 
                        className="lg:w-[300px] lg:h-[45px] w-[80%] h-[45px] border rounded-xl text-center hover:rounded-full outline-1" 
                        placeholder="E-mail"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        ></input>

                        <input className="lg:w-[300px] lg:h-[45px] w-[80%] h-[45px] border rounded-xl text-center hover:rounded-full outline-1" 
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password"
                        ></input>

                        <button 
                        className="lg:w-[200px] lg:h-[45px] w-[50%] h-[45px] bg-[#406036] rounded-xl active:bg-[#2a3f24] cursor-pointer text-white font-bold text-xl outline-1 flex items-center justify-center hover:rounded-full"
                        onClick={handleLogin}
                        disabled={isLoading}
                        >{isLoading ? <div className="w-[35px] h-[35px] border-2 border-t-transparent animate-spin rounded-full"></div> : <h1>Login</h1>}</button>

                        <button className="lg:w-[250px] lg:h-[45px] w-[50%] h-[45px] bg-[#406036] rounded-xl active:bg-[#2a3f24] cursor-pointer text-white font-bold text-xl outline-1 flex items-center justify-center hover:rounded-full mx-4" onClick={googleLogin}>Login with  <IoLogoGoogle className="mx-4"/>
                            </button>
                            <h1 className="text-black text-[15px]"> <Link to = "/fogetPassword" className="font-bold hover:underline" >Forget Password</Link></h1>
                    </div>
                </div>

                </div>

        </div>
    )
}