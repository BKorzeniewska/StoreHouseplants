import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Nav, NavDropdown, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Article, ArticleMenu, CreateArticleRequest, ModifyArticleRequest, createArticle, loadArticleById, loadArticleMenu, modifyArticle} from "../../blog/article/apis/article";
import { useError} from "../../common/ErrorContext";
import { ThemeContext } from '../../themes/ThemeProvider';
import { AppWrapper} from "../../common/AppWrapper";
import { MarkDownRenderer } from '../../common/markdown/MarkDownRenderer';
import { LoadingSpinner} from "../../common/Spinner";


export const ArticleEditionScreen = () => {
    const navigate = useNavigate();
    const [currentArticle, setCurrentArticle] = useState<number | null>(null);

    const [currentText, setCurrentText] = useState<string>("");
    const [article, setArticle] = useState<Article>();
    const { errorMessages, setError } = useError();
    const [articleImage, setArticleImage] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const lineCount = currentText.split("\n").length;
    const { articleId } = useParams();


    const [menu, setMenu] = useState<ArticleMenu[]>();

    const location = useLocation();
    useEffect(() => {
        loadArticleMenu().then((data) => {
            if (data.isOk) {
                setMenu(data.value);
            } else {
                setError("Nie udało się załadować listy artykułów");
            }
        });
    }, [location]);


    useEffect(
        () => {
            if (articleId) {
                loadArticleById(articleId || "0").then(
                    (art) => {
                        if (art.isOk) {
                            setArticle(art.value);
                            setCurrentText(art.value.content);
                            setArticleImage(art.value.image);
                        } else {
                            setError("Nie udało się wczytać artykułu");
                            setCurrentText("Coś poszło nie tak...");
                            setArticle(

                                {
                                    id: 0,
                                    title: "Nie udało się wczytać artykułu",
                                    content: "Coś poszło nie tak...",
                                    chapterId: 0,
                                    userId: 0,
                                    visible: true,
                                    date: new Date().toISOString(),
                                    image: ""

                                });
                        }

                    }
                )
            }
            else {
                setArticle(

                    {
                        id: 0,
                        title: "",
                        content: "",
                        chapterId: 0,
                        userId: 0,
                        visible: true,
                        image: "",
                        date: new Date().toISOString(),

                    });
                setCurrentText(article?.content || "");
                setArticleImage(article?.image||"");
            }

        }, [articleId]
    );
    const handleImageClick = () => {
        const imageFileInput = document.getElementById('image-file') as HTMLInputElement;
        imageFileInput?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const base64String = reader.result.toString().split(',')[1];
                    setArticleImage(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppWrapper hideSidebar>
            <Container className="my-5">
                <h2>{article?.title}</h2>
                <Row>
                    <Col>
                        <MarkDownRenderer content={currentText} key={currentText}/>
                        <img src={articleImage ? `data:image/jpg;base64,${articleImage}` : 'placeholder.jpg'}
                             onClick={handleImageClick}
                             style={{ maxWidth: '300px', marginLeft:"20%", marginRight:"20%"}} />
                        <div/>
                    </Col>
                    <Col>
                        <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setIsLoading(true);

                            if (articleId === undefined) {
                                const request: CreateArticleRequest = {
                                    title: (event.target as any).elements.formTitle.value,
                                    content: (event.target as any).elements.formContent.value,
                                    chapterId: parseInt((event.target as any).elements.formChapterId.value),
                                    image: articleImage
                                };
                                console.log(request);
                                createArticle(request).then(
                                    (article) => {
                                        if (article.isOk) {
                                            navigate(`/article/${article.value.id}`);
                                        } else {
                                            setError("Nie udało się utworzyć artykułu");
                                        }
                                    }
                                )
                            }
                            else {
                                const request: ModifyArticleRequest = {
                                    title: (event.target as any).elements.formTitle.value,
                                    content: (event.target as any).elements.formContent.value,
                                    image: articleImage,
                                    id: parseInt(articleId),
                                };
                                console.log(request);
                                modifyArticle(request).then(
                                    (article) => {
                                        if (article.isOk) {
                                            navigate(`/article/${article.value.id}`);
                                        } else {
                                            setError("Nie udało się utworzyć artykułu");
                                        }
                                    }
                                )

                            }
                            console.log("submit");
                            setIsLoading(false);
                        }}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Tytuł:</Form.Label>
                                <Form.Control type="text" placeholder="Wprowadź tytuł" defaultValue={article?.title} />
                            </Form.Group>
                            {articleId === undefined &&
                                <Form.Group className="mb-3" controlId="formChapterId">
                                    <Form.Label>Rozdział:</Form.Label>
                                    <Form.Select aria-label="Wybierz rozdział" defaultValue={article?.chapterId}>
                                        {menu?.map((menu) => (
                                            <option key={menu.name} value={menu.id}>{menu.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>}

                            <Form.Group className="mb-3" controlId="formContent">
                                <Form.Label>Artykuł:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    style={{ fontFamily: "monospace" }}
                                    rows={lineCount > 20 ? lineCount + 2 : 20}
                                    defaultValue={article?.content}
                                    onChange={(event) => setCurrentText(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Grafika</Form.Label>
                                <div/>
                                <img src={articleImage ? `data:image/jpg;base64,${articleImage}` : 'placeholder.jpg'}
                                     onClick={handleImageClick}
                                     style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                <div/>
                                <input
                                    type='file'
                                    id='image-file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit" className="submit-button" disabled={isLoading} style={{width: '100%' }}>
                                    <LoadingSpinner isLoading={isLoading}>Zatwierdź</LoadingSpinner>
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>

                </Row>
            </Container>
        </AppWrapper>
    );
};
