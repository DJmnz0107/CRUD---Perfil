import { useEffect } from "react";
import { url } from "../../utils/apiUrl"; // URL de la API
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchPets from "./useFetchPets";

const useDataPet = (methods) => {
  const { getPetById, getPets } = useFetchPets();
  const { id } = useParams();

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
      const response = await fetch(`${url}/${id}`, {
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
  // dependiendo de si hay un id presente en los parámetros de la URL
  // Si hay un id, se llama a editPet, de lo contrario se llama a savePetForm
  const handlePetAction = (dataForm) => {
    if (id) {
      editPet(dataForm);
    } else {
      savePetForm(dataForm);
    }
  };

  // Función para manejar la actualización de una mascota
  // Esta función se llama cuando se hace clic en el botón de editar
  // y redirige al usuario a la página de edición de la mascota
  // pasando el id de la mascota como parámetro en la URL
  const handleUpdatePet = (id) => {
    navigate(`/pets/${id}`);
  };

  // Cargar los datos de la mascota por id
  // Esta función se llama para obtener los datos de la mascota cuando el componente se monta o cuando cambia el id
  const loadPet = async () => {
    if (id) {
      const pet = await getPetById(id);
      if (pet) {
        reset({
          mascota: pet?.mascota,
          edad: pet?.edad,
          raza: pet?.raza,
          especie: pet?.especie,
          propietario: pet?.propietario,
        });
      }
    }
  };

  // useEffect para cargar los datos de la mascota cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    loadPet();
  }, [id]); // Dependencia en id para recargar los datos si cambia

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