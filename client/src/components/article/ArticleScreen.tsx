import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
    Article,
    ChangeVisibilityRequest,
    changeVisibility,
    loadArticleById
} from "./apis/article";
import { AppWrapper } from "../common/AppWrapper";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { LoadingSpinner } from "../common/Spinner";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MarkDownRenderer } from "../common/markdown/MarkDownRenderer";
import { CommentSection } from "../comments/CommentSection";
import { AuthContext } from "../auth/AuthContext";
import { useError } from "../common/ErrorContext";

export const AcrticleScreen = () => {
    const { articleId } = useParams();
    const params = new URLSearchParams(window.location.pathname);
    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(true);
    const [article, setArticle] = useState<Article | null>(null);
    const { isAuthorized } = useContext(AuthContext);
    const { setError } = useError();
    const [reload, setReload] = useState(false);

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
                                    date: new Date().toISOString(),
                                    visible: true,
                                });
                    }
                }
            ).finally(
                () => {
                    setisLoading(false);
                }
            )
        }, [articleId, reload]
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
                    <LoadingSpinner isLoading={isLoading}>
                        {!article?.visible &&
                            <Alert variant="warning">
                                Ten artykuł jest ukryty, tylko administratorzy i moderatorzy mogą go zobaczyć
                            </Alert>
                        }
                        <Row>
                            <div className="m-auto my-3 text-center">
                                <h1>{article?.title}</h1>
                            </div>
                        </Row>
                        <Row>
                            <div className="m-auto my-3">


                                <Row className="m-auto">
                                    <div className="m-auto my-3">
                                        <MarkDownRenderer content={article?.content!!} />
                                    </div>
                                </Row>

                                {isAuthorized("MODERATOR") &&
                                    <Row className="my-3 ">
                                        <Col style={{ textAlign: "center" }}>
                                            <Button onClick={toggleVisible} className='mt-2'>
                                                {article?.visible ? "Ukryj atrykuł" : "Upublicznij artykuł"}
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                                <Row>
                                    <CommentSection articleId={article?.id!!}></CommentSection>
                                </Row>
                            </div>
                        </Row>
                    </LoadingSpinner>
                </Container>
            </AppWrapper>
        </>
    )
}