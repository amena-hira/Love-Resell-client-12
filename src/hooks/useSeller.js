import { useEffect, useState } from "react"

const useSeller = email =>{
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    
    useEffect(()=>{
        if (email) {
            fetch(`https://love-resell-server.vercel.app/users/seller/${email}`)
            .then(res=>res.json())
            .then(data=>{
                console.log("seller data: ",data);
                setIsSeller(data.isSeller);
                setIsSellerLoading(false);
            })
        }
    },[email])
    // console.log('seller and loading in hook: ', isSeller, isSellerLoading)
    return [isSeller, isSellerLoading]
    
}

export default useSeller;