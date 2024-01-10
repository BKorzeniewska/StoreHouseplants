import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Card, Col, Container, Pagination, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useError } from "../../common/ErrorContext";
import { AppWrapper } from "../../common/AppWrapper";
import { Result } from "../../common/poliTypes";
import {Article, ArticleErrors, loadArticleByChaptersId} from "./apis/article";// Adjust import paths as necessary
import { APIError } from "../../common/axiosFetch";
import {loadPlants} from "../../plant/apis/plant";
import {FaArrowDown91, FaArrowUpAZ} from "react-icons/fa6";

export const ArticleItemList = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const { setError } = useError();
    const [articles, setArticles] = useState<Article[]>([]);
    const [displayArticle, setDisplayArticle] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;
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

    const sortPlantByName = () => {
        setSortAscending(!sortAscending);
        setDisplayArticle([...displayArticle].sort((a, b) => {
            if (sortAscending) {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-2 w-200">
                <div className="page-tile">  Artykuły </div>
                <hr className="h-10"/>
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaArrowUpAZ onClick={sortPlantByName} style={{fontSize: '30px'}}>
                        <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                    </FaArrowUpAZ>


                </div>
                <Row xs={1} md={1} lg={1} xl={5} className="g-4">
                    {articles.map(article => (
                        <Col key={article.id}>
                            <Card onClick={() => navigate(`/article/${article.id}`)}>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${article.image}`}
                                          alt={article.title}/>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div className="title-container"
                                         style={{padding: '10px'}}> {/* Adjust padding as needed */}
                                        <Card.Title
                                            className="text-center card-title-custom mb-2">{article.title}</Card.Title>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination className='d-flex justify-content-center mt-4'>
                    <Pagination.First onClick={() => setPageNumber(1)} disabled={pageNumber === 1}/>
                    <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}/>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                        <Pagination.Item
                            key={page}
                            active={page === pageNumber}
                            onClick={() => setPageNumber(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)}
                                     disabled={pageNumber === totalPages}/>
                    <Pagination.Last onClick={() => setPageNumber(totalPages)}
                                     disabled={pageNumber === totalPages}/>
                </Pagination>
            </Container>
        </AppWrapper>
    );
};

export default ArticleItemList;
