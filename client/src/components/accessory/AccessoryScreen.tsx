import { ReactNode, useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Nav, NavDropdown, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Accessory, loadAccessoryById } from '../accessory/accesory';
import { useError } from '../common/ErrorContext';
import { ThemeContext } from '../themes/ThemeProvider';
import { AppWrapper } from '../common/AppWrapper';
import { MarkDownRenderer } from '../common/markdown/MarkDownRenderer';
import { LoadingSpinner } from '../common/Spinner';


export const AccessoryEditionScreen = () => {
    const navigate = useNavigate();
    const [currentArticle, setCurrentArticle] = useState<number | null>(null);

    const [currentText, setCurrentText] = useState<string>("");
    const [accessory, setAccessory] = useState<Accessory>();
    const { errorMessages, setError } = useError();

    const [isLoading, setIsLoading] = useState(false);
    const lineCount = currentText.split("\n").length;
    const { accessoryId } = useParams();



    useEffect(
        () => {
            if (accessoryId) {
                loadAccessoryById(accessoryId || "0").then(
                    (acc) => {
                        if (acc.isOk) {
                            setAccessory(acc.value);
                            setCurrentText(acc.value.name);
                        } else {
                            setError("Nie udało się wczytać artykułu");
                            setCurrentText("Coś poszło nie tak...");
                            setAccessory(

                                {
                                    id: 0,
                                    name: "Nie udało się wczytać artykułu",
                                    description: "Coś poszło nie tak...",
                                    price: 0,
                                    category: "",
                                    stockQuantity: 0,
                                    imageUrl: "",

                                });
                        }

                    }
                )
            }
            else {

            }

        },
    );

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <h2>{accessory?.name}</h2>

                <h2>{accessory?.description}</h2>

            </Container>
        </AppWrapper>
    );
};
