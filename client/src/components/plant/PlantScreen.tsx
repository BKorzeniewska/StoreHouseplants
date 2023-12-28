import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Spinner, Toast} from 'react-bootstrap';
import {loadPlantById, Plant, Position} from "./apis/plant";
import {AppWrapper} from "../common/AppWrapper";
import "./PlantScreen.css";
import {loadSpeciesById} from "./species/apis/species";


export function PlantScreen() {
    const { plantId } = useParams();
    const [plant, setPlant] = useState<Plant | null>(null); // Explicitly define the type as `Plant | null`
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [position, setPosition] = useState<string>();
    const [species, setSpecies] = useState<string>();
    const [isCollectible, setIsCollectible] = useState<string>();
    const [isForBeginners, setIsForBeginners] = useState<string>();
    const [availability, setAvailability] = useState<string>();
    const [quantity, setQuantity] = useState(1); // Stan przechowujący ilość produktów


    useEffect(() => {
        if (plantId) {
            setIsLoading(true);
            loadPlantById(plantId)
                .then(result => {
                    if (result.isOk) {
                        setPlant(result.value);
                        setIsForBeginners(result.value.beginners ? "Łatwa w hodowli" : "Roślina wymagająca");
                        setIsCollectible(result.value.collectible ? "tak" : "nie");
                        setPosition(result.value.position === "LIGHT" ? "jasne" : (result.value.position === "DARK" ? "ciemne" : "półcień"));

                        // Wywołanie loadSpeciesById wewnątrz bloku then
                        return loadSpeciesById(result.value.plantSpeciesId.toString());
                    } else {
                        setError('Failed to load plant details');
                        setIsLoading(false);
                        throw new Error('Failed to load plant details');
                    }
                })
                .then(speciesResult => {
                    if (speciesResult.isOk) {
                        setSpecies(speciesResult.value.name);
                    } else {
                        setError('Failed to load species details');
                    }
                })
                .catch(() => {
                    // Ten catch obejmuje błędy zarówno z loadPlantById, jak i loadSpeciesById
                    setError('Failed to load plant or species details');
                })
                .finally(() => {
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

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity >= 1 ? newQuantity : 1);
    };

    return (
        <AppWrapper hideSidebar>



            <Container className="my-5">
                <hr/>
                <div className="product-page-tile">{plant?.name}</div>
                <hr/>
                <div className="product-page-place">
                    <div className="product-page-image-place">
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
                        <div><strong>Opis :</strong> </div>
                        <p>{plant?.description}</p>

                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">  </th>
                                <th scope="col">  </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Stanowisko:</th>
                                <td>{position}</td>
                            </tr>
                            <tr>
                                <th scope="row">Łatwość uprawy:</th>
                                <td>{isForBeginners}</td>
                            </tr>
                            <tr>
                                <th scope="row">Czy jest kolekcjonerska:</th>
                                <td>{isCollectible}</td>
                            </tr>
                            <tr>
                                <th scope="row">Dostępność</th>
                                <td>niska</td>
                            </tr>
                            <tr>
                                <th scope="row">Gatunek:</th>
                                <td>{species}</td>
                            </tr>
                            </tbody>
                        </table>
                        <h2><strong>Cena: </strong>{plant?.price} zł</h2>
                        <div className="add-to-cart">
                           <input
                                type="number"
                                className="quantity-selector-input"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                            <button type="button" className="btn btn-success" onClick={() => navigate('/cart')}>dodaj do koszyka</button>
                        </div>

                    </div>
                </div>
            </Container>
        </AppWrapper>
    );
}
