import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import { Plant, loadPlants, deletePlant, createPlant } from "../../plant/apis/plant";
import {AppWrapper} from "../../common/AppWrapper";
// import "./PlantItemList.css";

export const AdminPlantsScreen = () => {
  const { setError } = useError();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // Add states for plant form fields
  const [plantName, setPlantName] = useState('');
  const [plantDescription, setPlantDescription] = useState('');
  const [plantPrice, setPlantPrice] = useState(0);
  const [plantStockQuantity, setPlantStockQuantity] = useState(0);
  const [plantImage, setPlantImage] = useState('');

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    setIsLoading(true);
    const result = await loadPlants();
    if (result.isOk) {
      setPlants(result.value);
    } else {
      setError("Failed to load plants");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  const handleDelete = async (plantId: number) => {
    try {
      await deletePlant(plantId);
      fetchPlants();
    } catch (err) {
      setError("Failed to delete plant");
    }
  };

  const resetFormFields = () => {
    setPlantName('');
    setPlantDescription('');
    setPlantPrice(0);
    setPlantStockQuantity(0);
    setPlantImage('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppWrapper hideSidebar>
      <Container className="my-5">
        <Button variant="primary" onClick={() => setShowModal(true)}>Add Plant</Button>
        <Nav className="flex-column">
          {plants.map((plant) => (
            <div key={plant.id}>
              <h5>{plant.name}</h5>
              <p>{plant.description}</p>
              <Button variant="danger" onClick={() => handleDelete(plant.id)}>Delete</Button>
            </div>
          ))}
        </Nav>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Plant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Form fields for plant details */}
            {/* ... */}
          </Form>
        </Modal.Body>
      </Modal>
      </AppWrapper>
    </>
  );
};
