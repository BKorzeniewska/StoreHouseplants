import React, { useEffect, useState } from 'react';
import { Button, Container, Pagination, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import {Plant, loadPlants, deletePlant, Position, CreatePlantRequest, createPlant} from "../../plant/apis/plant";
import { AppWrapper } from "../../common/AppWrapper";
import {GroundType} from "../../ground/apis/ground";



export const AdminPlantsScreen = () => {
  const { setError } = useError();
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [displayPlants, setDisplayPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 7;
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [addPlant, setAddPlant] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    const filteredPlants = searchTerm
        ? allPlants.filter(plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : allPlants;

    setTotalPages(Math.ceil(filteredPlants.length / itemsPerPage));
    setDisplayPlants(filteredPlants.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
  }, [allPlants, pageNumber, searchTerm]);

  const fetchPlants = async () => {
    setIsLoading(true);
    try {
      const result = await loadPlants();
      if (result.isOk) {
        setAllPlants(result.value);
      } else {
        setError("Failed to load plants");
      }
    } catch (error) {
      setError("Error loading plants");
    }
    setIsLoading(false);
  };
  const handleCloseModal = () => {
    setShowModalAdd(false);
  };
  const handleOpenModal = () => {
    setShowModalAdd(true);
  };
  const handleDelete = async (plantId: number) => {
    try {
      await deletePlant(plantId);
      fetchPlants();
    } catch (err) {
      setError("Failed to delete plant");
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <AppWrapper hideSidebar>
        <AddPlant isShown={showModalAdd} onClose={handleCloseModal}/>
        <Container className="my-5">
          <h2>Rośliny </h2>
          <button className="btn btn-success" onClick={handleOpenModal}>
            Dodaj rozdział
          </button>
          <hr />
          <input
              type="text"
              placeholder="Wyszukaj po nazwie"
              className="form-control mb-4"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
          />

          {displayPlants.map(plant => (
              <div
                  className="custom-list-item d-flex justify-content-between align-items-start"
                  key={plant.id}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{plant.name}</div>
                  {plant.description}
                </div>
                <div className='option-section'>
                  <Button variant="danger" onClick={() => handleDelete(plant.id)}>Delete</Button>
                </div>
              </div>
          ))}

          <Pagination className='d-flex justify-content-center mt-4'>
            <Pagination.First onClick={() => setPageNumber(1)} disabled={pageNumber === 1} />
            <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Pagination.Item
                    key={page}
                    active={page === pageNumber}
                    onClick={() => setPageNumber(page)}
                >
                  {page}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages} />
            <Pagination.Last onClick={() => setPageNumber(totalPages)} disabled={pageNumber === totalPages} />
          </Pagination>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Usunąć Roślinę?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Czy jesteś pewny, że chcesz usunąć roślinę?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Nie
              </Button>
              <Button variant="danger" onClick={() => {}
              }>
                Tak
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Usunąć Roślinę?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Czy jesteś pewny, że chcesz usunąć roślinę?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Nie
              </Button>
              <Button variant="danger" onClick={() => {/* Logika usunięcia rośliny */
              }}>
                Tak
              </Button>
            </Modal.Footer>
          </Modal>

        </Container>
      </AppWrapper>
  );
}
type Props = {
  isShown: boolean;
  onClose: () => void;
};



export const AddPlant: React.FC<Props> = ({ isShown, onClose }) => {
  const [plantName, setPlantName] = useState("");
  const [plantImage, setPlantImage] = useState('');
  const [plantSpeciesId, setPlantSpeciesId] = useState<number | undefined>(undefined);
  const [plantDescription, setPlantDescription] = useState("");
  const [plantPrice, setPlantPrice] = useState(0);
  const [plantGroundType, setPlantGroundType] = useState<string>(GroundType.DESERT); // początkowa wartość jako string
  const [plantPosition, setPlantPosition] = useState<string>(Position.LIGHT); // początkowa wartość jako string
  const [plantBeginners, setPlantBeginners] = useState(false);
  const [plantCollectible, setPlantCollectible] = useState(false);
  const [plantStockQuantity, setPlantStockQuantity] = useState(0);
  const { setError } = useError();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request: CreatePlantRequest = {
      name: "plantName",
      plantSpeciesId: 1,
      description: "plantDescription",
      price: 45,
      groundType: GroundType.DESERT,
      position: Position.LIGHT,
      beginners: true,
      collectible: true,
      stockQuantity: 500,
      image: plantImage
    };
    createPlant(request).then((response) => {
      if (response.isOk) {
        window.location.reload();
      } else {
        console.log(request);
        console.log(response);

        setError("Nie udało się dodać rośliny");
      }
    });
    onClose();
  };

  const handleImageClick = () => {
    const imageFileInput = document.getElementById('image-file') as HTMLInputElement;
    imageFileInput?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result.toString().split(',')[1];
          setPlantImage(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <>
        <Modal show={isShown} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dodaj Roślinę</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa Rośliny</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nazwa rośliny"
                    autoFocus
                    value={plantName}
                    onChange={(event) => setPlantName(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gatunek</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="ID Gatunku"
                    value={plantSpeciesId}
                    onChange={(event) => setPlantSpeciesId(parseInt(event.target.value))}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroundType">
                <Form.Label>Typ Ziemi</Form.Label>
                <Form.Select
                    value={plantGroundType}
                    onChange={(event) => setPlantGroundType(event.target.value)}>
                  {Object.values(GroundType).map(type => (
                      <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPosition">
                <Form.Label>Pozycja</Form.Label>
                <Form.Select
                    value={plantPosition}
                    onChange={(event) => setPlantPosition(event.target.value)}>
                  {Object.values(Position).map(position => (
                      <option key={position} value={position}>{position}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCollectible">
                <Form.Check
                    type="checkbox"
                    label="Roślina kolekcjonerska"
                    checked={plantCollectible}
                    onChange={(event) => setPlantCollectible(event.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBeginners">
                <Form.Check
                    type="checkbox"
                    label="Prosta w uprawie"
                    checked={plantBeginners}
                    onChange={(event) => setPlantBeginners(event.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="00,00"
                    value={plantPrice}
                    onChange={(event) => setPlantPrice(parseFloat(event.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ilość na stanie</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="00"
                    value={plantStockQuantity}
                    onChange={(event) => setPlantStockQuantity(parseInt(event.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Obraz Rośliny</Form.Label>
                <img src={plantImage ? `data:image/jpg;base64,${plantImage}` : 'placeholder.jpg'}
                     alt='Obraz Rośliny'
                     onClick={handleImageClick}
                     style={{ maxWidth: '100px', maxHeight: '100px' }} />
                <input
                    type='file'
                    id='image-file'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Dodaj
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Zamknij
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );

};