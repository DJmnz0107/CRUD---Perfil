import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Titulo from "../components/Titulos";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import useDataPets from "../hooks/pets/useDataPets";
import { optionSelect } from "../utils/apiUrl";
import '../css/pets.css';

const Pets = () => {
  // Obtener datos de navegación
  const location = useLocation();
  const { isEditing, petData } = location.state || {};

  // Creando métodos para manejar el formulario
  const methods = useForm();
  
  // Usando el hook para manejar los datos de la mascota
  const {
    register,
    handleSubmit,
    errors
  } = useDataPets(methods, isEditing, petData);

  // Pre-llenar el formulario si estamos editando
  useEffect(() => {
    if (isEditing && petData) {
      // Resetear el formulario con los datos de la mascota
      methods.reset({
        mascota: petData.mascota || '',
        edad: petData.edad || '',
        raza: petData.raza || '',
        especie: petData.especie || '',
        propietario: petData.propietario || ''
      });
    }
  }, [isEditing, petData, methods]);

  // Opciones para el select de especies
  const especieOptions = [
    { value: "perro", label: "Perro" },
    { value: "gato", label: "Gato" },
    { value: "ave", label: "Ave" },
    { value: "pez", label: "Pez" },
    { value: "reptil", label: "Reptil" },
    { value: "otro", label: "Otro" }
  ];

  return (
    <div className="pets-form-container">
      <Link
        to="/home"
        className="back-to-dashboard-link"
      >
        🏠 Volver al Dashboard
      </Link>
      
      <form 
        onSubmit={handleSubmit}
        className="pets-form"
      >
        <div className="form-header">
          <Titulo titulo={isEditing ? "Editar Mascota" : "Información de Mascota"} />
          <p className="form-description">
            {isEditing 
              ? "Modifica los datos de la mascota." 
              : "Ingresa los datos de la mascota para registrarla en el sistema."
            }
          </p>
        </div>

        <div className="form-grid">
          {/* Nombre de la Mascota */}
          <InputText
            type="text"
            name="mascota"
            label="Nombre de la Mascota"
            placeholder="Ingresa el nombre de la mascota"
            register={register}
            errors={errors}
          />

          {/* Edad */}
          <InputText
            type="number"
            name="edad"
            label="Edad"
            placeholder="Edad en años"
            register={register}
            errors={errors}
          />

          {/* Raza */}
          <InputText
            type="text"
            name="raza"
            label="Raza"
            placeholder="Ingresa la raza"
            register={register}
            errors={errors}
          />

          {/* Especie */}
          <SelectInput
            label="Especie"
            options={especieOptions}
            register={register}
            errors={errors}
            name="especie"
          />

          {/* Propietario */}
          <InputText
            type="text"
            name="propietario"
            label="Nombre del Propietario"
            placeholder="Ingresa el nombre del propietario"
            register={register}
            errors={errors}
          />
        </div>

        <div className="form-actions">
          <Button 
            type="submit"
            text={isEditing ? "💾 Actualizar Mascota" : "💾 Guardar Mascota"}
            variant="primary"
            size="large"
          />
        </div>
      </form>
    </div>
  );
};

export default Pets;