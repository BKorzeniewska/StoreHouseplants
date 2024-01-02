import React, { useEffect, useState } from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useError} from "../common/ErrorContext";
import {Accessory, loadAccessoriesByCategory, loadAllAccessories} from "./accesory";
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
                                src={`data:image/jpeg;base64,${accessory?.image}`}
                                alt={accessory?.name} className="product-card-image" // css is brutal, use conditional margin
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};

export const AccessoryByCategoryList = () => {
    const {category} = useParams();
    const navigate = useNavigate();
    const { setError } = useError();
    const [accessories, setAccessory] = useState<Accessory[]>([]);
    const [title, setTitle] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (category) {
            loadAccessoriesByCategory(category).then(result => {
                if (result.isOk) {
                    setAccessory(result.value);
                } else {
                    setError("Nie udało się wczytać akcesoriów");
                }
                setIsLoading(false);
            });
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
    }, [category, setError]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <h2 className="page-tile">{title}</h2>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {accessories.map(accessory => (
                        <Col key={accessory.id}>
                            <Card onClick={() => navigate(`/accessories/${accessory.id}`)}>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${accessory?.image}`} alt={accessory?.name} />
                                <Card.Body>
                                    <Card.Title>{accessory.name}</Card.Title>
                                    <Card.Text><strong>Cena:</strong> {accessory.price} zł</Card.Text>
                                    <button type="button" className="btn btn-success ">Dodaj do koszyka</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </AppWrapper>
    );
};