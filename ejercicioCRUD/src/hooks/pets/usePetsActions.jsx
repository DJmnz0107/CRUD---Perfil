import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
 
const useUserAction = (getPets) => {
  const navigate = useNavigate();
 

  const deletePet = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      toast.success("Pet deleted successfully");
      console.log("Pet deleted:", response);
      getPets();
    } catch (error) {
      console.error("Error deleting pets:", error);
      toast.error("Failed to delete pets");
    } finally {
      getPets();
    }
  };
 
  // Función para manejar la actualización de un usuario
  // Esta función se llama cuando se hace clic en el botón de editar
  // y redirige al usuario a la página de edición del usuario
  // pasando el id del usuario como parámetro en la URL
  const handleUpdatePets = (id) => {
    navigate(`/users/${id}`);
  };
 
  return {
    deletePet,
    handleUpdatePets,
  };
};
 
export default useUserAction;
 
 