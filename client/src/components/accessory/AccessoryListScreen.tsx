import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import { Accessory, loadAllAccessories} from "./accesory";
import { AppWrapper} from "../common/AppWrapper";
import "./AccessoryAllList.css";

export const AccessoryAllList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [accessories, setAccessory] = useState<Accessory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAllAccessories().then(result => {
            if (result.isOk) {
                setAccessory(result.value);
            } else {
                setError("Nie udało się wczytać akcesoriów");
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
                <h2>Wszystkie akcesoria</h2>
                <div className="product-card-grid">
                    {accessories.map(accessory => (
                        <div key={accessory.id} className="product-card-tile" onClick={() => navigate(`/accessory/${accessory.id}`)}>
                            <h3>{accessory.name}</h3>
                            <img
                                src={`data:image/jpeg;base64,${accessory?.imageUrl}`}
                                alt={accessory?.name} className="product-card-image" // css is brutal, use conditional margin
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};
