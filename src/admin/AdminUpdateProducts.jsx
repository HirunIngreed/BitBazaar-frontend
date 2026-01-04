import { useState } from "react"
import { AiOutlineProduct } from "react-icons/ai"
import { Link, useLocation, useNavigate } from "react-router-dom"
import mediaUpload from "../utils/mediaUpload"
import axios from "axios"
import toast from "react-hot-toast"
import Loader from "../compenents/Loader"

export default function AdminUpdateProducts(){

    const location = useLocation()
    const [name,setName] = useState(location.state.name)
    const [altNames,setAltName] = useState(location.state.altNames.join(","))
    const [description,setDiscription] = useState(location.state.description)
    const [brand,setBrand] = useState(location.state.brand)
    const [category,setCategory] = useState(location.state.category)
    const [isAvailable,setIsAvailable] = useState(location.state.isAvailable)
    const [price,setPrice] = useState(location.state.price)
    const [labeledPrice,setLabeledPrice] = useState(location.state.labeledPrice)
    const [stock,setStock] = useState(location.state.stock)
    const [model,setModel] = useState(location.state.model)
    const [images,setImages] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()


    async function handleUpdateProduct (){
        try {
            setIsLoading(true)

            if(name==location.state.name || altNames==location.state.altNames.join(",") || description==location.state.description || brand==location.state.brand || category==location.state.category || isAvailable==location.state.isAvailable || price==location.state.price || labeledPrice==location.state.labeledPrice || stock==location.state.stock || model==location.state.model || images.length==0){
                toast.error("No changes made to update")
                setIsLoading(false)
                return
            }

            const altNamesArray = altNames.split(",")

            let available
            if (isAvailable == "Yes") {
                available = true
            }else{
                available = false
            }

            const imagesArray = []

            

            for(let i = 0; i<images.length; i++){
                const newImages = await mediaUpload(images[i])
                imagesArray.push(newImages)
            }
            
            let imagesUrls = await Promise.all(imagesArray)
            console.log(imagesUrls)

            if (images.length==0) {
                imagesUrls = location.state.images  
            }

            

            const data = {
                name : name,
                altNames : altNamesArray,
                price : price,
                labeledPrice : labeledPrice,
                description : description,
                category :category,
                isAvailable : available,
                stock : stock,
                brand : brand,
                images : imagesUrls
            }

            const token = localStorage.getItem("token")

            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${location.state.productId}`,data,{
                headers : {
                    "Authorization" : "Bearer "+token
                }
            })
            toast.success("Product updated successfully")
            setIsLoading(false)
            navigate("/admin/products")

            
        } catch (error) {
            toast.error("Product is not updated")
            console.log(error)
            setIsLoading(false)
        }
    }

    return(
        
        <div className="w-full h-screen overflow-y-scroll flex items-start justify-center">

            
            {
             isLoading&&<Loader/>
            }
            

            <div className="bg-[#83AF9B] w-[800px]  p-[40px] rounded-2xl shadow-2xl ">
            <h1 className="text-2xl w-full items-center flex justify-center"><AiOutlineProduct />Update Products</h1>
            <div className="w-full bg-white p-[20px] rounded-xl flex flex-wrap justify-between">

                
                <div className="my-2 w-[40%]">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setName(e.target.value)}}
                    ></input>
                </div>

                <div className="my-2 w-[40%]">
                    <label>Alt Names</label>
                    <input
                        type="text"
                        value={altNames}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setAltName(e.target.value)}}
                    ></input>
                    <p className="text-gray-500 text-right">Separate multiple names with commas</p>
                </div>

                <div className="my-2 w-full">
                    <label>Description</label>
                    <textarea
                        type="text"
                        value={description}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setDiscription(e.target.value)}}
                    ></textarea>
                </div>

                <div className="my-2 w-[40%]">
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setPrice(e.target.value)}}
                    ></input>
                </div>

                <div className="my-2 w-[40%]">
                    <label>Labeled Price</label>
                    <input
                        type="number"
                        value={labeledPrice}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setLabeledPrice(e.target.value)}}
                    ></input>
                </div>

                <div className="my-2 w-full">
                    <label>Images</label>
                    <input
                        type="file"
                        multiple={true}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setImages(e.target.files)}}
                    ></input>
                </div>
                
                <div className="my-2 w-[30%]">
                    <label className="mx-2">Category</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2">
                        <option value="KeyBord">Key Bord</option>
                        <option value="Mouse">Mouse</option>
                        <option value="RAM">RAM</option>
                        <option value="GraphicCards">Graphic Cards</option>
                        <option value="StorageDevices">Storage Devices</option>
                        <option value="ComputerCase">Computer Case</option>
                        <option value="PC">PC</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Cable">Cable</option>
                        <option value="Monitors">Monitors</option>
                        <option value="Others">Others</option>
                        
                    </select>
                </div>

                <div className="my-2 w-[30%]">
                    <label>Brand</label>
                    <input
                        type="text"
                        value={brand}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setBrand(e.target.value)}}
                    ></input>
                </div>

                <div className="my-2 w-[30%]">
                    <label>Model</label>
                    <input
                        type="text"
                        value={model}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setModel(e.target.value)}}
                    ></input>
                </div>

                <div className="my-2 w-full">
                    <label>Available</label>
                   <select value={isAvailable} onChange={(e)=>setIsAvailable(e.target.value)} className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                   </select>
                </div>

                <div className="my-2 w-full">
                    <label>Stock</label>
                    <input
                        type="number"
                        value={stock}
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px] focus:border-2"
                        onChange={(e)=>{setStock(e.target.value)}}
                    ></input>
                </div>

                <button disabled={isLoading} onClick={handleUpdateProduct} className="w-[40%] h-[50px] bg-[#66917e] active:bg-[#3d6052] rounded-2xl outline-1 my-2 cursor-pointer">Update Product</button>
                <Link to="/admin/updateproducts" className="w-[40%] h-[50px] bg-red-400 active:bg-red-600 rounded-2xl outline-1 my-2 flex items-center justify-center">Cancel</Link>

            </div>
            </div>
        </div>
    )
}