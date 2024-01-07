import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Spinner, Toast} from 'react-bootstrap';
import {AppWrapper} from "../common/AppWrapper";
import "./GroundScreen.css";
import {Kind, Product} from "../cart/apis/product";
import {Ground, loadGroundById} from "./apis/ground";
export function GroundScreen(props:any) {
    const { groundId } = useParams();
    const [ground, setGround] = useState<Ground | null>(null); // Explicitly define the type as `Plant | null`
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
        if (groundId) {
            setIsLoading(true);
            loadGroundById(groundId)
                .then(result => {
                    if (result.isOk) {
                        setGround(result.value);

                    } else {
                        setError('Nie udało się załadować rośliny');
                        setIsLoading(false);
                        throw new Error('Nie udało się załadować rośliny');
                    }
                })

                .catch(() => {
                    setError('Nie udało się załadować gatunku lub rośliny');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setError('Brak roliny o takim id');
            setIsLoading(false);
        }
    }, [groundId]);

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
            id: Number(groundId),
            name: ground?.name!,
            price: ground?.price!,
            kind: Kind.GROUND,
            count: quantity,
            image: ground?.image!
        };
        addProductToCart(product);
    };

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <hr/>
                <div className="product-page-tile">{ground?.name}</div>
                <hr/>
                <div className="product-page-place">
                    <div className="product-page-image-place">
                        {ground?.image ? (
                            <img className="product-page-image"
                                src={`data:image/jpeg;base64,${ground?.image}`}
                                alt={ground?.name}
                            />
                        ) : (
                            <span>zdjęcie</span>
                        )}
                    </div>
                    <div className="plant-details">
                        <div><strong>Opis :</strong> </div>
                        <p>CactusVita to starannie wyselekcjonowana mieszanka składników, stworzona specjalnie z myślą o wymaganiach kaktusów i sukulenty. Zawiera ona idealne proporcje torfu, piasku i perlitu, co zapewnia doskonałe odprowadzanie wody i przewiewność, kluczowe dla zdrowia tych roślin.</p>

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
                                <th scope="row">Typ:</th>
                                <td>Dla sukulentów i kaktusów</td>
                            </tr>
                            </tbody>
                        </table>
                        <h2><strong>Cena: </strong>{ground?.price} zł</h2>
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
