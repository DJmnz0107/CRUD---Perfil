import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import useDataPets from "../hooks/pets/useDataPets";
import { optionSelect } from "../utils/apiUrl";
import '../css/pets.css';

const Pets = () => {
  // Creando métodos para manejar el formulario
  const methods = useForm();
  
  // Usando el hook para manejar los datos de la mascota
  const {
    register,
    handleSubmit,
    errors
  } = useDataPets(methods);

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
          <Titulo titulo="Información de Mascota" />
          <p className="form-description">
            Ingresa los datos de la mascota para registrarla en el sistema.
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

          {/* Descripción adicional */}
          <div className="form-group full-width">
            <label className="form-label">Descripción Adicional</label>
            <textarea
              {...register("descripcion")}
              className="form-textarea"
              placeholder="Información adicional sobre la mascota (opcional)"
              rows="4"
            ></textarea>
            {errors.descripcion && (
              <span className="error-message">{errors.descripcion.message}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button 
            type="submit" 
            text="💾 Guardar Mascota"
            variant="primary"
            size="large"
          />
        </div>
      </form>
    </div>
  );
};

export default Pets;