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
    const [plants, setGrounds] = useState<Plant[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPlants().then(result => {
            if (result.isOk) {
                setGrounds(result.value);
            } else {
                setError("Nie udało się wczytać rozdziałów");
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
                <div className="cground-grid">
                    {plants.map(plant => (
                        <div key={plant.id} className="ground-tile" onClick={() => navigate(`/plant/${plant.id}`)}>
                            <h3>{plant.name}</h3>
                            <img src={plant.image || 'default-placeholder.png'} alt={plant.name} className="ground-image" />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};
