import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
 
const useFetchPets =()=>{
 
    const [pets, setPets] = useState([]);
 
    const getPets = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error fetching pets");
            }
            const data = await response.json();
            setPets(data);
           
        } catch (error) {
            console.error("Error fetching pets:", error);
            toast.error("Error fetching pets");
        }
    }
 
      //funcion para obtener un usuario por su id
  //se usa async/await para manejar la asincronía de la llamada a la API
 
  const getPetById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        console.log("Failed to fetch pet");
        throw new Error("Failed to fetch pet");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pet:", error);
      console.log("Failed to fetch pet");
      return null;
    }
  };
 
 
    useEffect(() => {
        getPets();
    }, []);
 
    return {
        pets,
        getPetById,
        getPets
    }
}
 
export default useFetchPets;