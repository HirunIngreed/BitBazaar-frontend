import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Products from "../client/Product";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProductOverviewPage from "./ProductOverviewPage";
import ProductByCategory from "../client/ProductByCategory";
import AboutPage from "./AboutPage";
import ContactUsPage from "./ContactUsPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import FogeTPassword from "./FogetPassword";
import ReviewPage from "./ReviewsPage";


export default function AppRoutes(){
    return(
        <>
            
            <Routes>
                
                <Route path="/*" element={<HomePage/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/admin/*" element={<AdminPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>  
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                <Route path="/category/:category" element={<ProductByCategory/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/contact" element={<ContactUsPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/cart/checkout" element={<CheckoutPage/>}/>
                <Route path="/fogetPassword" element={<FogeTPassword/>}/>
                <Route path="/reviews" element={<ReviewPage/>}/>
            </Routes>
        </>
    )   
}