import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError } from "../../common/ErrorContext";
import { Chapter, loadChapters } from "./chapter";
import { AppWrapper } from "../../common/AppWrapper";
import "./ChapterItemList.css"; // Załóżmy, że stworzyłeś plik CSS o tej nazwie

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
                <h2>Chapters</h2>
                <div className="chapter-grid">
                    {chapters.map(chapter => (
                        <div key={chapter.id} className="chapter-tile" onClick={() => navigate(`/chapter/${chapter.id}`)}>
                            <h3>{chapter.name}</h3>
                            <img src={chapter.image || 'default-placeholder.png'} alt={chapter.name} className="chapter-image" />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};
