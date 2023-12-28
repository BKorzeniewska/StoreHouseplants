import React, { useEffect, useState } from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {
    Plant,
    loadPlants,
    loadPlantBySpeciesId,
    Position,
    loadPlantsByPosition,
    loadCollectiblePlants, loadPlantsForBeginners
} from "./apis/plant";
import { AppWrapper} from "../common/AppWrapper";
import {loadSpecies, loadSpeciesById} from "./species/apis/species";

export const PlantListBySpecies = () => {
    const { speciesId } = useParams();
    const navigate = useNavigate();
    const { setError } = useError();
    const [plants, setPlants] = useState<Plant[]>([]);
    const [title, setTitle] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredPlants = plants.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        if (speciesId) {
            loadPlantBySpeciesId(speciesId).then(result => {
                if (result.isOk) {
                    setPlants(result.value);
                } else {
                    setError("Nie udało się wczytać roślin");
                }
                setIsLoading(false);
            });
            loadSpeciesById(speciesId).then(result =>{
                if (result.isOk) {
                    setTitle("Rośliny z gatunku "+ result.value);
                } else {
                    setError("Nie udało się wczytać nazwy gatunku");
                }
                setIsLoading(false);
            });
        }

    }, [speciesId, setError]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <div className="page-tile">{title}</div>
                <hr/>
                <input
                    type="text"
                    placeholder="Wyszukaj po nazwie"
                    className="form-control mb-4"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Row xs={1} md={2} lg={3} xl={4} className="g-4"> {/* Tutaj ustalamy ilość kolumn na różnych szerokościach ekranu */}
                    {filteredPlants.map(plant => (
                        <Col key={plant.id}>
                            <Card onClick={() => navigate(`/plants/${plant.id}`)}>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${plant?.image}`} alt={plant?.name} />
                                <Card.Body>
                                    <Card.Title>{plant.name}</Card.Title>
                                    <Card.Text><strong>Cena:</strong> {plant.price} zł</Card.Text>
                                    <button type="button" className="btn btn-success w-100">Dodaj do koszyka</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </AppWrapper>
    );
};


export const PlantsByPosition = () => {
    {
        const {position} = useParams();
        const [plants, setPlants] = useState<Plant[]>([]);
        const navigate = useNavigate();
        const [error, setError] = useState<string | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [title, setTitle] = useState<string>();
        const [searchTerm, setSearchTerm] = useState('');
        const filteredPlants = plants.filter(plant =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        useEffect(() => {
            if (position) {
                loadPlantsByPosition(position).then(result => {
                    if (result.isOk) {
                        setPlants(result.value);
                    } else {
                        setError("Nie udało się wczytać roślin");
                    }
                    setIsLoading(false);
                });
                if(position ==='LIGHT'){
                    setTitle("Rośliny dla jasnego stanowiska");
                }
                else if(position ==='DARK'){
                    setTitle("Rośliny dla zacienionego stanowiska");
                }
                else{
                    setTitle("Rośliny do półcienia");
                }


            }
        }, [position, setError]);
        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <AppWrapper hideSidebar>
                <Container className="my-5">
                    <h2 className="page-tile">{title}</h2>
                    <hr/>
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control mb-4"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4"> {/* Tutaj ustalamy ilość kolumn na różnych szerokościach ekranu */}
                        {filteredPlants.map(plant => (
                            <Col key={plant.id}>
                                <Card onClick={() => navigate(`/plants/${plant.id}`)}>
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${plant?.image}`} alt={plant?.name} />
                                    <Card.Body>
                                        <Card.Title>{plant.name}</Card.Title>
                                        <Card.Text><strong>Cena:</strong> {plant.price} zł</Card.Text>
                                        <button type="button" className="btn btn-success w-100">Dodaj do koszyka</button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </AppWrapper>
        );
    };
}

export const PlantsByBegginers = () => {
    {
        const {isForBegginers} = useParams();
        const [plants, setPlants] = useState<Plant[]>([]);
        const navigate = useNavigate();
        const [error, setError] = useState<string | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [title, setTitle] = useState<string>();
        const [searchTerm, setSearchTerm] = useState('');
        const filteredPlants = plants.filter(plant =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        useEffect(() => {
            if (isForBegginers) {
                loadPlantsForBeginners(isForBegginers ==='true').then(result => {
                    if (result.isOk) {
                        setPlants(result.value);
                    } else {
                        setError("Nie udało się wczytać roślin");
                    }
                    setIsLoading(false);
                });
                setTitle(isForBegginers ==='true'? "Rośliny łatwe w hodowli":"Rośliny wymagające");
            }
        }, [isForBegginers, setError]);
        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <AppWrapper hideSidebar>
                <Container className="my-5">
                    <div className="page-tile">{title}</div>
                    <hr/>
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control mb-4"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4"> {/* Tutaj ustalamy ilość kolumn na różnych szerokościach ekranu */}
                        {filteredPlants.map(plant => (
                            <Col key={plant.id}>
                                <Card onClick={() => navigate(`/plants/${plant.id}`)}>
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${plant?.image}`} alt={plant?.name} />
                                    <Card.Body>
                                        <Card.Title>{plant.name}</Card.Title>
                                        <Card.Text><strong>Cena:</strong> {plant.price} zł</Card.Text>
                                        <button type="button" className="btn btn-success w-100">Dodaj do koszyka</button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </AppWrapper>
        );
    };
}


export const PlantsByCollectible= () => {
    {
        const {isCollectible} = useParams();
        const [plants, setPlants] = useState<Plant[]>([]);
        const navigate = useNavigate();
        const [error, setError] = useState<string | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [searchTerm, setSearchTerm] = useState('');
        const filteredPlants = plants.filter(plant =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        useEffect(() => {

            if (isCollectible) {
                loadCollectiblePlants(true).then(result => {
                    if (result.isOk) {
                        setPlants(result.value);
                    } else {
                        setError("Nie udało się wczytać roślin");
                    }
                    setIsLoading(false);
                });
            }
        }, [isCollectible, setError]);
        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }



        return (
            <AppWrapper hideSidebar>
                <Container className="my-5">
                    <h2 className="page-tile">Rośliny kolekcjonerskie</h2>
                    <hr/>
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control mb-4"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4"> {/* Tutaj ustalamy ilość kolumn na różnych szerokościach ekranu */}
                        {filteredPlants.map(plant => (
                            <Col key={plant.id}>
                                <Card onClick={() => navigate(`/plants/${plant.id}`)}>
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${plant?.image}`} alt={plant?.name} />
                                    <Card.Body>
                                        <Card.Title>{plant.name}</Card.Title>
                                        <Card.Text><strong>Cena:</strong> {plant.price} zł</Card.Text>
                                        <button type="button" className="btn btn-success w-100">Dodaj do koszyka</button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </AppWrapper>
        );
    }
    ;
}