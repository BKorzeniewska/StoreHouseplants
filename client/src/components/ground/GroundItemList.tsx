import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {Ground, loadGrounds} from "./apis/ground";
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
                <div className="product-card-grid">
                    {grounds.map(ground => (
                        <div key={ground.id} className="product-card-tile" onClick={() => navigate(`/ground/${ground.id}`)}>
                            <h3>{ground.name}</h3>
                            <img
                                src={`data:image/jpeg;base64,${ground?.imageUrl}`}
                                alt={ground?.name} className="product-card-image" // css is brutal, use conditional margin
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};
