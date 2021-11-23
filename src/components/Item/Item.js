
import React from 'react'
import {Link} from 'react-router-dom'


import './Item.css'

const Item = ({ data }) => {
    return (
        <div className='item-container'>
            <Link to={`/item/${data.token}`}>
                <div><img className='item-image' src={data.image} alt={data.name}></img></div>
                <h2>{data.name}</h2>
                <p>{data.company}</p>
                <p className='item-price'>{data.price}</p>
            </Link>
        </div>
    )
}

export default Item
