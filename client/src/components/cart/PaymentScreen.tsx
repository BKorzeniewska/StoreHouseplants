import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import { AppWrapper } from "../common/AppWrapper";
import {useError} from "../common/ErrorContext";

export function PaymentScreen(props: any) {
    const { cost } = useParams();
    const [selectedPaymentType, setSelectedPaymentType] = useState<string>('');
    const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { setError } = useError();
    const navigate = useNavigate();

    useEffect(() => {
        setPaymentTypes(["Zapłać BLKIEM", "Zapłać kartą", "Zapłać przy odbiorze"]);
    }, []);

    const handleCloseModals = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };

    const renderPaymentOptions = () => {
        switch (selectedPaymentType) {
            case "Zapłać BLKIEM":
                return (
                    <Form.Group className="mb-3" controlId="blikCode">
                        <Form.Label>Kod BLIK</Form.Label>
                        <Form.Control type="text" placeholder="Wprowadź kod BLIK" />
                    </Form.Group>
                );
            case "Zapłać kartą":
                return (
                    <>
                        <Form.Group className="mb-3" controlId="cardNumber">
                            <Form.Label>Numer karty</Form.Label>
                            <Form.Control type="text" placeholder="Numer karty" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="expiryDate">
                            <Form.Label>Data ważności</Form.Label>
                            <Form.Control type="text" placeholder="MM/RR" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cvc">
                            <Form.Label>CVC/CVV</Form.Label>
                            <Form.Control type="text" placeholder="CVC/CVV" />
                        </Form.Group>
                    </>
                );
            case "Zapłać przy odbiorze":
                return (
                    <div className="mb-3">
                        Przygotuj odliczoną gotówkę przy odbiorze zamówienia.
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <AppWrapper hideSidebar>
                <Container fluid>
                    <div className="form-container">
                        <Row>
                            <div className="m-auto my-3 text-center">
                                <h1>Wybierz sposób płatności </h1>
                            </div>
                        </Row>
                        <Row>
                            <div className="m-auto w-75 my-3">
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        navigate(`/`);
                                    }}
                                >
                                    <Form.Group className="mb-3" controlId="paymentType">
                                        <Form.Label>Sposób płatności</Form.Label>
                                        <Form.Select onChange={(e) => setSelectedPaymentType(e.target.value)}>
                                            <option value="">Wybierz sposób płatności</option>
                                            {paymentTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {renderPaymentOptions()}

                                    <Button variant="primary" type="submit" className="w-100 mb-3">
                                        Zapłać
                                    </Button>
                                </Form>
                            </div>
                        </Row>
                    </div>
                    {/* Modal code here if needed */}
                </Container>
            </AppWrapper>
        </>
    );
}
