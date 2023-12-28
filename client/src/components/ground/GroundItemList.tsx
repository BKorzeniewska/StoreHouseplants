import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {Ground, loadGrounds, loadGroundsByType} from "./apis/ground";
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
                <div className="page-tile">Wszystkie podłoża</div>
                <div className="plant-grid">
                    {grounds.map(ground => (
                        <div key={ground.id} className="plant-tile" onClick={() => navigate(`/ground/${ground.id}`)}>
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

export const GroundsIByTypeList = () => {
    const {type} = useParams();
    const navigate = useNavigate();
    const { setError } = useError();
    const [title, setTitle] = useState<string>();
    const [grounds, setGrounds] = useState<Ground[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(type) {
            loadGroundsByType(type).then(result => {
                if (result.isOk) {
                    setGrounds(result.value);
                } else {
                    setError("Nie udało się wczytać rozdziałów");
                }
                setIsLoading(false);
            });
            switch (type) {
                case 'ORCHID':
                    setTitle("Podłoża dla storczyków");
                    break;
                case 'PEAT':
                    setTitle("Podłoża torfowe");
                    break;
                case 'ADDITION':
                    setTitle("Dodatki do podłoża");
                    break;
                case 'BONSAI':
                    setTitle("Podłoża dla bonsai");
                    break;
                case 'DESERT':
                    setTitle("Podłoża dla sukulentów i kaktusów");
                    break;
                case 'CITRUS':
                    setTitle("Podłoża dla cytrusów");
                    break;
                case 'PERMEABLE':
                    setTitle("Przepuszczalne podłoża");
                    break;
                case 'UNIVERSAL':
                    setTitle("Uniwersalne podłoża");
                    break;
                case 'OTHER':
                    setTitle("Inne podłoża");
                    break;
                default:
                    setTitle("Podłoża");
            }
        }
    }, [type,setError]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <div className="page-tile">{title}</div>
                <div className="plant-grid">
                    {grounds.map(ground => (
                        <div key={ground.id} className="plant-tile" onClick={() => navigate(`/ground/${ground.id}`)}>
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
