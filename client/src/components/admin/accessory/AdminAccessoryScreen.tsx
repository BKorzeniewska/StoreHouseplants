import React, { useEffect, useState } from 'react';
import { Button, Container, Pagination, Modal, Form, Col, Row, Card } from 'react-bootstrap';
import {
    Accessory,
    Category,
    createAccessory, CreateAccessoryRequest,
    deleteAccessory,
    loadAccessoryById,
    loadAllAccessories, ModifyAccessoryRequest, updateAccessory
} from "../../accessory/accesory";
import { AppWrapper } from "../../common/AppWrapper";
import { useError } from "../../common/ErrorContext";
import { FaPen, FaTrash } from "react-icons/fa";
import {deletePlant, deliveryPlant, PlantDelivery} from "../../plant/apis/plant";
import {FaArrowDown91, FaArrowUpAZ, FaPlusMinus} from "react-icons/fa6";

export const AdminAccessoriesScreen = () => {
    const { setError } = useError();
    const [allAccessories, setAllAccessories] = useState<Accessory[]>([]);
    const [displayAccessories, setDisplayAccessories] = useState<Accessory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [accessoryId, setAccessoryId] = useState(0);
    const [oldStockQuantity, setOldStockQuantity] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);
    const itemsPerPage = 12;
    const [showModal, setShowModal] = useState(false);
    const [showModalStock, setShowModalStock] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [sortAscending, setSortAscending] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchAccessories();
    }, []);

    useEffect(() => {
        const filteredAccessories = searchTerm
            ? allAccessories.filter(accessory => accessory.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : allAccessories;

        setTotalPages(Math.ceil(filteredAccessories.length / itemsPerPage));
        setDisplayAccessories(filteredAccessories.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [allAccessories, pageNumber, searchTerm]);

    const fetchAccessories = async () => {
        setIsLoading(true);
        try {
            const result = await loadAllAccessories();
            if (result.isOk) {
                setAllAccessories(result.value);
            } else {
                setError("Nie udało się załadować akcesoriów");
            }
        } catch (error) {
            setError("Nie udało się załadować akcesoriów");
        }
        setIsLoading(false);
    };

    const sortAccessoriesByName = () => {
        setSortAscending(!sortAscending);
        setDisplayAccessories([...displayAccessories].sort((a, b) => {
            if (sortAscending) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        }));
    };

    const handleOpenModal = () => {
        setShowModalAdd(true);
    };
    const handleOpenModalMStock= async (plantId: number, count: number) => {
        setShowModalStock(true);
        setAccessoryId(plantId);
        setOldStockQuantity(count);
    };
    const handleCloseModal = () => {
        setShowModalAdd(false);
        setAccessoryId(0);
        setOldStockQuantity(0);
    };

    const handleOpenModalEdit = (id: number) => {
        setAccessoryId(id);
        setShowModalAdd(true);
    };

    const handleOpenModalDelete = async (id: number) => {
        setShowModal(true);
        setAccessoryId(id);
    };
    const handleSubmitStock = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //TODO
        setShowModalStock(false);
        setAccessoryId(0)
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAccessory(id);
            fetchAccessories();
        } catch (err) {
            setError("Błąd w usuwaniu rośliny");
        }
        finally {
            setShowModal(false);
            setAccessoryId(0);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <AddAccessory isShown={showModalAdd} onClose={handleCloseModal} id={accessoryId}/>
            <Container className="my-2 w-200">
                <div className="page-tile"> Akcesoria </div>
                <hr className="h-10" />
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaArrowUpAZ onClick={sortAccessoriesByName} style={{ fontSize: '30px' }} />
                    <FaArrowDown91 onClick={sortAccessoriesByName} style={{ fontSize: '30px' }} />
                    <button className="btn btn-success" onClick={handleOpenModal}>Dodaj akcesorium</button>
                </div>
                <Row xs={1} md={1} lg={1} xl={6} className="g-4">
                    {displayAccessories.map(accessory => (
                        <Col key={accessory.id}>
                            <Card>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${accessory.image}`} alt={accessory.name} />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div className="title-container" style={{ padding: '10px' }}> {/* Adjust padding as needed */}
                                        <Card.Title className="text-center card-title-custom mb-2">{accessory.name}</Card.Title>
                                    </div>
                                    <div className="mt-auto">Ilość: {accessory.stockQuantity}</div>
                                    <div className="icons mt-2">
                                        <FaPen style={{ fontSize: '25px' }} onClick={() => handleOpenModalEdit(accessory.id)}></FaPen>
                                        <FaPlusMinus style={{ fontSize: '25px', marginLeft: '38px', marginRight: '40px' }} onClick={() => handleOpenModalMStock(accessory.id, accessory.stockQuantity)}></FaPlusMinus>
                                        <FaTrash style={{ fontSize: '25px' }} onClick={() => handleOpenModalDelete(accessory.id)}></FaTrash>
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
                        <Modal.Title>Usunąć akcesorium?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Czy jesteś pewny, że chcesz usunąć akcesorium?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Nie
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(accessoryId)}>
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
};

type Props = {
    isShown: boolean;
    onClose: () => void;
    id: number;
};
export const AddAccessory: React.FC<Props> = ({ isShown, onClose, id }) => {
    const { setError } = useError();
    const [accessoryName, setAccessoryName] = useState("");
    const [accessoryDescription, setAccessoryDescription] = useState("");
    const [accessoryPrice, setAccessoryPrice] = useState(0);
    const [accessoryStockQuantity, setAccessoryStockQuantity] = useState(0);
    const [accessoryCategory, setAccessoryCategory] = useState<Category>(Category.POTS);
    const [accessoryImage, setAccessoryImage] = useState('');
    const [title, setTitle] = useState("");
    const [buttonName, setButtonName] = useState("");

    useEffect(() => {
        setTitle(id !== 0 ? "Edytuj Akcesorium" : "Dodaj Akcesorium");
        setButtonName(id !== 0 ? "Zapisz zmiany" : "Dodaj");
        if (id !== 0) {
            const fetchAccessory = async () => {
                const result = await loadAccessoryById(id.toString());
                if (result.isOk) {
                    const acc = result.value;
                    setAccessoryName(acc.name);
                    setAccessoryDescription(acc.description);
                    setAccessoryPrice(acc.price);
                    setAccessoryStockQuantity(acc.stockQuantity);
                    setAccessoryCategory(acc.category);
                    setAccessoryImage(acc.image || "");
                } else {
                    setError("Nie udało się wczytać danych akcesorium");
                }
            };
            fetchAccessory();
        }
    }, [id, setError]);

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
                    setAccessoryImage(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id !== 0) {
            const modifyRequest: ModifyAccessoryRequest= {
                id: id,
                name: accessoryName,
                description: accessoryDescription,
                price: accessoryPrice,
                stockQuantity: accessoryStockQuantity,
                category: accessoryCategory,
                image: accessoryImage
            };
            updateAccessory(modifyRequest).then((response) => {
                if (response.isOk) {
                    window.location.reload();
                } else {
                    console.log(modifyRequest);
                    console.log(response);
                    setError("Nie udało się edytować akcesorium");
                }
            });
        } else {
            const createRequest: CreateAccessoryRequest = {
                name: accessoryName,
                description: accessoryDescription,
                price: accessoryPrice,
                stockQuantity: accessoryStockQuantity,
                category: accessoryCategory,
                image: accessoryImage
            };
            createAccessory(createRequest).then((response) => {
                if (response.isOk) {
                    window.location.reload();
                } else {
                    console.log(createRequest);
                    console.log(response);
                    setError("Nie udało się dodać akcesorium");
                }
            });
        }
        onClose();
    };

    return (
        <Modal show={isShown} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nazwa akcesorium</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź nazwę akcesorium"
                            value={accessoryName}
                            onChange={(e) => setAccessoryName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Wprowadź opis akcesorium"
                            value={accessoryDescription}
                            onChange={(e) => setAccessoryDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cena</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Wprowadź cenę"
                            value={accessoryPrice}
                            onChange={(e) => setAccessoryPrice(parseFloat(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ilość na stanie</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Wprowadź ilość na stanie"
                            value={accessoryStockQuantity}
                            onChange={(e) => setAccessoryStockQuantity(parseInt(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Kategoria</Form.Label>
                        <Form.Select
                            value={accessoryCategory}
                            onChange={(e) => setAccessoryCategory(e.target.value as Category)}>
                            {Object.values(Category).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Obraz akcesorium</Form.Label>
                        <div/>
                        <img
                            src={accessoryImage ? `data:image/jpg;base64,${accessoryImage}` : 'placeholder.jpg'}
                            alt="Obraz "
                            onClick={handleImageClick}
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
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
                    <Button variant="primary" type="submit" style={{marginLeft:"10px", width: '97%' }}>
                        {buttonName}
                    </Button>
                    <Button variant="secondary" type="button" onClick={onClose} style={{ marginLeft:"10px", width: '97%', marginTop:'20px', color: 'white'}}>
                        Zamknij
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};