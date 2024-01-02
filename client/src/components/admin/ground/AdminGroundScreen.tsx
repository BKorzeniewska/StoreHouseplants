import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Form, Pagination } from 'react-bootstrap';
import { useError } from "../../common/ErrorContext";
import { loadGrounds, createGround, updateGround, deleteGround, Ground, GroundType, CreateGroundRequest, ModifyGroundRequest } from "../../ground/apis/ground";
import { AppWrapper } from "../../common/AppWrapper";

export const AdminGroundsScreen = () => {
    const { setError } = useError();
    const [allGrounds, setAllGrounds] = useState<Ground[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 7;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchGrounds();
    }, [pageNumber]);

    const fetchGrounds = async () => {
        setIsLoading(true);
        try {
            const result = await loadGrounds();
            if (result.isOk) {
                setAllGrounds(result.value);
                setTotalPages(Math.ceil(result.value.length / itemsPerPage));
            } else {
                setError("Failed to load grounds");
            }
        } catch (error) {
            setError("Error loading grounds");
        }
        setIsLoading(false);
    };

    const handleDelete = async (groundId: number) => {
        // Implement delete logic
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <AddGround isShown={showModalAdd} onClose={() => setShowModalAdd(false)} />
            <Container className="my-5">
                <h2>Grounds</h2>
                <Button onClick={() => setShowModalAdd(true)}>Add Ground</Button>
                <hr />
                {allGrounds.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage).map(ground => (
                    <div key={ground.id}>
                        <p>{ground.name} - {ground.type}</p>
                        <Button variant="danger" onClick={() => handleDelete(ground.id)}>Delete</Button>
                    </div>
                ))}
                <Pagination>
                    {/* Pagination logic */}
                </Pagination>
            </Container>
        </AppWrapper>
    );
};

type AddGroundProps = {
    isShown: boolean;
    onClose: () => void;
};

export const AddGround: React.FC<AddGroundProps> = ({ isShown, onClose }) => {
    const [groundName, setGroundName] = useState('');
    const [groundType, setGroundType] = useState<string>(GroundType.DESERT);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const { setError } = useError();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request: CreateGroundRequest = {
            name: groundName,
            type: groundType  as GroundType,
            stockQuantity: stockQuantity,
            description: description,
            price: 0,
            image: image,
            // Other fields if needed
        };

        createGround(request).then((response) => {
            if (response.isOk) {
                window.location.reload();
            } else {
                console.log(response);
                setError("Nie udało się dodać podłoża");
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
                            onChange={(e) => setGroundName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroundType">
                        <Form.Label>Typ Ziemi</Form.Label>
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
                            onChange={(e) => setStockQuantity(parseInt(e.target.value))} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMoistureRetention">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter moisture retention"
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Grafika</Form.Label>
                        <img src={image ? `data:image/jpg;base64,${image}` : 'placeholder.jpg'}
                             alt='Grafika'
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" type="submit">Add</Button>
            </Modal.Footer>
        </Modal>
    );

};
