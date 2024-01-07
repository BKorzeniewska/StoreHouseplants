import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Pagination, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {Accessory, loadAccessoriesByCategory, loadAllAccessories} from "./accesory";
import { AppWrapper} from "../common/AppWrapper";
import "./AccessoryAllList.css";
import {loadSpecies, Species} from "../plant/species/apis/species";
import {FaSort} from "react-icons/fa";
import {Plant} from "../plant/apis/plant";
import {AuthContext} from "../auth/AuthContext";
import {FaArrowDown91, FaArrowUpAZ} from "react-icons/fa6";

export const AccessoryAllList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [accessories, setAccessory] = useState<Accessory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [displayAccessories, setDisplayAccessories] = useState<Accessory[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;
    const [sortAscending, setSortAscending] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [title, setTitle] = useState<string>();
    const [allPlants, setAllPlants] = useState<Plant[]>([]);
    const [displayPlants, setDisplayPlants] = useState<Plant[]>([]);
    const { isAuthorized} = useContext(AuthContext);

    useEffect(() => {
        fetchAccessories();
    }, []);

    useEffect(() => {
        const filteredSpecies = searchTerm
            ? accessories.filter(accessoriesL => accessoriesL.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : accessories;

        setTotalPages(Math.ceil(filteredSpecies.length / itemsPerPage));
        setDisplayAccessories(filteredSpecies.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [accessories, pageNumber, searchTerm]);

    const fetchAccessories= async () => {
        setIsLoading(true);
        try {
            loadAllAccessories().then(result => {
                if (result.isOk) {
                    setAccessory(result.value);
                } else {
                    setError("Nie udało się wczytać akcesoriów");
                }
                setIsLoading(false);
            });
        } catch (error) {
            setError("Nie udało się wczytać akcesoriów");
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <div className="page-tile">  Wszystkie akcesoria </div>
                <hr className="h-10" />
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaArrowUpAZ onClick={sortAccessoriesByName}  style={{ fontSize: '30px' }}>
                        <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                    </FaArrowUpAZ>
                    <FaArrowDown91 onClick={sortAccessoriesByName}  style={{ fontSize: '30px' }}>
                        <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                    </FaArrowDown91>

                </div>
                <Row xs={6}  className="g-4">
                    {displayAccessories.map(accessory => (
                        <Col key={accessory.id}>
                            <Card onClick={() => navigate(`/accessory/${accessory.id}`)}>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${accessory.image}`} alt={accessory.name} />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div className="title-container" style={{ padding: '10px' }}> {/* Adjust padding as needed */}
                                        <Card.Title className="text-center card-title-custom mb-2">{accessory.name}</Card.Title>
                                    </div>
                                    <div className="mt-auto"><strong>Cena:</strong> {accessory.price} zł</div>
                                    {(isAuthorized("USER")||isAuthorized("ADMIN"))&&
                                        <>
                                            <button type="button" className="btn btn-success w-100">Dodaj do koszyka</button>
                                        </>}
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
            </Container>
        </AppWrapper>
    );
};


export const AccessoryByCategoryList = () => {
    const {category} = useParams();
    const navigate = useNavigate();
    const {setError} = useError();
    const [accessories, setAccessory] = useState<Accessory[]>([]);
    const [title, setTitle] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);
    const [displayAccessories, setDisplayAccessories] = useState<Accessory[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;
    const [sortAscending, setSortAscending] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [allPlants, setAllPlants] = useState<Plant[]>([]);
    const [displayPlants, setDisplayPlants] = useState<Plant[]>([]);
    const {isAuthorized} = useContext(AuthContext);

    useEffect(() => {
        fetchAccessories();
    }, []);

    useEffect(() => {
        const filteredSpecies = searchTerm
            ? accessories.filter(accessoriesL => accessoriesL.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : accessories;

        setTotalPages(Math.ceil(filteredSpecies.length / itemsPerPage));
        setDisplayAccessories(filteredSpecies.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [accessories, pageNumber, searchTerm]);

    const fetchAccessories = async () => {
            setIsLoading(true);
            try {
                loadAccessoriesByCategory(category!).then(result => {
                    if (result.isOk) {
                        setAccessory(result.value);
                    } else {
                        setError("Nie udało się wczytać akcesoriów");
                    }
                    setIsLoading(false);
                });
            } catch (error) {
                setError("Nie udało się wczytać akcesoriów");
            }
            setIsLoading(false);

            switch (category) {
                case 'POTS':
                    setTitle("Doniczki");
                    break;
                case 'FLOWERBEDS':
                    setTitle("Kwietniki");
                    break;
                case 'SUPPORTS':
                    setTitle("Podpórki do roślin");
                    break;
                case 'MOISTURE_INDICATORS':
                    setTitle("Wskaźniki wilgotności");
                    break;
                case 'WATERING_CANS':
                    setTitle("Konweki");
                    break;
                case 'TOOLS':
                    setTitle("Narzędzia ogrodnicze");
                    break;
                case 'LAMPS':
                    setTitle("Lampy");
                    break;
                case 'FERTILIZERS':
                    setTitle("Nawozy");
                    break;
                default:
                    setTitle("Akcessoria");
            }
        }
        ;


        if (isLoading) {
            return <div>Loading...</div>;
        }

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

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <AppWrapper hideSidebar>
                <Container className="my-5">
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
                        <FaArrowUpAZ onClick={sortAccessoriesByName} style={{fontSize: '30px'}}>
                            <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                        </FaArrowUpAZ>
                        <FaArrowDown91 onClick={sortAccessoriesByName} style={{fontSize: '30px'}}>
                            <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                        </FaArrowDown91>

                    </div>
                    <Row xs={6} className="g-4">
                        {displayAccessories.map(accessory => (
                            <Col key={accessory.id}>
                                <Card onClick={() => navigate(`/accessory/${accessory.id}`)}>
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${accessory.image}`}
                                              alt={accessory.name}/>
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <div className="title-container"
                                             style={{padding: '10px'}}> {/* Adjust padding as needed */}
                                            <Card.Title
                                                className="text-center card-title-custom mb-2">{accessory.name}</Card.Title>
                                        </div>
                                        <div className="mt-auto"><strong>Cena:</strong> {accessory.price} zł</div>
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
