import React, {useState, createContext} from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [items, setItems] = useState([])

    const addItem = (item, quantity) => {
        const newItems = items.slice()
        if (isInCart(item.productId)) {
            //Update item
            const index = newItems.findIndex((element => element.productId === item.productId))
            newItems[index].quantity = quantity
            setItems(newItems)

        } else {
            //Insert item
            newItems.push({...item, quantity: quantity})
            setItems(newItems)
            
        } 
        
    }

    const removeItem = (itemId) => {
        if (isInCart(itemId)) {
            //Delete item
            const newItems = items.filter((element => element.productId !== itemId))
            setItems(newItems)
        } else {
            //Error item
            alert("Este producto no estaba en tu carrito")
        }
    }

    const clear = () => {
        setItems([])
    }

    const isInCart = (itemId) => {
        const product = items.find(element => element.productId === itemId)
        if (product) {
            console.log("Ya existe el producto")
            return true
        }
        console.log("No existe el producto")
        return false
    }

    return(
        <CartContext.Provider value={[items, setItems, addItem, removeItem, clear, isInCart]}>
            {children}
        </CartContext.Provider>
    )
}