import React, { useEffect, useState } from 'react';
import {Button, Container, Form, Modal} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import {
    Delivery,
    loadDeliverys,
    deleteDelivery,
    updateDelivery,
    ModifyDeliveryRequest, loadDeliveryById, CreateDeliveryRequest, createDelivery, DeliveryErrors
} from "../../cart/delivery/apis/delivery";
import { AppWrapper } from '../../common/AppWrapper';
import { useError } from '../../common/ErrorContext';
import './admin-deliveries.css';
import {APIError} from "../../common/axiosFetch";
import {Result} from "../../common/poliTypes";

export const AdminDeliveriesScreen = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [deliver, setDeliver] = useState<Delivery>();
    const [displayDelivery, setDisplayDelivery] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deliveriesId, setDeliveriesID] = useState(0);
    const [blocked, setBlocked] = useState(0);
    const itemsPerPage = 10;
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [deliveryDescription, setDeliveryDescription] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [deliveryToDelete, setDeliveryToDelete] = useState<Delivery | null>(null);
    const { setError } = useError();
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalBlock, setShowModalBlock] = useState(false);



    useEffect(() => {
        fetchSpecies();
    }, []);

    useEffect(() => {
        const filteredSpecies = searchTerm
            ? deliveries.filter(delivery => delivery.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : deliveries;

        setTotalPages(Math.ceil(filteredSpecies.length / itemsPerPage));
        setDisplayDelivery(filteredSpecies.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [deliveries, pageNumber, searchTerm]);

    const fetchSpecies = async () => {
        setIsLoading(true);
        try {
            const result = await loadDeliverys();
            if (result.isOk) {
                setDeliveries(result.value);
            } else {
                setError("Błąd w ładowaniu  sposobów dostaw");
            }
        } catch (error) {
            setError("Błąd w ładowaniu sposobów dostaw");
        }
        setIsLoading(false);
    };

    const handleBlockUnblockDelivery = (delivery: Delivery) => {
        const updatedDelivery = { ...delivery, description: deliveryDescription, blocked: !delivery.blocked };
        updateDelivery(updatedDelivery).then(response => {
            if (response.isOk) {
                setDeliveries(prevDeliveries =>
                    prevDeliveries.map(d => d.id === delivery.id ? updatedDelivery : d)
                );
            } else {
                setError('Failed to update delivery status');
            }
        });
        setDeliveryDescription(""); // Reset opisu po zablokowaniu/odblokowaniu
        setShowModalBlock(false);
    };
    const handleCloseModal = () => {
        setShowModalAdd(false);
    };
    const handleOpenModalModify = async (speciesId: number) => {
        setShowModalAdd(true);
        setDeliveriesID(speciesId);
    };
    const handleOpenModal = () => {
        setShowModalAdd(true);
    };
    const handleOpenModalBlock = (delivery:Delivery) => {
        setShowModalBlock(true);
        setDeliver(delivery);
    };

    const handleDeleteDelivery = () => {
        if (deliveryToDelete?.id) {
            deleteDelivery(deliveryToDelete.id).then(response => {
                if (response.isOk) {
                    setDeliveries(prevDeliveries => prevDeliveries.filter(d => d.id !== deliveryToDelete.id));
                    setShowModal(false);
                } else {
                    setError('Failed to delete delivery');
                }
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
//
    return (
        <AppWrapper hideSidebar>
            <AddDelivery isShown={showModalAdd} onClose={handleCloseModal} id={deliveriesId}/>
            <Container className="my-2 w-200">
                <div className="page-tile"> Sposoby dostaw</div>
                <hr className="h-10" />
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control "
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />

                    <button className="btn btn-success "  onClick={handleOpenModal}>
                        Dodaj dostawce
                    </button>
                </div>
                    {deliveries &&
                        deliveries.map(delivery => (
                            <div
                                className={`border rounded p-3 mb-4`}
                                style={ {display:'flex', alignItems: 'center', marginTop:'6px'}}
                                onClick={() => { }}
                            >
                                <div key={delivery.id} className="delivery-item">
                                    <div className="fw-bold">{delivery.name}</div>
                                    <div className=" add-to-cart">
                                    <div style={ {display:'initial'}}>

                                        <div>{delivery.description}</div>
                                        <div>{delivery.price}</div>
                                     </div>
                                    <div className='option-section'>
                                        <Button variant={delivery.blocked ? 'danger' : 'success'}
                                                onClick={delivery.blocked ? () => handleBlockUnblockDelivery(delivery): () =>   handleOpenModalBlock(delivery)}>
                                            {delivery.blocked ? 'Odblokuj' : 'Zablokuj'}
                                        </Button>
                                        <FaTrash onClick={() => { setDeliveryToDelete(delivery); setShowModal(true); }} />
                                    </div>
                                    </div>
                        </div>

                                <hr/>
                            </div>

                ))}

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Usuń spsoób dostawy </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Jesteś pewny że chcesz usunąć {deliveryToDelete?.name}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Anuluj</Button>
                        <Button variant="danger" onClick={handleDeleteDelivery}>Usuń</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModalBlock} onHide={() => setShowModalBlock(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Zablokuj dostawę</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Powód blokady</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Powód blokady"
                                value={deliveryDescription}
                                onChange={(e) => setDeliveryDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModalBlock(false)}>Anuluj</Button>
                        <Button variant="danger" onClick={() => handleBlockUnblockDelivery(deliver)}>Zablokuj</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </AppWrapper>
    );
};

type Props = {
    isShown: boolean;
    id: number;
    onClose: () => void;
};

export const AddDelivery: React.FC<Props> = ({ isShown, onClose, id }) => {
    const [deliveryName, setDeliveryName] = useState('');
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
    const [deliveryDescription, setDeliveryDescription] = useState('');
    const [deliveryBlocked, setDeliveryBlocked] = useState(false);
    const [blockReason, setBlockReason] = useState('');
    const [title, setTitle] = useState('');
    const [buttonName, setButtonName] = useState('');
    const { setError } = useError();

    useEffect(() => {

        setTitle(id != 0 ? 'Edytuj dostawę' : 'Dodaj dostawę');
        setButtonName(id != 0 ? 'Zapisz zmiany' : 'Dodaj');
        if (id !== 0) {
            loadDeliveryById(id.toString()).then(response => {
                if (response.isOk) {
                    const delivery = response.value;
                    setDeliveryName(delivery.name);
                    setDeliveryPrice(delivery.price);
                    setDeliveryDescription(delivery.description);
                    setDeliveryBlocked(delivery.blocked);
                } else {
                    setError('Failed to load delivery details');
                }
            });
        }
    }, [id, setError]);

    useEffect(() => {
        if (deliveryBlocked && blockReason) {
            setDeliveryDescription(`Wstrzymanie dostawy: ${blockReason}`);
        }
    }, [blockReason, deliveryBlocked]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (id !== 0) {
            // Update existing delivery
            const modifyRequest: ModifyDeliveryRequest = {
                id: id, // id is required here
                name: deliveryName,
                price: deliveryPrice,
                description: deliveryDescription,
                blocked: deliveryBlocked,
            };
            updateDelivery(modifyRequest).then(response => {
                handleResponse(response);
            });
        } else {
            // Create new delivery
            const createRequest: CreateDeliveryRequest = {
                name: deliveryName,
                price: deliveryPrice,
                description: deliveryDescription,
                blocked: deliveryBlocked,
            };
            createDelivery(createRequest).then(response => {
                handleResponse(response);
            });
        }
        onClose();
    };
    const handleResponse = (response: Result<Delivery, APIError<DeliveryErrors>>) => {
        if (response.isOk) {
            window.location.reload();
        } else {
            setError('Failed to process delivery');
        }
    };

    return (
        <Modal show={isShown} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nazwa dostawy</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nazwa dostawy"
                            autoFocus
                            value={deliveryName}
                            onChange={(e) => setDeliveryName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cena</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Cena"
                            value={deliveryPrice}
                            onChange={(e) => setDeliveryPrice(parseFloat(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Zablokowana"
                            checked={deliveryBlocked}
                            onChange={(e) => setDeliveryBlocked(e.target.checked)}
                        />
                    </Form.Group>
                    {
                        deliveryBlocked &&
                        <Form.Group className="mb-3">
                            <Form.Label>Powód blokady </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Powód blokady"
                                value={deliveryDescription}
                                onChange={(e) => setDeliveryDescription(e.target.value)}
                            />
                        </Form.Group>
                    }
                    <hr/>
                    <Button variant="primary" type="submit" style={{ marginLeft: '15px', width: '95%' }}>
                        {buttonName}
                    </Button>
                    <Button variant="secondary" type="button" onClick={onClose} style={{ marginLeft: '15px', width: '95%', marginTop:'20px', color: 'white'}}>
                        Zamknij
                    </Button>
                </Form>

            </Modal.Body>

        </Modal>
    );
};