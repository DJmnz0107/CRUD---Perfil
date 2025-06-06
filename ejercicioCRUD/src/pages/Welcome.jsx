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
        <p className="welcome-message">
          ¡Gracias por visitar nuestra aplicación CRUD!
        </p>
        <Button type="button" onClick={handleAccept} text="Aceptar" />
      </div>
    </div>
  );
};

export default Welcome;
