import { useState } from "react"
import { AiOutlineProduct } from "react-icons/ai"
import { Link } from "react-router-dom"
import mediaUpload from "../utils/mediaUpload"
import axios from "axios"
import toast from "react-hot-toast"
import Loader from "../compenents/Loader"

export default function AddProducts(){

    const [name,setName] = useState("")
    const [altNames,setAltName] = useState("")
    const [description,setDiscription] = useState("")
    const [brand,setBrand] = useState("")
    const [category,setCategory] = useState("Others")
    const [isAvailable,setIsAvailable] = useState("Yes")
    const [price,setPrice] = useState()
    const [labeledPrice,setLabeledPrice] = useState()
    const [stock,setStock] = useState()
    const [model,setModel] = useState("")
    const [images,setImages] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    async function handleAddProduct (){
        try {
            setIsLoading(true)
            const altNamesArray = altNames.split(",")

            let available
            if (isAvailable == "Yes") {
                available = true
            }else{
                available = false
            }

            if (images.length==0) {
                toast.error("Please upload atleast one image")
                setIsLoading(false)
                return
            }

            let promiseArray = []

            for(let i = 0 ; i < images.length ; i++){
                const image =  await mediaUpload(images[i])
                promiseArray.push(image)
            }

            const imageUrls = await Promise.all(promiseArray)
            console.log(imageUrls)

            if (!name || !description || !price || !labeledPrice || !stock) {
                toast.error("Please complete all input fields before submitting the form.")
                setIsLoading(false)
                return
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
                model :model,
                images : imageUrls
            }

            const token = localStorage.getItem("token")

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/`,data,{
                headers : {
                    "Authorization" : "Bearer "+token
                }
            })
            toast.success("Product added successfully")
            console.log("Product added successfully")
            setIsLoading(false)

            
        } catch (error) {
            toast.error("Product is not added")
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
            <h1 className="text-2xl w-full items-center flex justify-center"><AiOutlineProduct />Add Products</h1>
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
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px]  focus:border-2">
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
                        className="w-full h-[40px] outline-1 focus:outline-accent rounded-2xl shadow-2xl px-[20px]  focus:border-2"
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

                <button disabled={isLoading} onClick={handleAddProduct} className="w-[40%] h-[50px] bg-[#66917e] active:bg-[#3d6052] rounded-2xl outline-1 my-2 cursor-pointer">Add Product</button>
                <Link to="/admin" className="w-[40%] h-[50px] bg-red-400 active:bg-red-600 rounded-2xl outline-1 my-2 flex items-center justify-center">Cancel</Link>

            </div>
            </div>
        </div>
    )
}