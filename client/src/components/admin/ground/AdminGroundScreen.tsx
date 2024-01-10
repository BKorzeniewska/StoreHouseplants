import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Form, Pagination, Col, Card, Row } from 'react-bootstrap';
import { useError } from "../../common/ErrorContext";
import {
    loadGrounds,
    createGround,
    updateGround,
    deleteGround,
    Ground,
    GroundType,
    CreateGroundRequest, ModifyGroundRequest, loadGroundById
} from "../../ground/apis/ground";
import { AppWrapper } from "../../common/AppWrapper";
import {FaPen, FaSort, FaTrash} from "react-icons/fa";
import {FaArrowDown91, FaArrowUpAZ, FaPlusMinus} from "react-icons/fa6";
import {AddAccessory} from "../accessory/AdminAccessoryScreen";

export const AdminGroundsScreen = () => {
    const { setError } = useError();
    const [allGrounds, setAllGrounds] = useState<Ground[]>([]);
    const [groundId, setGroundId] = useState<number>(0);
    const [displayGrounds, setDisplayGrounds] = useState<Ground[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAscending, setSortAscending] = useState(true);
    const itemsPerPage = 12;
    const [totalPages, setTotalPages] = useState(0);
    const [showModalA, setShowModalA] = useState(false);
    const [oldStockQuantity, setOldStockQuantity] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [showModalStock, setShowModalStock] = useState(false);
    const [showModalD, setShowModalD] = useState(false);

    useEffect(() => {
        fetchGrounds();
    }, []);

    useEffect(() => {
        const filteredGrounds = searchTerm
            ? allGrounds.filter(ground => ground.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : allGrounds;

        setTotalPages(Math.ceil(filteredGrounds.length / itemsPerPage));
        setDisplayGrounds(filteredGrounds.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [allGrounds, pageNumber, searchTerm, sortAscending]);

    const fetchGrounds = async () => {
        setIsLoading(true);
        try {
            const result = await loadGrounds();
            if (result.isOk) {
                setAllGrounds(result.value);
            } else {
                setError("Failed to load grounds");
            }
        } catch (error) {
            setError("Error loading grounds");
        }
        setIsLoading(false);
    };
    const handleOpenModal = () => {
        setShowModalA(true);
    };

    const sortGroundsByName = () => {
        setSortAscending(!sortAscending);
        setAllGrounds([...allGrounds].sort((a, b) => {
            return sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }));
    };

    const handleOpenModalMStock= async (plantId: number, count: number) => {
        setShowModalStock(true);
        setGroundId(plantId);
        setOldStockQuantity(count);
    };
    const handleCloseModal = () => {
        setShowModalA(false);
        setGroundId(0);
        setOldStockQuantity(0);
    };

    const handleOpenModalEdit = (id: number) => {
        setGroundId(id);
        setShowModalA(true);
    };

    const handleOpenModalDelete = async (id: number) => {
        setShowModalD(true);
        setGroundId(id);
    };
    const handleSubmitStock = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //TODO
        setShowModalStock(false);
        setGroundId(0)
    };
    const handleDelete = async (groundId: number) => {
        try {
            await deleteGround(groundId);
            fetchGrounds();
        } catch (err) {
            setError("Błąd w usuwaniu podłoża");
        }
        finally {
            setShowModalD(false);
            setGroundId(0)
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <AddGround isShown={showModalA} onClose={handleCloseModal} id={groundId}/>
            <Container className="my-2 w-200">
                <div className="page-tile"> Podłoża </div>
                <hr className="h-10" />
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaArrowUpAZ onClick={sortGroundsByName} style={{ fontSize: '30px' }} />
                    <FaArrowDown91 onClick={sortGroundsByName} style={{ fontSize: '30px' }} />
                    <button className="btn btn-success" onClick={handleOpenModal}>Dodaj podłoże</button>
                </div>
                <Row xs={6} className="g-4">
                    {displayGrounds.map(ground => (
                        <Col key={ground.id}>
                            <Card>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${ground.image}`} alt={ground.name} />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div className="title-container" style={{ padding: '10px' }}> {/* Adjust padding as needed */}
                                        <Card.Title className="text-center card-title-custom mb-2">{ground.name}</Card.Title>
                                    </div>
                                    <div className="mt-auto"><strong>Ilość:</strong> {ground.stockQuantity}</div>
                                    <div className="icons mt-2">
                                        <FaPen style={{ fontSize: '25px' }} onClick={() => handleOpenModalEdit(ground.id)}></FaPen>
                                        <FaPlusMinus style={{ fontSize: '25px', marginLeft: '38px', marginRight: '40px' }} onClick={() => handleOpenModalMStock(ground.id, ground.stockQuantity)}></FaPlusMinus>
                                        <FaTrash style={{ fontSize: '25px' }} onClick={() => handleOpenModalDelete(ground.id)}></FaTrash>
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

                <Modal show={showModalD} onHide={() => setShowModalD(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Usunąć podłoże?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Czy jesteś pewny, że chcesz usunąć podłoże?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModalD(false)}>
                            Nie
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(groundId)}>
                            Tak
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </AppWrapper>
    );
};
type Props = {
    isShown: boolean;
    onClose: () => void;

    id:number
};

export const AddGround: React.FC<Props> = ({ isShown, onClose, id}) => {
    const [groundName, setGroundName] = useState('');
    const [groundType, setGroundType] = useState<string>(GroundType.DESERT);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState("");
    const [buttonName, setButtonName] = useState("");
    const [image, setImage] = useState('');
    const { setError } = useError();
    useEffect(() => {
        setTitle(id !== 0 ? "Edytuj podłoże" : "Dodaj podłoże");
        setButtonName(id !== 0 ? "Zapisz zmiany" : "Dodaj");

        const fetchGroundDetails = async () => {
            if (id !== 0) {
                const result = await loadGroundById(id.toString());
                if (result.isOk) {
                    const ground = result.value;
                    setGroundName(ground.name);
                    setGroundType(ground.type);
                    setStockQuantity(ground.stockQuantity);
                    setPrice(ground.price);
                    setDescription(ground.description);
                    setImage(ground.image);
                } else {
                    setError("Nie udało się wczytać danych podłoża");
                }
            }
        };

        fetchGroundDetails();
    }, [id, setError]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (id !== 0) {
            // Modyfikacja istniejącego podłoża
            const request: ModifyGroundRequest = {
                id:id,
                name: groundName,
                type: groundType as GroundType,
                stockQuantity: stockQuantity,
                price: price,
                description: description,
                image: image,
            };

            updateGround(request).then((response) => {
                if (response.isOk) {
                    window.location.reload();
                } else {
                    setError("Nie udało się zmodyfikować podłoża");
                }
            });
        } else {
            // Tworzenie nowego podłoża
            const request: CreateGroundRequest = {
                name: groundName,
                type: groundType as GroundType,
                stockQuantity: stockQuantity,
                price: price,
                description: description,
                image: image,
            };

            createGround(request).then((response) => {
                if (response.isOk) {
                    window.location.reload();
                } else {
                    setError("Nie udało się dodać podłoża");
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
                    setImage(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal show={isShown} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroundName">
                        <Form.Label>Nazwa podłoża</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź nazwe"
                            value={groundName}
                            onChange={(e) => setGroundName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroundType">
                        <Form.Label>Typ</Form.Label>
                        <Form.Select
                            value={groundType}
                            onChange={(event) => setGroundType(event.target.value)}>
                            {Object.values(GroundType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStockQuantity">
                        <Form.Label>Ilość na stanie</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Wprowadź ilość"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(parseInt(e.target.value))} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Cena</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Wprowadź cene"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź opis"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Obraz Rośliny</Form.Label>
                        <div onClick={handleImageClick}>
                            <img src={image ? `data:image/jpeg;base64,${image}` : 'placeholder.jpg'}
                                 alt='Grafika'
                                 style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }} />
                        </div>
                        <input
                            type='file'
                            id='image-file'
                            accept='image/*'
                            onChange={handleImageChange}
                            style={{ display: 'none' }} />
                    </Form.Group>

                    <hr/>
                    <Button variant="primary" type="submit" style={{ marginLeft: '10px', width: '97%' }}>
                        {buttonName}
                    </Button>
                    <Button variant="secondary" type="button" onClick={onClose} style={{ marginLeft: '10px', width: '97%', marginTop:'20px', color: 'white'}}>
                        Zamknij
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
};
