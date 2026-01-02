import Header from "../compenents/Header";

export default function AboutPage(){
    return(
        <div className="w-full h-screen flex flex-col bg-[url(home.jpg)] overflow-y-auto ">
            <div className="w-full h-[100px] hidden lg:flex"><Header/></div>
            <div className="w-full h-[calc(100vh-100px)] lg:flex-row flex flex-col items-center justify-center">

                <div className="lg:w-[50%] w-[95%] lg:h-full h-[95%] flex items-center justify-center">
                    <div className="w-[calc(100%-50px)] h-[calc(100%-50px)] shadow-2xl flex flex-col items-center justify-center lg:gap-10 gap-1 bg-white rounded-2xl">
                        <h1 className="lg:text-5xl text-3xl font-mono font-bold text-black/50">✨ About Bit Bazaar</h1>
                        <h1 className="font-mono p-5 text-[#83AF9B]">Bit Bazaar is a vibrant marketplace built for the digital age, where innovation meets community. We bring together creators, entrepreneurs, and tech enthusiasts to exchange ideas, products, and services in a space designed to celebrate creativity and collaboration. Whether you’re exploring unique handcrafted goods, discovering cutting‑edge digital solutions, or connecting with like‑minded individuals, Bit Bazaar is more than a marketplace—it’s a hub of inspiration. Our mission is to empower small businesses and independent creators by giving them a platform to showcase their work, while offering customers a curated experience that blends tradition with modern technology.
                        </h1>
                    </div>
                </div>

                <div className="w-[50%] h-full flex items-center justify-center hidden lg:flex">
                    <div className="w-[calc(100%-50px)] h-[calc(100%-50px)] shadow-2xl  bg-white rounded-2xl">
                        <div className="w-full h-[calc(100%/1/3)] flex">
                            <div className="w-[50%] bg-[url(laptop.jpg)] bg-cover rounded-xl"></div>
                            <div className="w-[50%] hidden lg:flex"></div>
                        </div>
                        <div className="w-full h-[calc(100%/1/3)] flex">
                            <div className="w-[50%]  hidden lg:flex"></div>
                            <div className="w-[50%] bg-[url(cpu.jpg)] bg-cover rounded-xl"></div>
                        </div>
                        <div className="w-full h-[calc(100%/1/3)] flex">
                            <div className="w-[50%] bg-[url(fan.jpg)] bg-cover rounded-xl"></div>
                            <div className="w-[50%]  hidden lg:flex"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}