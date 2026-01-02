import toast from "react-hot-toast"

export function getCart (){
    const cartString = localStorage.getItem("cart")

    if (cartString==null) {
        localStorage.setItem("cart","[]")
        return []
    }else{
        localStorage.getItem("cart")
        const cart = JSON.parse(cartString)
        return cart
    }
}

export async function addCart(product,quantity){

    const cart = getCart()

    const index = cart.findIndex(
        (item)=>{
            return item.productId == product.productId
        }
    )

    if (index == -1) {
        cart.push(
            {
                productId : product.productId,
                name : product.name,
                quantity : quantity,
                image : product.images[0],
                labeledPrice : product.labeledPrice,
                price : product.price
            }
        )
        toast.success(`${product.name} is add to cart`)
    }else{
        const newQuantity = cart[index].quantity + quantity

        if (newQuantity <= 0) {
            cart.splice(index,1)
            toast.success(`${product.name} is remove from cart`)
        }else{
            cart[index].quantity = newQuantity
            toast.success("Quantity is updated")
        }
    }
    const cartString = JSON.stringify(cart)
    localStorage.setItem("cart",cartString)
}

export function emptyCart(){
    localStorage.setItem('cart','[]')
}

export function getCartTotal(){
    const cart = getCart()

    let total = 0

    for(let i = 0; i<cart.length; i++){
        total = total + (cart[i].quantity * cart[i].price)
    }return total
}