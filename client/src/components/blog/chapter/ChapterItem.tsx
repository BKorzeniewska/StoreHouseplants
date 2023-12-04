import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError } from "../../common/ErrorContext";
import { Chapter, loadChapters } from "./chapter";
import { AppWrapper } from "../../common/AppWrapper";


export const ChapterItemList = () => {
    const navigate = useNavigate();
    const { errorMessages, setError } = useError();
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
                <div>
                    {chapters.map(chapter => (
                        <div key={chapter.id} onClick={() => navigate(`/chapter/${chapter.id}`)}>
                            <h3>{chapter.name}</h3>
                            <img src={chapter.image || 'default-placeholder.png'} alt={chapter.name} />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};





