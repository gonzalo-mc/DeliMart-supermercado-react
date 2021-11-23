import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const EmptyCart = () => {
    return (
        <div>
            <h1>No tienes productos en tu carrito</h1>
            <Link to={`/`}>
                <Button>Buscar productos</Button>
            </Link>
        </div>
    )
}

export default EmptyCart