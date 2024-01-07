import React, { useEffect, useState } from 'react';
import {Button, Container, Pagination, Modal, Form, Col, Card, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import { AppWrapper } from "../../common/AppWrapper";
import {
  createSpecies,
  CreateSpeciesRequest,
  deleteSpecies,
  loadSpecies, loadSpeciesById, modifySpecies, ModifySpeciesRequest,
  Species
} from "../../plant/species/apis/species";
import {FaSort} from "react-icons/fa";
import {FaArrowDown91, FaArrowUpAZ} from "react-icons/fa6";



export const AdminSpeciesScreen = () => {
  const { setError } = useError();
  const [allSpecies, setAllSpecies] = useState<Species[]>([]);
  const [displaySpecies, setDisplaySpecies] = useState<Species[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  const [sortAscending, setSortAscending] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [speciesId, setSpeciesId] =  useState<number>(0);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [addPlant, setAddPlant] = useState(false);

  useEffect(() => {
    fetchSpecies();
  }, []);

  useEffect(() => {
    const filteredSpecies = searchTerm
        ? allSpecies.filter(species => species.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : allSpecies;

    setTotalPages(Math.ceil(filteredSpecies.length / itemsPerPage));
    setDisplaySpecies(filteredSpecies.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
  }, [allSpecies, pageNumber, searchTerm]);

  const fetchSpecies = async () => {
  setIsLoading(true);
  try {
    const result = await loadSpecies();
    if (result.isOk) {
      setAllSpecies(result.value);
    } else {
      setError("Failed to load species");
    }
  } catch (error) {
    setError("Error loading species");
  }
  setIsLoading(false);
};

  const sortSpeciesByName = () => {
    setSortAscending(!sortAscending);
    setDisplaySpecies([...displaySpecies].sort((a, b) => {
      if (sortAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    }));
  };
  const handleCloseModal = () => {
    setShowModalAdd(false);
  };
  const handleOpenModal = () => {
    setShowModalAdd(true);
  };
  const handleOpenModalDelete = async (speciesId: number) => {
    setShowModal(true);
    setSpeciesId(speciesId);
  };
  const handleOpenModalModify = async (speciesId: number) => {
    setShowModalAdd(true);
    setSpeciesId(speciesId);
  };
  const handleDelete = async (speciesId: number) => {
    try {
      await deleteSpecies(speciesId);
      fetchSpecies ();
    } catch (err) {
      setError("Nie udało się usunąć gatunku");
    }
    finally {
      setShowModal(false);
      setSpeciesId(0);
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <AppWrapper hideSidebar>
        <AddSpecies isShown={showModalAdd} onClose={handleCloseModal} id={speciesId}/>
        <Container className="my-2 w-200">
          <div className="page-tile"> Gatunki roślin</div>
          <hr className="h-10" />
        <div className="title-admin">
          <input
              type="text"
              placeholder="Wyszukaj po nazwie"
              className="form-control "
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
          />
          <FaArrowUpAZ onClick={sortSpeciesByName}  style={{ fontSize: '30px' }}>
            <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
          </FaArrowUpAZ>

          <button className="btn btn-success " onClick={handleOpenModal}>
            Dodaj gatunek
          </button>
        </div>
          <Row xs={5}   className="g-4">
            {displaySpecies.map(species => (
                <Col key={species.id}>
                  <Card>
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${species?.image}`} alt={species?.name} />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title className="text-center card-title-custom h-25">{species.name}</Card.Title>

                        <Button className="btn btn-warning w-100 m-1 h-22 text-center " style={{ fontSize: '13px' }} onClick={() => handleOpenModalModify(species.id)}> Edytuj </Button>
                        <Button className="btn btn-success w-100 m-1 h-22 text-center " style={{ fontSize: '13px' }}  onClick={() => handleOpenModalDelete(species.id)} > Usuń </Button>

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

          <Modal show={showModal} onHide={() => setShowModal(false) }>
            <Modal.Header closeButton>
              <Modal.Title>Usunąć gatunek?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Czy jesteś pewny, że chcesz usunąć gatunek?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Nie
              </Button>
              <Button variant="danger" onClick={() => handleDelete(speciesId)}>
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
  id: number;
  onClose: () => void;
};



export const AddSpecies: React.FC<Props> = ({ isShown, onClose, id }) => {
  const [speciesName, setSpeciesName] = useState("");
  const [speciesImage, setSpeciesImage] = useState('');
  const { setError } = useError();

  useEffect(() => {
    if (id !== 0) {
      loadSpeciesById(id.toString()).then(speciesResult => {
        if (speciesResult.isOk) {
          setSpeciesName(speciesResult.value.name);
          setSpeciesImage(speciesResult.value.image || "");
        } else {
          setError('Failed to load species details');
        }
      });
    }
  }, [id, setError]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if( id != 0)    {
      const request: ModifySpeciesRequest = {
        id: id,
        name: speciesName,
        image: speciesImage
      };
      modifySpecies(request).then((response) => {
        if (response.isOk) {
          window.location.reload();
        } else {
          console.log(response);
          setError("Nie udało się edytować gatunku");
        }
      });
    }
    else {
      const request: CreateSpeciesRequest = {
        name: speciesName,
        image: speciesImage
      };
      createSpecies(request).then((response) => {
        if (response.isOk) {
          window.location.reload();
        } else {
          console.log(response);
          setError("Nie udało się dodać gatunku");
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
          setSpeciesImage(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <>
        <Modal show={isShown} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dodaj gatunek</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa gatunku</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nazwa gatunku"
                    autoFocus
                    value={speciesName}
                    onChange={(event) => setSpeciesName(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Grafika</Form.Label>
                <div/>
                <img src={speciesImage ? `data:image/jpg;base64,${speciesImage}` : 'placeholder.jpg'}
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
              Dodaj
              </Button>
              <Button variant="secondary" type="button" onClick={onClose} style={{ marginLeft: '15px', width: '93%', marginTop:'17px', color: 'white'}}>
                Zamknij
              </Button>

            </Form>
          </Modal.Body>
        </Modal>
      </>
  );

};