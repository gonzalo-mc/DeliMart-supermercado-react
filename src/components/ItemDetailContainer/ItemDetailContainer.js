
import React, { useState, useEffect } from 'react';


import {doc, getDoc} from 'firebase/firestore'
import { db } from '../../firebase'

import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = ({ match }) => {
    let itemId = match.params.id;
    const [item, setItem] = useState([])

    useEffect(() => {
        const requestData = async() => {
            const docs = []
            const productsRef = doc(db, "products", itemId)
            const docSnap = await getDoc(productsRef)
            if (docSnap.exists()) {
                docs.push({...docSnap.data(), token: docSnap.id})
                setItem(docs)
            }
        }
            requestData()
	}, [itemId]);
    
    return (
        <div>
            {item.map((product) => {
                return (
                    <ItemDetail key={product.productId} product={product}></ItemDetail>
                )
            })}
        </div>
    )
}

export default ItemDetailContainer
