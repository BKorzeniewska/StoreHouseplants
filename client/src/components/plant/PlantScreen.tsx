import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Spinner, Toast} from 'react-bootstrap';
import {loadPlantById, Plant} from "./apis/plant";
import {AppWrapper} from "../common/AppWrapper";
import "./PlantScreen.css";
import {loadSpeciesById} from "./species/apis/species";
import {Kind, Product} from "../cart/apis/product";
import {Ground, loadTwoGroundsByType} from "../ground/apis/ground";


export function PlantScreen(props:any) {
    const { plantId } = useParams();
    const [plant, setPlant] = useState<Plant | null>(null); // Explicitly define the type as `Plant | null`
    const [isLoading, setIsLoading] = useState(true);
    const [ground, setGround] = useState<Ground | null>(null);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [position, setPosition] = useState<string>();
    const [species, setSpecies] = useState<string>();
    const [isCollectible, setIsCollectible] = useState<string>();
    const [isForBeginners, setIsForBeginners] = useState<string>();
    const [availability, setAvailability] = useState<string>();
    const [quantity, setQuantity] = useState(1); // Stan przechowujący ilość produktów
    const {
        productsInCart,
        addProductToCart,
        setShowCartWarningToast,
        setShowCartSuccessToast,
        showCartWarningToast,
        showCartSuccessToast
    } = props

    useEffect(() => {
        const fetchData = async () => {
            if (plantId) {
                try {
                    setIsLoading(true);

                    const plantResult = await loadPlantById(plantId);
                    if (plantResult.isOk) {
                        setPlant(plantResult.value);
                        setIsForBeginners(plantResult.value.beginners ? "Łatwa w hodowli" : "Roślina wymagająca");
                        setIsCollectible(plantResult.value.collectible ? "tak" : "nie");
                        setPosition(plantResult.value.position === "LIGHT" ? "jasne" : (plantResult.value.position === "DARK" ? "ciemne" : "półcień"));

                        const groundsResult = await loadTwoGroundsByType(plantResult.value.groundType);
                        if(groundsResult.isOk){
                              setGround((groundsResult.value));
                        }
                        // Tutaj załaduj gatunki
                        const speciesResult = await loadSpeciesById(plantResult.value.plantSpeciesId.toString());
                        if (speciesResult.isOk) {
                            setSpecies(speciesResult.value.name);
                        } else {
                            setError('Nie udało się załadować gatunku');
                        }
                    } else {
                        setError('Nie udało się załadować rośliny');
                    }
                } catch (error) {
                    setError('Wystąpił błąd podczas ładowania danych');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
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

    const handleAddToCartButton = () => {
        const product: Product = {
            id: Number(plantId),
            name: plant?.name!,
            price: plant?.price!,
            kind: Kind.PLANT,
            count: quantity,
            image: plant?.image!
        };
        addProductToCart(product);
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
                            <button type="button" className="btn btn-success" onClick={() => handleAddToCartButton()}>dodaj do koszyka</button>
                        </div >
                        <div style={{marginTop: '40px'}}/>
                        <div><strong>Polecane podłoże:</strong></div>
                        <div className="add-to-cart" >

                            <img className="product-page-image-small"
                                 src={`data:image/jpeg;base64,${ground?.image}`}
                                 alt={ground?.name}
                                 style={{maxHeight:'70px', width:'auto'}}
                            />
                            <div >
                                <div><strong>{ground?.name}</strong></div>
                                <div>Cena: {ground?.price} zł</div>
                            </div>



                        </div>
                    </div>
                </div>
            </Container>
        </AppWrapper>
    );
}
