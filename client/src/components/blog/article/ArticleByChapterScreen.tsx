import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import { Chapter, loadChapters} from "../chapter/chapter";
import { AppWrapper } from "../../common/AppWrapper";
import { Result } from "../../common/poliTypes";
import {ArticleErrors} from "./apis/article";
import {APIError} from "../../common/axiosFetch";

export const ChapterItemList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadChapters().then((result: Result<Chapter[], APIError<ArticleErrors>>) => {
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
                <h2>Rozdziały</h2>
                <div>
                    {chapters.map(chapter => (
                        <div key={chapter.id} onClick={() => navigate(`/chapter/${chapter.id}`)}>
                            <h3>{chapter.name}</h3>
                            {/* Zakładając, że istnieje pole image w Chapter */}
                            <img src={chapter.image || 'default-placeholder.png'} alt={chapter.name} />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};

export default ChapterItemList;
