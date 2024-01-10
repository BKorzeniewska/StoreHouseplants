import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError } from "../../common/ErrorContext";
import { Chapter, loadChapters } from "./chapter";
import { AppWrapper } from "../../common/AppWrapper";
import "./ChapterItemList.css"; // Załóżmy, że stworzyłeś plik CSS o tej nazwie
import "../../../App.css"; // Załóżmy, że stworzyłeś plik CSS o tej nazwie

export const ChapterItemList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadChapters().then(result => {
            if (result.isOk) {
                setChapters(result.value);
            } else {
                setError("Nie udało się wczytać rozdziałów");
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
                <div className="page-tile">Rozdziały</div>
                <hr/>

                <Row  xl={3} className="g-4">
                    {chapters.map(chapter => (
                        <Col key={chapter.id}>
                            <Card onClick={() => navigate(`/chapter/${chapter.id}`)}>
                                <Card.Img
                                    variant="top"
                                    src={`data:image/jpeg;base64,${chapter?.image}`}
                                    alt={chapter?.name}
                                    className="chapter-img"
                                />
                                <Card.Body>
                                    <Card.Title>{chapter.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>


            </Container>
        </AppWrapper>
    );
};
