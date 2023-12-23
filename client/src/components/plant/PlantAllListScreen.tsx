import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {Plant, loadPlants} from "./apis/plant";
import { AppWrapper} from "../common/AppWrapper";
import "./PlantItemList.css";

export const PlantItemList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [plants, setPlants] = useState<Plant[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPlants().then(result => {
            if (result.isOk) {
                setPlants(result.value);
            } else {
                setError("Nie udało się wczytać roślin");
            }
            setIsLoading(false);
        });
    }, [setError]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <h2>All plants</h2>
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
