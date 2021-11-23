
import React, { useContext, useState }  from 'react'

//Firebase
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../../firebase'

//Formik
import { useFormik } from 'formik'

//Yup
import * as Yup from 'yup'

//Styles
import './Cart.css'
import { Button, Form, Modal } from 'semantic-ui-react'

//Context
import { CartContext } from '../../CartContext'

//Components
import ItemCart from '../ItemCart/ItemCart'
import EmptyCart from '../EmptyCart/EmptyCart'
import Loading from '../Loading/Loading';

const Cart = () => {
    const [items, , , , clear, ] = useContext(CartContext)
    const [purchase, setPurchase] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(true)

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            repeatEmail: "",
        },
        onSubmit: (data)=> {
            console.log(data)
            registryPurchase(data.name, data.phone, data.email)
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Es necesario que ingreses tu nombre'),
            phone: Yup.string().required('Es necesario que ingreses tu teléfono').min(8),
            email: Yup.string().email("Ingrese un email válido").required("Es necesario que ingrese su email").oneOf([Yup.ref("repeatEmail")], "No coinciden los correos"),
            repeatEmail: Yup.string().email("Ingrese un email válido").required("Es necesario que ingrese su email").oneOf([Yup.ref("email")], "No coinciden los correos"),
        })
    })

    const getTotal = () => {
        let total = 0
        for (let item of items) {
            total = total + (item.quantity * item.priceNumber)
        }
        return total
    }

    const registryPurchase = async (name, phone, email) => {
        setIsLoading(true)
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "purchases"), {
            buyer: {
                name: name,
                phone: phone,
                email: email
            },
            items: items,
            date: new Date(),
            total: getTotal()
            
        });
        console.log("Document written with ID: ", docRef.id);
        setIsLoading(false)
        setPurchase(docRef.id)
        
    }

    const cleanPurchase = () => {
        setPurchase('')
        clear()
        setOpen(false)
    }

    return (
        <div className="cart-container">

            { isLoading && <Loading></Loading> }

            { purchase && <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} closeOnDimmerClick={false} >
                <Modal.Header>Compra exitosa!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <h4>Id de compra: {purchase}</h4>
                    <p>En un momento llegará a tu correo tu ticket de compra</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={cleanPurchase}>
                    Aceptar
                    </Button>
                </Modal.Actions>
            </Modal> }

            {items.length > 0 ? <div className='form-container'>
                <h2 className="form-title">Ingresa tus datos de compra</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Input
                        error={formik.errors.name}
                        fluid
                        label='Nombre'
                        placeholder='Ingrese su nombre'
                        name='name' 
                        onChange={formik.handleChange}
                        />

                    <Form.Input
                        error={formik.errors.phone}
                        fluid
                        label='Teléfono'
                        placeholder='Ingrese su teléfono'
                        name='phone' 
                        onChange={formik.handleChange}
                        />

                    <Form.Input
                        error={formik.errors.email}
                        fluid
                        label='Email'
                        placeholder='Ingrese su email'
                        name='email' 
                        onChange={formik.handleChange}
                        />

                    <Form.Input
                        error={formik.errors.repeatEmail}
                        fluid
                        label="Repetir email"
                        placeholder="Reingrese su email"
                        name="repeatEmail"
                        onChange={formik.handleChange}
                        />  

                    </Form.Group>
                    <Button primary type='submit'>Terminar de comprar</Button>
                    
                </Form>
            </div> : null}
            
            {items.length > 0 ? <div>{items.map((item) => {
                return ( 
                    <div key={item.productId}>
                        <ItemCart item={item}></ItemCart>
                    </div>
                    );
                })}
                    <h2>Total: ${getTotal()}</h2>
                </div> : <EmptyCart></EmptyCart> }
                
            
        </div>
    )
}

export default Cart