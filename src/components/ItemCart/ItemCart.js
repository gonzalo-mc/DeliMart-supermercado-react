import React, {useContext} from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import './ItemCart.css'


import { CartContext } from '../../CartContext'

const ItemCart = ({ item }) => {

    const [, , , removeItem] = useContext(CartContext)

    const handleDelete = () => {
        removeItem(item.productId)
    }

    return (
        <div>
            <Card id="item-cart">
                <Card.Content>
                    <Image
                        floated='left'
                        size='mini'
                        src={item.image}
                    />
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Meta>{item.price}</Card.Meta>
                    <Card.Meta>Cantidad: {item.quantity}</Card.Meta>
                    <Button basic color='red' onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default ItemCart