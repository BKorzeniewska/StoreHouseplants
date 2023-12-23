import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Container, Spinner, Toast } from 'react-bootstrap';
import { loadPlantById, Plant} from "../../plant/apis/plant";
import {AppWrapper} from "../../common/AppWrapper";
import "./PlantScreen.css"; // Załóżmy, że stworzyłeś plik CSS o tej nazwie


export function PlantScreen() {
    const { plantId } = useParams();
    const [plant, setPlant] = useState<Plant | null>(null); // Explicitly define the type as `Plant | null`
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(plantId);
        if (plantId) {
            loadPlantById(plantId)
                .then(result => {
                    if (result.isOk) {
                        setPlant(result.value); // Now TypeScript knows that `result.value` is of type `Plant`
                    } else {
                        setError('Failed to load plant details');
                    }
                    setIsLoading(false);
                })
                .catch(() => {
                    setError('Failed to load plant details');
                    setIsLoading(false);
                });
        } else {
            setError('No plant ID provided');
            setIsLoading(false);
        }
    }, [plantId]);

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Toast show={true}><Toast.Body>{error}</Toast.Body></Toast>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <div className="product-page-tile">
                    <div className="product-page-image">
                        {plant?.image ? (
                            <img className="product-page-image"
                                src={`data:image/jpeg;base64,${plant?.image}`}
                                alt={plant?.name}
                            />
                        ) : (
                            <span>zdjęcie</span>
                        )}
                    </div>
                    <div className="plant-details">
                        <h2>Szeflera brazylisjka-XXL</h2>
                        <div><strong>Stanowisko:</strong> jasne</div>
                        <div><strong>Łatwość uprawy:</strong> dla początkujących</div>
                        <div><strong>Czy jest kolekcjonerska:</strong> tak</div>
                        <div><strong>Dostępność:</strong> niska</div>
                        <div className="add-to-cart">
                            <button className="quantity-selector-button">-</button>
                            <input type="number" className="quantity-selector-input" value={1} readOnly />
                            <button className="quantity-selector-button">+</button>
                            <button className="add-button" onClick={() => navigate('/cart')}>dodaj do koszyka</button>
                        </div>
                        <p>{plant?.description}</p>
                    </div>
                </div>
            </Container>
        </AppWrapper>
    );
}
