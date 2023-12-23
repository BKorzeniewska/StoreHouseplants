import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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
                <div className="plant-grid">
                    {plants.map(plant => (
                        <div key={plant.id} className="plant-tile" onClick={() => navigate(`/plants/${plant.id}`)}>
                            <h3>{plant.name}</h3>
                            <img
                                src={`data:image/jpeg;base64,${plant?.image}`}
                                alt={plant?.name} className="product-card-image" // css is brutal, use conditional margin
                            />
                        </div>
                    ))}
                </div>
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
                    <div className="page-tile">{title}</div>
                    <div className="plant-grid">
                        {plants.map(plant => (
                            <div key={plant.id} className="plant-tile" onClick={() => navigate(`/plants/${plant.id}`)}>
                                <h3>{plant.name}</h3>
                                <img
                                    src={`data:image/jpeg;base64,${plant?.image}`}
                                    alt={plant?.name} className="product-card-image" // css is brutal, use conditional margin
                                />
                            </div>
                        ))}
                    </div>
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
        useEffect(() => {
            if (isForBegginers) {
                if(isForBegginers ==='true') {
                    loadPlantsForBeginners(true).then(result => {
                        if (result.isOk) {
                            setPlants(result.value);
                        } else {
                            setError("Nie udało się wczytać roślin");
                        }
                        setIsLoading(false);
                    });
                }
                else {
                    loadPlantsForBeginners(false).then(result => {
                        if (result.isOk) {
                            setPlants(result.value);
                        } else {
                            setError("Nie udało się wczytać roślin");
                        }
                        setIsLoading(false);
                    });
                }
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
                    <div className="page-tile">All plants</div>
                    <div className="plant-grid">
                        {plants.map(plant => (
                            <div key={plant.id} className="plant-tile" onClick={() => navigate(`/plants/${plant.id}`)}>
                                <h3>{plant.name}</h3>
                                <img
                                    src={`data:image/jpeg;base64,${plant?.image}`}
                                    alt={plant?.name} className="product-card-image" // css is brutal, use conditional margin
                                />
                            </div>
                        ))}
                    </div>
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
                    <div className="page-tile">All plants</div>
                    <div className="plant-grid">
                        {plants.map(plant => (
                            <div key={plant.id} className="plant-tile" onClick={() => navigate(`/plants/${plant.id}`)}>
                                <h3>{plant.name}</h3>
                                <img
                                    src={`data:image/jpeg;base64,${plant?.image}`}
                                    alt={plant?.name} className="plant-image" // css is brutal, use conditional margin
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </AppWrapper>
        );
    }
    ;
}