import React, {useContext, useEffect, useState} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {Article, changeVisibility, ChangeVisibilityRequest, loadArticleById} from "./apis/article";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import { LoadingSpinner} from "../../common/Spinner";
import "../../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MarkDownRenderer} from "../../common/markdown/MarkDownRenderer";
import {AppWrapper} from "../../common/AppWrapper";
import {useError} from "../../common/ErrorContext";

import { AuthContext } from "../../auth/AuthContext";


export const AcrticleScreen = () => {
    const { articleId } = useParams();
    const params = new URLSearchParams(window.location.pathname);
    const { setToken, isLoggedIn, isAuthorized, setRole, setUser, getUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { setError } = useError();
    const [reload, setReload] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(
        () => {
            loadArticleById(articleId || "0").then(
                (article) => {
                    if (article.isOk) {

                        setArticle(article.value);
                    } else {
                        setArticle(

                            {

                                id: 0,
                                title: "Nie udało się wczytać strony",
                                content: `# Ups! Coś poszło nie tak\n\`\`\`py\n# TODO fix this... \nraise Exception("Nie udało się wczytać strony")\n\`\`\` \n ## Ale nie martw się \n Wszystko będzie dobrze`,
                                chapterId: 0,
                                userId: 0,
                                visible: true,
                                image: "",
                                date: new Date().toISOString(),

                            });
                    }
                }
            ).finally(
                () => {
                    setisLoading(false);
                }
            )
        }, [articleId]
    );
    function toggleVisible(): void {
        const req: ChangeVisibilityRequest = {
            articleId: article?.id!!,
            visible: !article?.visible!!,
        }
        changeVisibility(req).then((res) => {
            if (res.isOk) {
                console.log("Visibility changed");
                setReload(!reload);

            } else {
                setError("Nie udało się zmienić widoczności artykułu");
            }
        })
    }

    return (
        <>
            <AppWrapper>
                <Container className="mt-5" style={{ minHeight: "100vh" }}>
                    {!article?.visible &&
                        <Alert variant="warning">
                            Ten artykuł jest ukryty, tylko administratorzy  mogą go zobaczyć
                        </Alert>
                    }
                    {((isAuthorized("ADMIN")&& !article?.visible )|| article?.visible)&&
                        <>
                    <Row>
                        <div className="m-auto my-3 text-center">
                            <h1>{article?.title}</h1>
                        </div>
                    </Row>
                    <Row>
                        <div className="m-auto my-3">
                            <LoadingSpinner isLoading={isLoading}>
                                <Row className="m-auto">
                                    <div className="m-auto my-3">
                                        <MarkDownRenderer content={article?.content!!} />
                                        <hr/>
                                        <img src={article?.image ? `data:image/jpg;base64,${article.image}` : 'placeholder.jpg'}
                                             style={{ maxWidth: '400px', height:'auto'}} />
                                    </div>
                                </Row>
                            </LoadingSpinner>
                        </div>
                    </Row>
                            {isAuthorized("ADMIN") &&
                                <Row className="my-3 ">
                                    <Col style={{ textAlign: "center" }}>
                                        <Button onClick={toggleVisible} className='mt-2 ' style={{ width: '100%'}}>
                                            {article?.visible ? "Ukryj atrykuł" : "Upublicznij artykuł"}
                                        </Button>
                                    </Col>
                                </Row>
                            }
                        </>
                    }

                </Container>
            </AppWrapper>
        </>
    )
}