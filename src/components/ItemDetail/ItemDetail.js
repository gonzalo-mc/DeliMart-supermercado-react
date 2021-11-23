
import React, { useState, useContext } from 'react'


import { CartContext } from '../../CartContext'


import ItemCount from '../ItemCount/ItemCount'


import { Grid } from 'semantic-ui-react'
import './ItemDetail.css'


const ItemDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const [items,, addItem] = useContext(CartContext)

    const onAdd = (counter) => {
        console.log('Cantidad: ', counter)
        setQuantity(counter)
    }

    const handleCart = () => {
        console.log("Add item:" , items)
        addItem(product, quantity)
    }

    return (
        <Grid>
            <Grid.Column width={6} className='product-image'>
                <img src={product.image} alt={product.name}></img>
            </Grid.Column>
            <Grid.Column width={8} className='product-detail'>
                <h2>{product.name}</h2>
                <p className="company">{product.company}</p>
                <p className='price'>{product.price}</p>
                <p><strong>Tamaño: </strong>{product.volume}</p>
                <p><strong>Tipo: </strong>{product.style}</p>
                <p><strong>Descripción: </strong>{product.description}</p>
                <ItemCount stock={product.stock} initial={1} onAdd={onAdd}/>
                <button className='add-button' onClick={handleCart}>Agregar al carrito</button>
            </Grid.Column>
        </Grid>
    )
}

export default ItemDetail
