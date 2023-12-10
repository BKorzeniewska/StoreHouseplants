import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {Plant, loadPlantBySpeciesId} from "./apis/plant";
import { AppWrapper} from "../common/AppWrapper";
import "./GroundItemList.css";

export const GroundsItemList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [grounds, setGrounds] = useState<Ground[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadGrounds().then(result => {
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
                <h2>Grounds</h2>
                <div className="cground-grid">
                    {grounds.map(ground => (
                        <div key={ground.id} className="ground-tile" onClick={() => navigate(`/ground/${ground.id}`)}>
                            <h3>{ground.name}</h3>
                            <img src={ground.image || 'default-placeholder.png'} alt={ground.name} className="ground-image" />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};
