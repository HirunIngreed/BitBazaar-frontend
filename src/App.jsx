import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./pages/Routes"
import { GoogleOAuthProvider } from "@react-oauth/google"
function App() {


  return (
    <GoogleOAuthProvider clientId="202783816034-9to29ngs05ljfp5hk0cjn88c5jtbotri.apps.googleusercontent.com">
   <BrowserRouter>
   <Toaster position="top-center"/>
      <div className="w-full h-screen">
        <AppRoutes/>
      </div>
   </BrowserRouter>
   </GoogleOAuthProvider>
  )
}

export default App
