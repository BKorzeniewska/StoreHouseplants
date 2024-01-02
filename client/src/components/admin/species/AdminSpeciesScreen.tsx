import React, { useEffect, useState } from 'react';
import { Button, Container, Pagination, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import { AppWrapper } from "../../common/AppWrapper";
import {
  createSpecies,
  CreateSpeciesRequest,
  deleteSpecies,
  loadSpecies,
  Species
} from "../../plant/species/apis/species";



export const AdminSpeciesScreen = () => {
  const { setError } = useError();
  const [allSpecies, setAllSpecies] = useState<Species[]>([]);
  const [displaySpecies, setDisplaySpecies] = useState<Species[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 7;
  const [showModal, setShowModal] = useState(false);
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
  const handleCloseModal = () => {
    setShowModalAdd(false);
  };
  const handleOpenModal = () => {
    setShowModalAdd(true);
  };
  const handleDelete = async (speciesId: number) => {
    try {
      await deleteSpecies(speciesId);
      fetchSpecies ();
    } catch (err) {
      setError("Nie udało się usunąć gatunku");
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <AppWrapper hideSidebar>
        <AddSpecies isShown={showModalAdd} onClose={handleCloseModal}/>
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

          {displaySpecies.map(species => (
              <div
                  className="custom-list-item d-flex justify-content-between align-items-start"
                  key={species.id}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{species.name}</div>
                </div>
                <div className='option-section'>
                  <Button variant="danger" onClick={() => handleDelete(species.id)}>Delete</Button>
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
              <Modal.Title>Usunąć gatunek?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Czy jesteś pewny, że chcesz usunąć gatunek?
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

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Usunąć Gatunek?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Czy jesteś pewny, że chcesz usunąć gatunek?
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



export const AddSpecies: React.FC<Props> = ({ isShown, onClose }) => {
  const [speciesName, setSpeciesName] = useState("");
  const [speciesImage, setSpeciesImage] = useState('');
  const { setError } = useError();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
                <img src={speciesImage ? `data:image/jpg;base64,${speciesImage}` : 'placeholder.jpg'}
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