import './ItemList.css'


import Item from '../Item/Item'

const ItemList = ({products}) => {

    return (
        <div className='item-list-container'>
            <div className='products'>
                {products.map((product) => {
                return ( <div key={product.productId}>
                        <Item data={product}></Item>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ItemList
