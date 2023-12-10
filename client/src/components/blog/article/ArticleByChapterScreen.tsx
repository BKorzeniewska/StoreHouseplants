import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import { AppWrapper } from "../../common/AppWrapper";
import { Result } from "../../common/poliTypes";
import {Article, ArticleErrors, loadArticleByChaptersId} from "./apis/article";// Adjust import paths as necessary
import { APIError } from "../../common/axiosFetch";

export const ArticleItemList = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const { setError } = useError();
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (chapterId) {
            loadArticleByChaptersId(chapterId).then((result: Result<Article[], APIError<ArticleErrors>>) => {
                if (result.isOk) {
                    setArticles(result.value);
                } else {
                    setError("Nie udało się wczytać artykułów z rozdziału");
                }
                setIsLoading(false);
            });
        }
    }, [chapterId, setError]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <h2>Artykuły</h2>
                <div>
                    {articles.map(article => (
                        <div key={article.id} onClick={() => navigate(`/article/${article.id}`)}>
                            <h3>{article.title}</h3>
                            {/* Zakładając, że istnieje pole image w Article */}
                            <img src={article.image || 'default-placeholder.png'} alt={article.title} />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};

export default ArticleItemList;
