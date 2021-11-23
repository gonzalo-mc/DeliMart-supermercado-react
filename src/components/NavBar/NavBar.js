import logo from '../../img/logo.jpg'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


import {collection, getDocs} from 'firebase/firestore'
import { db } from '../../firebase'


import './NavBar.css'

import CartWidget from '../CartWidget/CartWidget';


const NavBar = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const requestData = async() => {
            const docs = []
            const categoriesRef = collection(db, "categories")
            const items = await getDocs(categoriesRef)
            items.forEach((doc) => {
                docs.push({...doc.data(), token: doc.id})
            })
            setCategories(docs)
        }
        requestData()
    }, [])

    return (
        <nav className="navBar">
            <div className="logo">
                <Link to={`/`}>
                    <img className="logo-img" src={logo} alt="Delimart logo"/>
                </Link>
            </div>
            <div className="menu">
                <ul className="menu-list">
                {categories.map((category) => {
                    return ( 
                        <li key={category.categoryId}><Link to={`/category/${category.categoryId}`}>{category.name}</Link></li>
                        );
                    })}
                </ul>
            </div>
            <Link to={`/cart`}>
                <CartWidget />
            </Link>
            
        </nav>
    );
};

export default NavBar;