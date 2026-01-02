export default function GetOrderStatus(status){
        if (status=="pending") {
            return <h1 className="border border-green-600 text-green-600 text-center rounded-full w-[100px] h-full">{status}</h1>
        }else if(status=="shipped"){
            return<h1 className="border border-orange-600 text-orange-600 text-center rounded-full w-[100px]">{status}</h1>
        }else if (status=="canceled") {
            return<h1 className="border border-red-600 text-red-600 text-center rounded-full w-[100px]">{status}</h1>
        }else if (status=="hold") {
            return<h1  className="border border-yellow-600 text-yellow-600 text-center rounded-full w-[100px]">{status}</h1>
        }
    }