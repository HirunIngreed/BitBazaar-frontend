import Header from "../compenents/Header";
import { FaRegKeyboard } from "react-icons/fa";
import { RiRamLine, RiShoppingBag2Line } from "react-icons/ri";
import { PiComputerTowerBold, PiGraphicsCard, PiMouseSimpleBold } from "react-icons/pi";
import { FiHardDrive } from "react-icons/fi";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineLaptopMac, MdOutlineMouse } from "react-icons/md";
import { LuCable, LuMonitor } from "react-icons/lu";
import { TfiMoreAlt } from "react-icons/tfi";
import '../index.css'
import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosList } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BsTruck } from "react-icons/bs";
import OrderReviewCoustomer from "../compenents/OrderReviewCostomer";



export default function HomePage(){

const scrollRef = useRef(null)
const [isToggel,setIsToggel] = useState(false)
const [isMessageOpen,setIsMessageOpen] = useState(false)
const navigate = useNavigate()

function scroll (direction){
    if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft
        const scrollAmount = 200

        scrollRef.current.scrollTo({
           left: direction=="left"?scrollLeft - scrollAmount:scrollLeft+scrollAmount,behavior : "smooth"

        })
    }
}


    return(
        <div className="w-full h-screen flex">
            <div className="w-full h-screen flex relative">
            
                <div className="w-full h-screen bg-[url(home.jpg)] relative lg:overflow-y-scroll overflow-hidden">
            
            <button className="fixed top-3.5 left-3.5 text-2xl lg:hidden z-50" onClick={()=>{setIsToggel(!isToggel)}}><IoIosList /></button>
            <RiShoppingBag2Line className="text-2xl cursor-pointer fixed top-3.5 right-3.5 lg:hidden" onClick={()=>{navigate("/cart")}}/>
            <BsTruck onClick={()=>{setIsMessageOpen(true)}} className="text-2xl lg:hidden cursor-pointer fixed top-3.5 right-10"/>
                {
                    isMessageOpen&&<OrderReviewCoustomer message={()=>{setIsMessageOpen(false)}}/>
                }
            <div className={"w-[300px] h-full bg-gray-500 fixed lg:hidden transition-all duration-500 rounded-r-2xl items-center justify-center flex flex-col "+(isToggel?"left-0":"-left-[300px]")}>
                
                <button className="fixed top-3.5 left-3.5 text-2xl z-50" onClick={()=>{setIsToggel(!isToggel)}}><IoIosList /></button>

                

                <div className="w-[150px] h-[50px] flex items-center justify-center  my-4 relative z-50">
                        <Link to="/" className="text-2xl bottom-2 font-mono "  onClick={()=>{setIsToggel(!isToggel)}}>Home</Link>
                </div>

                <div className="w-[150px] h-[50px] flex items-center justify-center  my-4">
                        <Link to="/products" className="text-2xl bottom-2 font-mono z-50"  onClick={()=>{setIsToggel(!isToggel)}}>Products</Link>
                </div>

                <div className="w-[150px] h-[50px] flex items-center justify-center  my-4">
                        <Link to="/about" className="text-2xl bottom-2 font-mono z-50"  onClick={()=>{setIsToggel(!isToggel)}}>About</Link>
                </div>

                <div className="w-[150px] h-[50px] flex items-center justify-center  my-4">
                        <Link to="/contactus" className="text-2xl bottom-2 font-mono z-50" onClick={()=>{setIsToggel(!isToggel)}}>Contact us</Link>
                </div>

            </div>

            <div className="flex hidden lg:flex "><Header/></div>
           
            

                <div className="lg:w-full lg:h-[calc(100%-100px)] flex relative justify-center">

                    <div className={(isToggel?'opacity-0 lg:opacity-100 lg:w-[900px] lg:h-[300px] bg-[#759c8a] lg:absolute rounded-2xl flex top-10':" lg:w-[900px] lg:h-[300px] bg-[#759c8a] absolute rounded-2xl top-10 flex w-[400px] h-[150px] lg:flex")}>
                        <div className="lg:w-[50%] lg:h-full flex justify-center w-[300px] aspect-square">
                            <img src="logo.png"/>
                        </div>
                        <div className="w-[50%] h-full flex items-center">
                            <h1 className="lg:text-6xl text-2xl text-center font-mono font-bold p-3">Parts. Power. Performance. Bit Bazaar.</h1>
                        </div>
                    </div>

                    <div className="w-[800px] h-[100px] flex absolute lg:top-[350px] top-[500px] items-center justify-center">

                        <h1 className="text-7xl hidden lg:flex cursor-pointer"><IoIosArrowBack onClick={()=>{scroll("left")}}/></h1>
                        <div ref={scrollRef} className={(isToggel?"hidden lg:flex lg:w-[700px] lg:h-[100px] bg-[#818f88] rounded-2xl lg:top-[350px] flex pl-5 pr-5 justify-center items-center overflow-x-scroll scrollbar-hide mx-10 overflow-y-hidden ":"lg:w-[700px] lg:h-[100px] w-[100px] h-[500px] bg-[#818f88] rounded-2xl lg:top-[350px] flex pl-5 pr-5 justify-center items-center overflow-x-scroll scrollbar-hide mx-10 overflow-y-hidden")} >

                            
                        
                        <div className="w-full scrollbar lg:flex relative items-center hidden lg:flex">
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer" title="KeyBoards" to="/category/KeyBoard"><FaRegKeyboard /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Mouses" to="/category/Mouse"><MdOutlineMouse /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="RAMs"to="/category/RAM"><RiRamLine /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Graphic Cards" to="/category/GraphicCards"><PiGraphicsCard /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Storage Devices" to="/category/StorageDevices"><FiHardDrive /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Computer Cases"to="/category/ComputerCase" ><PiComputerTowerBold /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="PCs" to="/category/PC"><FaComputer /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Laptops" to="/category/Laptop"><MdOutlineLaptopMac /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Cabeles" to="/category/Cable"><LuCable /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Monitors" to="/category/Monitors"><LuMonitor /></Link>
                            <Link className="h-full aspect-square text-[85px] hover:scale-110 duration-150 p-[20px] cursor-pointer"title="Others" to="/category/Others"><TfiMoreAlt /></Link>
                        </div>

                        <div className="w-[100px] h-[500px] flex lg:hidden flex-col items-center  overflow-scroll">
                            <Link className="text-6xl" to="/category/KeyBoard"><FaRegKeyboard /></Link>
                            <Link className="text-6xl" to="/category/Mouse"><MdOutlineMouse /></Link>
                            <Link className="text-6xl" to="/category/RAM"><RiRamLine /></Link>
                            <Link className="text-6xl" to="/category/GraphicCards"><PiGraphicsCard /></Link>
                            <Link className="text-6xl" to="/category/StorageDevices"><FiHardDrive /></Link>
                            <Link className="text-6xl" to="/category/ComputerCase"><PiComputerTowerBold /></Link>
                            <Link className="text-6xl" to="/category/PC"><FaComputer /></Link>
                            <Link className="text-6xl" to="/category/Laptop"><MdOutlineLaptopMac /></Link>
                            <Link className="text-6xl" to="/category/Cable"><LuCable /></Link>
                            <Link className="text-6xl" to="/category/Monitors"><LuMonitor /></Link>
                            <Link className="text-6xl" to="/category/Others"><TfiMoreAlt /></Link>
                        </div>

                    
                        
                </div>
                <h1 className="text-7xl hidden lg:flex cursor-pointer"><IoIosArrowForward onClick={()=>{scroll("right")}}/></h1>
                </div>


            </div>

            
            
        </div>
            
        </div>
        </div>
    )
}