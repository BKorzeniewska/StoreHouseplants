import React, { useEffect, useState } from 'react';
import {Button, Container, Pagination, Modal, Form, Col, Row, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import {
  Plant,
  loadPlants,
  deletePlant,
  Position,
  CreatePlantRequest,
  createPlant,
  ModifyPlantRequest, modifyPlant, PlantDelivery, deliveryPlant, loadPlantById
} from "../../plant/apis/plant";
import { AppWrapper } from "../../common/AppWrapper";
import {GroundType} from "../../ground/apis/ground";
import {FaSort,  FaPen, FaTrash} from "react-icons/fa";
import {FaArrowDown91, FaArrowUpAZ, FaPlusMinus} from "react-icons/fa6";
import {
  createSpecies,
  CreateSpeciesRequest, loadSpecies,
  modifySpecies,
  ModifySpeciesRequest, Species
} from "../../plant/species/apis/species";



export const AdminPlantsScreen = () => {
  const { setError } = useError();
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [displayPlants, setDisplayPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [oldStockQuantity, setOldStockQuantity] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [plantId, setPlantId] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 12;
  const [sortAscending, setSortAscending] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalStock, setShowModalStock] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

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
        setError("Nie udało sie załadować roślin");
      }
    } catch (error) {
      setError("Nie udało sie załadować roślin");
    }
    setIsLoading(false);
  };
  const sortSpeciesByName = () => {
    setSortAscending(!sortAscending);
    setDisplayPlants([...displayPlants].sort((a, b) => {
      if (sortAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    }));
  };
  const handleCloseModal = () => {
    setShowModalAdd(false);
    setPlantId(0);
    setOldStockQuantity(0);
  };
  const handleOpenModal = () => {
    setShowModalAdd(true);
    console.log("idczek:"+plantId);
  };
  const handleOpenModalMod = async (plantId: number) => {
    setShowModalAdd(true);
    setPlantId(plantId);
  };
  const handleOpenModalMStock= async (plantId: number, count: number) => {
    setShowModalStock(true);
    setPlantId(plantId);
    setOldStockQuantity(count);
  };
  const handleOpenModalDel = async (plantId: number) => {
    setShowModal(true);
    setPlantId(plantId);
  };
  const handleDelete = async (plantId: number) => {
    try {
      await deletePlant(plantId);
      fetchPlants();
    } catch (err) {
      setError("Błąd w usuwaniu rośliny");
    }
    finally {
      setShowModal(false);
      setPlantId(0)
    }
  };

  const handleSubmitStock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      const request: PlantDelivery = {
        id: plantId,
        stockQuantity: stockQuantity
      };
      deliveryPlant(request).then((response) => {
        if (response.isOk) {
          window.location.reload();
        } else {
          console.log(response);
          setError("Nie udało się zmienić ilości");
        }
      });
      setShowModalStock(false);
      setPlantId(0)
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <AppWrapper hideSidebar>
        <AddPlant isShown={showModalAdd} onClose={handleCloseModal} id={plantId}/>
        <Container className="my-2 w-200">
          <div className="page-tile"> Rośliny </div>
          <hr className="h-10" />
          <div className="title-admin">
            <input
                type="text"
                placeholder="Wyszukaj po nazwie"
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <FaArrowUpAZ onClick={sortSpeciesByName}  style={{ fontSize: '30px' }}>
              <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
            </FaArrowUpAZ>
            <FaArrowDown91 onClick={sortSpeciesByName}  style={{ fontSize: '30px' }}>
              <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
            </FaArrowDown91>
            <button className="btn btn-success" onClick={handleOpenModal}>
              Dodaj roślinę
            </button>
          </div>
          <Row xs={1} md={1} lg={1} xl={6} className="g-4">
            {displayPlants.map(plant => (
                <Col key={plant.id}>
                  <Card>
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${plant.image}`} alt={plant.name} />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div className="title-container" style={{ padding: '10px' }}> {/* Adjust padding as needed */}
                        <Card.Title className="text-center card-title-custom mb-2">{plant.name}</Card.Title>
                      </div>
                      <div className="mt-auto">Ilość: {plant.stockQuantity}</div>
                      <div className="icons mt-2">
                        <FaPen style={{ fontSize: '25px' }} onClick={() => handleOpenModalMod(plant.id)}></FaPen>
                        <FaPlusMinus style={{ fontSize: '25px', marginLeft: '38px', marginRight: '40px' }} onClick={() => handleOpenModalMStock(plant.id, plant.stockQuantity)}></FaPlusMinus>
                        <FaTrash style={{ fontSize: '25px' }} onClick={() => handleOpenModalDel(plant.id)}></FaTrash>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
            ))}
          </Row>


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
              <Button variant="danger" onClick={() => handleDelete(plantId)}>
                Tak
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={showModalStock} onHide={() => setShowModalStock(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Zmień ilość</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitStock}>
                <Form.Group className="mb-3">
                  <Form.Label>Obecna ilość</Form.Label>
                  <Form.Label>{oldStockQuantity}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nowa ilość</Form.Label>
                  <Form.Control
                      type="number"
                      placeholder="00"
                      value={stockQuantity}
                      onChange={(event) => setStockQuantity(parseInt(event.target.value))}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: '200px' }}>
                  Dodaj
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>

              <Button variant="secondary" style={{ width: '200px' }} onClick={() => setShowModalStock(false)}>
                Zamknij
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

  id:number
};



export const AddPlant: React.FC<Props> = ({ isShown, onClose, id }) => {
  const [plantName, setPlantName] = useState("");
  const [title, setTitle] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [plantImage, setPlantImage] = useState('');
  const [plantSpeciesId, setPlantSpeciesId] = useState<number>(0);
  const [plantDescription, setPlantDescription] = useState("");
  const [plantPrice, setPlantPrice] = useState(0);
  const [plantGroundType, setPlantGroundType] = useState<string>(GroundType.DESERT); // początkowa wartość jako string
  const [plantPosition, setPlantPosition] = useState<string>(Position.LIGHT); // początkowa wartość jako string
  const [plantBeginners, setPlantBeginners] = useState(false);
  const [plantCollectible, setPlantCollectible] = useState(false);
  const [plantStockQuantity, setPlantStockQuantity] = useState(0);
  const [species, setSpecies] = useState<Species[]>([]);
  const { setError } = useError();

  useEffect(() => {
    setTitle(id != 0? "Edytuj rośline": "Dodaj rośline");
    setButtonName(id != 0? "Zapisz zmiany": "Dodaj");
    const fetchSpecies = async () => {
      const result = await loadSpecies();
      if (result.isOk) {
        setSpecies(result.value);
      } else {
        setError("Nie udało się wczytać gatunków");
      }
    };
    const fetchPlantDetails = async () => {
      if (id !== 0) {
        const result = await loadPlantById(id.toString());
        if (result.isOk) {
          const plant = result.value;
          setPlantName(plant.name);
          setPlantImage(plant.image||"");
          setPlantSpeciesId(Number(plant.plantSpeciesId));
          setPlantDescription(plant.description);
          setPlantPrice(plant.price);
          setPlantGroundType(plant.groundType);
          setPlantPosition(plant.position);
          setPlantBeginners(plant.beginners);
          setPlantCollectible(plant.collectible);
          setPlantStockQuantity(plant.stockQuantity);
        } else {
          setError("Nie udało się wczytać danych rośliny");
        }
      }
    };
    fetchSpecies();

    fetchPlantDetails();
  }, [setError]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("id:");
    if( id != 0) {
      const request: ModifyPlantRequest = {
        id: Number(id),
        name: plantName,
        plantSpeciesId: plantSpeciesId,
        description: plantDescription,
        price: plantPrice,
        groundType: plantGroundType as GroundType,
        position: plantPosition as Position,
        beginners: plantBeginners,
        collectible: plantCollectible,
        stockQuantity: plantStockQuantity,
        image: plantImage
      };
      modifyPlant(request).then((response) => {
        if (response.isOk) {
          window.location.reload();
        } else {
          console.log(request);
          console.log(response);

          setError("Nie udało się dodać rośliny");
        }
      });
    }
    else{
      const request: CreatePlantRequest = {
        name: plantName,
        plantSpeciesId: plantSpeciesId,
        description: plantDescription,
        price: plantPrice,
        groundType: plantGroundType as GroundType,
        position: plantPosition as Position,
        beginners: plantBeginners,
        collectible: plantCollectible,
        stockQuantity: plantStockQuantity,
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
    }
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
        <Modal show={isShown} onHide={onClose}   size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
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
                <Form.Select
                    value={plantSpeciesId}
                    onChange={(event) => setPlantSpeciesId(parseInt(event.target.value))}>
                  <option value="">Wybierz gatunek</option>
                  {species.map((specie) => (
                      <option key={specie.id} value={specie.id}>{specie.name}</option>
                  ))}
                </Form.Select>
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
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Opis Rośliny</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Wprowadź opis rośliny"
                    value={plantDescription}
                    onChange={(event) => setPlantDescription(event.target.value)}
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
                <div/>
                <img src={plantImage ? `data:image/jpg;base64,${plantImage}` : 'placeholder.jpg'}
                     alt='Obraz'
                     onClick={handleImageClick}
                     style={{ maxWidth: '100px', maxHeight: '100px' }} />
                <div/>
                <input
                    type='file'
                    id='image-file'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
              </Form.Group>
              <hr/>
              <Button variant="primary" type="submit" style={{ marginLeft: '15px', width: '93%' }}>
                {buttonName}
              </Button>
              <Button variant="secondary" type="button" onClick={onClose} style={{ marginLeft: '15px', width: '93%', marginTop:'20px', color: 'white'}}>
                Zamknij
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
  );

};