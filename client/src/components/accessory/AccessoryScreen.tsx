import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Spinner, Toast} from 'react-bootstrap';
import {AppWrapper} from "../common/AppWrapper";
import "./Accessory.css";
import {Accessory, loadAccessoryById} from "./accesory";
import {loadPlantById, Plant} from "../plant/apis/plant";
import {loadSpeciesById} from "../plant/species/apis/species";
import {Kind, Product} from "../cart/apis/product";


export function AccessoryScreen(props:any) {
    const { accessoryId } = useParams();
    const [accessory, setAccessory] = useState<Accessory | null>(null); // Explicitly define the type as `Plant | null`
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [category, setCategory] = useState<string>();
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
        if (accessoryId) {
            setIsLoading(true);
            loadAccessoryById(accessoryId)
                .then(result => {
                    if (result.isOk) {
                        setAccessory(result.value);
                        setCategory(result.value.category ? "Łatwa w hodowli" : "Roślina wymagająca");

                        // Wywołanie loadSpeciesById wewnątrz bloku then

                    }
                    else {
                        setError('Nie udało się załadować ');
                    }
                })
                .catch(() => {
                    setError('Failed to load plant or species details');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setError('Brak artykułu o takim id');
            setIsLoading(false);
        }
    }, [accessoryId]);

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
            id: Number(accessoryId),
            name: accessory?.name!,
            price: accessory?.price!,
            kind: Kind.ACCESSORY,
            count: quantity,
            image: accessory?.image!
        };
        addProductToCart(product);
    };

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <hr/>
                <div className="product-page-tile">{accessory?.name}</div>
                <hr/>
                <div className="product-page-place">
                    <div className="product-page-image-place">
                        {accessory?.image ? (
                            <img className="product-page-image"
                                 src={`data:image/jpeg;base64,${accessory?.image}`}
                                 alt={accessory?.name}
                            />
                        ) : (
                            <span>zdjęcie</span>
                        )}
                    </div>
                    <div className="plant-details">
                        <div><strong>Opis :</strong> </div>
                        <p>{accessory?.description}</p>

                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">  </th>
                                <th scope="col">  </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Dostępność</th>
                                <td>niska</td>
                            </tr>
                            <tr>
                                <th scope="row">Category:</th>
                                <td>{category}</td>
                            </tr>
                            </tbody>
                        </table>
                        <h2><strong>Cena: </strong>{accessory?.price} zł</h2>
                        <div className="add-to-cart">
                            <input
                                type="number"
                                className="quantity-selector-input"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                            <button type="button" className="btn btn-success" onClick={() => handleAddToCartButton()}>dodaj do koszyka</button>
                        </div>

                    </div>
                </div>
            </Container>
        </AppWrapper>
    );
}

