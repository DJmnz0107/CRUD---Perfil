import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useFetchPets from "../hooks/pets/useFetchPets";
import { optionSelect } from "../utils/apiUrl";
import usePetsActions from "../hooks/pets/usePetsActions";
import '../css/home.css';

const Home = () => {
  const { pets, getPets } = useFetchPets();
  const { deletePet } = usePetsActions(getPets);
  const navigate = useNavigate();

  const handleUpdatePet = (petId) => {
    // Encuentra los datos de la mascota
    const petToEdit = pets.find(pet => pet.id === petId);
    
    if (petToEdit) {
      // Navega a la página de edición pasando los datos como state
      navigate('/pets', { 
        state: { 
          isEditing: true, 
          petData: petToEdit 
        } 
      });
    }
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="home-header">
        <div className="header-content">
          <h1 className="main-title">🐾 Sistema de Mascotas</h1>
          <p className="main-subtitle">Gestiona la información de tus mascotas de manera fácil y rápida</p>
          
          <Link to="/pets" className="add-pet-link">
            <div className="add-pet-card">
              <div className="add-pet-icon">+</div>
              <div className="add-pet-text">
                <h3>Agregar Nueva Mascota</h3>
                <p>Registra una nueva mascota en el sistema</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-content">
        <div className="content-header">
          <h1 className="section-title">Información de Mascotas</h1>
          <p className="content-description">
            Lista completa de mascotas registradas en el sistema.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <h3>{pets?.length || 0}</h3>
              <p>Total Mascotas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🐕</div>
            <div className="stat-info">
              <h3>{pets?.filter(pet => pet.especie === 'perro').length || 0}</h3>
              <p>Perros</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🐱</div>
            <div className="stat-info">
              <h3>{pets?.filter(pet => pet.especie === 'gato').length || 0}</h3>
              <p>Gatos</p>
            </div>
          </div>
        </div>

        {/* Pets Table */}
        <div className="table-container">
          <div className="table-header">
            <h2>Lista de Mascotas</h2>
            <div className="table-actions">
              <Button 
                text="Actualizar Lista" 
                variant="outline" 
                size="small"
                onClick={getPets}
              />
            </div>
          </div>

          <div className="table-wrapper">
            {pets && pets.length > 0 ? (
              <table className="pets-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Mascota</th>
                    <th>Edad</th>
                    <th>Raza</th>
                    <th>Especie</th>
                    <th>Propietario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet) => (
                    <tr key={pet.id} className="table-row">
                      <td className="id-cell">#{pet.id}</td>
                      <td className="pet-cell">
                        <div className="pet-info">
                          <div className="pet-avatar">
                            {pet.especie === 'perro' ? '🐕' : pet.especie === 'gato' ? '🐱' : '🐾'}
                          </div>
                          <div>
                            <strong>{pet.mascota}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="age-badge">
                          {pet.edad} {pet.edad === 1 ? 'año' : 'años'}
                        </span>
                      </td>
                      <td>{pet.raza}</td>
                      <td>
                        <span className={`species-badge ${pet.especie}`}>
                          {pet.especie}
                        </span>
                      </td>
                      <td className="owner-cell">{pet.propietario}</td>
                      <td className="actions-cell">
                        <div className="action-buttons">
                          <Button 
                            text="Editar" 
                            variant="primary" 
                            size="small"
                            onClick={() => handleUpdatePet(pet.id)} 
                          />
                          <Button 
                            text="Eliminar" 
                            variant="danger" 
                            size="small"
                            onClick={() => deletePet(pet.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🐾</div>
                <h3>No hay mascotas registradas</h3>
                <p>Comienza agregando la primera mascota al sistema</p>
                <Link to="/pets">
                  <Button 
                    text="Agregar Primera Mascota" 
                    variant="primary" 
                    size="medium"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;