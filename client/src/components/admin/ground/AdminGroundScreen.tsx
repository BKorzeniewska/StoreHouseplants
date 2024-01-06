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
    CreateGroundRequest
} from "../../ground/apis/ground";
import { AppWrapper } from "../../common/AppWrapper";
import { FaSort } from "react-icons/fa";

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

    const sortGroundsByName = () => {
        setSortAscending(!sortAscending);
        setAllGrounds([...allGrounds].sort((a, b) => {
            return sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }));
    };

    const handleOpenModalDel = async (groundId: number) => {
        setShowModalD(true);
        setGroundId(groundId);
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
            <AddGround isShown={showModalA} onClose={() => setShowModalA(false)} id={groundId}/>
            <Container className="my-2 w-200">
                <div className="page-tile"> Grounds </div>
                <hr className="h-10" />
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="form-control"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaSort onClick={sortGroundsByName}>
                        <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                    </FaSort>
                    <button className="btn btn-success" onClick={() => setShowModalA(true)}>
                        Add Ground
                    </button>
                </div>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {displayGrounds.map(ground => (
                        <Col key={ground.id}>
                            <Card>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${ground.image}`} alt={ground.name} />
                                <Card.Body>
                                    <Card.Title>{ground.name}</Card.Title>
                                    {/* Add additional ground details */}
                                    <Button variant="danger" onClick={() => handleOpenModalDel(ground.id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination className='d-flex justify-content-center mt-4'>
                    {/* Pagination logic */}
                </Pagination>

                <Modal show={showModalD} onHide={() => setShowModalD(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Usunąć Roślinę?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Czy jesteś pewny, że chcesz usunąć roślinę?
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
    const [image, setImage] = useState('');
    const { setError } = useError();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const request: CreateGroundRequest = {
            name: groundName,
            type: groundType as GroundType,
            stockQuantity: stockQuantity,
            price: price,
            description: description,
            image: image,
        };

        try {
            const response = await createGround(request);
            if (response.isOk) {
                window.location.reload(); // Or use a more React-friendly method of updating the state/display
            } else {
                setError("Nie udało się dodać podłoża");
            }
        } catch (error) {
            setError("Error creating ground");
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
        <Modal show={isShown} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Ground</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroundName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter ground name"
                            value={groundName}
                            onChange={(e) => setGroundName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroundType">
                        <Form.Label>Ground Type</Form.Label>
                        <Form.Select
                            value={groundType}
                            onChange={(event) => setGroundType(event.target.value)}>
                            {Object.values(GroundType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStockQuantity">
                        <Form.Label>Stock Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter stock quantity"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(parseInt(e.target.value))} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <div onClick={handleImageClick}>
                            <img src={image ? `data:image/jpeg;base64,${image}` : 'placeholder.jpg'}
                                 alt='Ground Image'
                                 style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }} />
                        </div>
                        <input
                            type='file'
                            id='image-file'
                            accept='image/*'
                            onChange={handleImageChange}
                            style={{ display: 'none' }} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">Add</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
