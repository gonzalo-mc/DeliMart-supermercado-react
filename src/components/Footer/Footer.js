import React from "react";
import logo from "../../img/logo_large_blanco.png";


import "./Footer.css";
import { Icon } from "semantic-ui-react";

const Footer = () => {
    return (
    <div className="footer-container">
        <img src={logo} className="footer-logo" alt="DeliMart logo" />
        <div>
            <h5>NOSOTROS</h5>
            <p>Sobre Nosotros</p>
            <p>Como es nuestro proceso</p>
            <p>Política de privacidad</p>
        </div>

        <div>
            <h5>AYUDA</h5>
            <p>Cómo comprar</p>
            <p>Formas de envío</p>
            <p>Preguntas frecuentes</p>
        </div>

        <div>
            <h5>CONTACTO</h5>
            <p><Icon link name="mail" circular size="large" />atencion@delimart.com.ar</p>
            <p><Icon link name="whatsapp" circular size="large" />3794320415</p>
            
        </div>
    </div>
    );
};

export default Footer;