import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../css/welcome.css";

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  const handleAccept = () => {
    setShowWelcome(false);
    navigate("/home");
  };

  if (!showWelcome) return null;

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        {/* Icono decorativo */}
        <div className="welcome-icon"></div>
        
        {/* Título */}
        <h1 className="welcome-title">¡Bienvenido!</h1>
        
        {/* Mensaje de bienvenida */}
        <p className="welcome-message">
          Gracias por visitar nuestra <strong>aplicación CRUD</strong>.
          <br />
          Gestiona tus datos de forma fácil y elegante.
        </p>
        
        {/* Botón */}
        <Button 
          type="button" 
          onClick={handleAccept} 
          text="Comenzar" 
        />
        
        {/* Indicadores CRUD */}
        <div className="crud-indicators">
          <div className="crud-indicator">
            <div className="crud-dot create"></div>
            <span>Crear</span>
          </div>
          <div className="crud-indicator">
            <div className="crud-dot read"></div>
            <span>Leer</span>
          </div>
          <div className="crud-indicator">
            <div className="crud-dot update"></div>
            <span>Actualizar</span>
          </div>
          <div className="crud-indicator">
            <div className="crud-dot delete"></div>
            <span>Eliminar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;