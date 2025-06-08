import { useEffect } from "react";
import { url } from "../../utils/apiUrl"; // URL de la API
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useFetchPets from "./useFetchPets";

const useDataPet = (methods, isEditing = false, petData = null) => {
  const { getPetById, getPets } = useFetchPets();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  // save pet form
  // funcion para guardar el formulario de mascota y enviar los datos a la API
  const savePetForm = async (dataForm) => {
    try {
      // enviar la solicitud POST a la API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Error al agregar la mascota");
        throw new Error("Failed to add pet");
      }
      toast.success("Mascota guardada exitosamente");
      navigate("/home"); // Redirigir a la página de inicio después de guardar
    } catch (error) {
      console.log("Error al enviar:", error);
      toast.error("Error al guardar la mascota");
    } finally {
      reset(); // reiniciar el formulario después de enviar
      getPets(); // obtener la lista actualizada de mascotas
    }
  };

  // Función para editar una mascota
  // Esta función se llama cuando se envía el formulario de edición
  // y envía una solicitud PUT a la API para actualizar los datos de la mascota
  const editPet = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${petData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Error al actualizar la mascota");
        throw new Error("Failed to update pet");
      }
      toast.success("Mascota actualizada exitosamente");
      navigate("/home"); // Redirect to home after updating
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Error al actualizar la mascota");
    } finally {
      reset(); // Reset the form after submission
      getPets(); // Refresh the pets list after updating
    }
  };

  // Esta función se llama cuando se envía el formulario
  // y decide si guardar una nueva mascota o editar una existente
  // dependiendo de si estamos en modo edición
  const handlePetAction = (dataForm) => {
    if (isEditing && petData) {
      editPet(dataForm);
    } else {
      savePetForm(dataForm);
    }
  };

  // Función para manejar la actualización de una mascota
  // Esta función se llama cuando se hace clic en el botón de editar
  // y redirige al usuario a la página de edición de la mascota
  // pasando los datos de la mascota como state
  const handleUpdatePet = (petId) => {
    navigate('/pets', { 
      state: { 
        isEditing: true, 
        petData: { id: petId } // Aquí podrías pasar más datos si los tienes
      } 
    });
  };

  // Cargar los datos de la mascota
  // Esta función se llama para pre-llenar el formulario cuando estamos en modo edición
  const loadPet = async () => {
    if (isEditing && petData) {
      // Si ya tenemos los datos de la mascota, los usamos directamente
      reset({
        mascota: petData?.mascota || '',
        edad: petData?.edad || '',
        raza: petData?.raza || '',
        especie: petData?.especie || '',
        propietario: petData?.propietario || '',
        descripcion: petData?.descripcion || ''
      });
    }
  };

  // useEffect para cargar los datos de la mascota cuando el componente se monta
  useEffect(() => {
    loadPet();
  }, [isEditing, petData]); // Dependencia en isEditing y petData

  return {
    register,
    handleSubmit: handleSubmit(handlePetAction),
    errors,
    getPetById,
    handleUpdatePet,
    loadPet,
  };
};

export default useDataPet;