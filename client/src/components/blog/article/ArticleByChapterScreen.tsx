import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import { AppWrapper } from "../../common/AppWrapper";
import { Result } from "../../common/poliTypes";
import {Article, ArticleErrors, loadArticleByChaptersId} from "./apis/article";// Adjust import paths as necessary
import { APIError } from "../../common/axiosFetch";
import {loadPlants} from "../../plant/apis/plant";

export const ArticleItemList = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const { setError } = useError();
    const [articles, setArticles] = useState<Article[]>([]);
    const [displayArticle, setDisplayArticle] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;
    const [sortAscending, setSortAscending] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchArticle();
    }, []);

    useEffect(() => {
        const filteredPlants = searchTerm
            ? articles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
            : articles;

        setTotalPages(Math.ceil(filteredPlants.length / itemsPerPage));
        setDisplayArticle(filteredPlants.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [articles, pageNumber, searchTerm]);

    const fetchArticle = async () => {
        setIsLoading(true);
        try {
            const result = await  loadArticleByChaptersId(chapterId!);
            if (result.isOk) {
                setArticles(result.value);
            } else {
                setError("Nie udało się załadować artykułów");
            }
        } catch (error) {
            setError("Nie udało się załadować artykułów");
        }
        setIsLoading(false);
    };


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
