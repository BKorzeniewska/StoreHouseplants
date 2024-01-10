import React, { useState , useEffect} from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Container } from 'react-bootstrap';
import {AppWrapper} from "../common/AppWrapper";
import {Delivery, loadDeliverys} from "./delivery/apis/delivery";
import axios from 'axios'
import './ShoppingCart.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function mapAvailability(cnt) {
    if (cnt >= 1 && cnt < 10) {
        return "Low";
    }
    if (cnt >= 10 && cnt < 50) {
        return "Medium";
    }
    if (cnt >= 50) {
        return "High";
    }
    return cnt;
}

export function ShoppingCart(props) {
    console.log(props);

    const { productsInCart, onQuantityChange, onProductRemove, clearCart } = props;
    const navigate = useNavigate()

    const totalCost = Array.isArray(productsInCart) ? productsInCart.reduce(
        (total, product) => total + product.price * product.count,
        0
    ).toFixed(2) : '0.00';
    const totalCostEnd = parseFloat(totalCost) +15.99;


    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDeliveries, setSelectedDeliveries] = useState(new Set());
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [selectedDeliveryCost, setSelectedDeliveryCost] = useState(0);


    useEffect(() => {
        loadDeliverys().then(result => {
            if (result.isOk) {
                setDeliveries(result.value);
            } else {
                // Obsługa błędów
                console.error(result.error);
            }
        });
    }, []);

    // const handleDeliveryChange = (deliveryId) => {
    //     setSelectedDeliveries((prevSelectedDeliveries) => {
    //         const updatedSelectedDeliveries = new Set(prevSelectedDeliveries);
    //         if (updatedSelectedDeliveries.has(deliveryId)) {
    //             updatedSelectedDeliveries.delete(deliveryId);
    //         } else {
    //             updatedSelectedDeliveries.add(deliveryId);
    //         }
    //         return updatedSelectedDeliveries;
    //     });
    // };
    const handleCheckout = async () => {
        try {
            console.log(productsInCart)
            const response = await axios.post('/api/products/checkout', {
                "products_in_cart": productsInCart,
            });

            setShowSuccessModal(true);

            clearCart()
        } catch (error) {
            setShowErrorModal(true);
            setErrorMessage(error.response?.data?.error.message || 'An error occurred');
        }
    };

    const handleCloseModals = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };

    const handleDeliveryChange = (deliveryId) => {
        const selected = deliveries.find(delivery => delivery.id === deliveryId);
        setSelectedDelivery(deliveryId);
        setSelectedDeliveryCost(selected ? selected.price : 0);
    };


    console.log(productsInCart);
    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                    <div className="cart-products">

                        {productsInCart.length === 0 && (
                            <span className="empty-text">Your cart is currently empty</span>
                        )}
                        {productsInCart.map((product) => (
                            <div className="cart-product" key={product.id}>
                                <img
                                    src={`data:image/jpeg;base64,${product.image}`}
                                    alt={product.name}
                                    onClick={() => {
                                        navigate(`/products/details`, { state: { product } });
                                    }}
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                                <div className="cart-product-info" key={product.id}>
                                    <div className="product-details-cart">
                                        <div className="product-name" onClick={() => {
                                            navigate(`/products/details`, { state: { product } });
                                        }}>
                                            <h2>{product.name}</h2>
                                        </div>
                                        <div className="product-count">
                                            <h3>Ilość</h3>
                                            <select
                                                className="form-select count"
                                                value={product.count}
                                                onChange={(event) => {
                                                    onQuantityChange(product.id, event.target.value, product.kind);
                                                }}
                                            >
                                                {[...Array(10).keys()].map((number) => {
                                                    const num = number + 1;
                                                    return (
                                                        <option value={num} key={num}>
                                                            {num}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="product-price">
                                            <h3>Koszt:</h3>
                                            {(product.price * product.count).toFixed(2)} zł
                                        </div>
                                        <div className="remove-from-cart-button">
                                            <button
                                                className="btn remove-btn"
                                                onClick={() => onProductRemove(product)}
                                            >
                                                <RiDeleteBin6Line size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {productsInCart.length > 0 ?
                            <>
                                <hr className="mb-3" />
                                <div className="Wartość koszyka: ">
                                    <h3>Wartość koszyka:</h3>
                                    {totalCost} zł
                                </div>
                                <hr className="mb-3" />
                                <div className="delivery-options">
                                    <h3>Opcje dostawy:</h3>
                                    {deliveries.map((delivery) => (
                                        <div key={delivery.id} className={delivery.blocked ? "delivery-option-blocked" : "delivery-option"}>
                                            <input
                                                type="radio"
                                                name="deliveryOption"
                                                checked={selectedDelivery === delivery.id}
                                                onChange={() => handleDeliveryChange(delivery.id)}
                                                disabled={delivery.blocked} // Dodajemy właściwość disabled, jeśli dostawa jest zablokowana
                                            />
                                            {delivery.name} - {delivery.price.toFixed(2)} zł
                                            {delivery.blocked && <span className="blocked-delivery-description"> - {delivery.description} (niedostępna)</span>}
                                        </div>
                                    ))}
                                </div>

                                <hr className="mb-3" />
                                <div className="Wartość koszyka: ">
                                    <h3>Całkowity koszta:</h3>
                                    {totalCostEnd } zł
                                </div>
                                <div/>
                                <hr />
                                <button
                                    type="button"
                                    className="btn btn-primary checkout-button"
                                    onClick={() => navigate(`/payment/${parseFloat(totalCost) + selectedDeliveryCost}`)}>
                                    Złóż zamówienie i przejdź do płatności
                                </button>
                            </>
                            : <hr />
                        }
                        <Modal show={showSuccessModal} onHide={handleCloseModals}>
                            <Modal.Header closeButton>
                                <Modal.Title>Checkout Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p> Założyłeś zamówienie</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleCloseModals}>
                                    Zamknij
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showErrorModal} onHide={handleCloseModals}>
                            <Modal.Header closeButton>
                                <Modal.Title>Error</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>{errorMessage}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleCloseModals}>
                                    Zamknij
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

            </Container>
        </AppWrapper>
    );
}

export default ShoppingCart;

