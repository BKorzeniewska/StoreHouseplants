import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Spinner, Toast} from 'react-bootstrap';
import {AppWrapper} from "../common/AppWrapper";
import "./Accessory.css";
import {Accessory, loadAccessoryById} from "./accesory";


export function AccessoryScreen() {
    const { accessoryId } = useParams();
    const [accessory, setAccessory] = useState<Accessory | null>(null); // Explicitly define the type as `Plant | null`
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [category, setCategory] = useState<string>();
    const [availability, setAvailability] = useState<string>();
    const [quantity, setQuantity] = useState(1); // Stan przechowujący ilość produktów


    useEffect(() => {
        console.log(accessoryId);
        if (accessoryId) {
            loadAccessoryById(accessoryId)
                .then(result => {
                    if (result.isOk) {
                        setAccessory(result.value); // Now TypeScript knows that `result.value` is of type `Plant`
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

    return (
        <AppWrapper hideSidebar>



            <Container className="my-5">
                <hr/>
                <div className="product-page-tile">{accessory?.name}</div>
                <hr/>
                <div className="product-page-place">
                    <div className="product-page-image-place">
                        {accessory?.imageUrl ? (
                            <img className="product-page-image"
                                 src={`data:image/jpeg;base64,${accessory?.imageUrl}`}
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
                            </tbody>
                        </table>

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
