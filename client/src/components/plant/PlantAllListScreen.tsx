import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Pagination, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {Plant, loadPlants, loadPlantsByPosition} from "./apis/plant";
import { AppWrapper} from "../common/AppWrapper";
import "./PlantItemList.css";
import {AuthContext} from "../auth/AuthContext";
import {FaArrowDown91, FaArrowUpAZ} from "react-icons/fa6";

export const PlantItemList = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>();
    const {setError} = useError();
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
    const {isAuthorized} = useContext(AuthContext);


    useEffect(() => {
        const fetchPlants = async () => {
            setIsLoading(true);
            const result = await loadPlants();
            if (result.isOk) {
                setAllPlants(result.value);
                setTitle("Wszystkie rośliny");
                setTotalPages(Math.ceil(result.value.length / itemsPerPage));
            } else {
                setError("Nie udało się wczytać roślin");
            }
            setIsLoading(false);
        };


            fetchPlants();

    }, []);
    useEffect(() => {
        const filteredPlants = searchTerm
            ? allPlants.filter(plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : allPlants;

        setTotalPages(Math.ceil(filteredPlants.length / itemsPerPage));
        setDisplayPlants(filteredPlants.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [allPlants, pageNumber, searchTerm]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const sortPlantByName = () => {
        setSortAscending(!sortAscending);
        setDisplayPlants([...displayPlants].sort((a, b) => {
            if (sortAscending) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-2 w-200">
                <div className="page-tile">  {title} </div>
                <hr className="h-10"/>
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaArrowUpAZ onClick={sortPlantByName} style={{fontSize: '30px'}}>
                        <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                    </FaArrowUpAZ>
                    <FaArrowDown91 onClick={sortPlantByName} style={{fontSize: '30px'}}>
                        <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                    </FaArrowDown91>

                </div>
                <Row xs={1} md={1} lg={1} xl={6} className="g-4">
                    {displayPlants.map(plant => (
                        <Col key={plant.id}>
                            <Card onClick={() => navigate(`/plants/${plant.id}`)}>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${plant.image}`}
                                          alt={plant.name}/>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div className="title-container"
                                         style={{padding: '10px'}}> {/* Adjust padding as needed */}
                                        <Card.Title
                                            className="text-center card-title-custom mb-2">{plant.name}</Card.Title>
                                    </div>
                                    <div className="mt-auto"><strong>Cena:</strong> {plant.price} zł</div>
                                    {(isAuthorized("USER") || isAuthorized("ADMIN")) &&
                                        <>
                                            <button type="button" className="btn btn-success w-100">Dodaj do
                                                koszyka
                                            </button>
                                        </>}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination className='d-flex justify-content-center mt-4'>
                    <Pagination.First onClick={() => setPageNumber(1)} disabled={pageNumber === 1}/>
                    <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}/>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                        <Pagination.Item
                            key={page}
                            active={page === pageNumber}
                            onClick={() => setPageNumber(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)}
                                     disabled={pageNumber === totalPages}/>
                    <Pagination.Last onClick={() => setPageNumber(totalPages)}
                                     disabled={pageNumber === totalPages}/>
                </Pagination>
            </Container>
        </AppWrapper>
    );
};
