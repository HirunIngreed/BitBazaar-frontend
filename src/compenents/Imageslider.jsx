import { useState } from "react"

export default function ImageSlider(props){
    const images = props.images
    const [activeIndex,setActiveIndex] = useState(0)

    return(
        <div className="w-full flex items-center flex-col justify-center gap-2">

            <img className="w-[60%] h-[400px] rounded-2xl object-contain" src={images[activeIndex]}/>
            <div className="w-full h-[100px] flex justify-center ">
                {
                    images.map(
                        (image,index)=>{
                            return(
                                <img key={index} className={"w-[95px] h-[95px] rounded-2xl object-contain "+((activeIndex==index)&&"outline-2 outline-black")} src={image} onClick={()=>{setActiveIndex(index)}}/>
                            )
                        }
                    )
                }
            </div>

        </div>
    )
}