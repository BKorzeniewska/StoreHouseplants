import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../themes/ThemeProvider";
import "../../App.css";
import "./home.css"

import { AppWrapper } from "../common/AppWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { ArticleShort, loadLatestArticles } from "../blog/article/apis/article";
import { useError } from "../common/ErrorContext";
import {loadPlantsPopular, PlantShort} from "../plant/apis/plant";

type Props = {};

const HomeScreen = (props: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [articles, setArticles] = useState<ArticleShort[]>([]);
  const [plants, setPlants] = useState<PlantShort[]>([]);
  const location = useLocation();
  const [isLoading, setisLoading] = useState(true);
  const { errorMessages, setError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    loadLatestArticles().then((data) => {
      if (data.isOk) {
        setArticles(data.value);
      } else {
        setError("Nie udało się załadować najnowszych artykułów");
      }
    });
    loadPlantsPopular().then((data) => {
      if (data.isOk) {
        setPlants(data.value);
      } else {
        setError("Nie udało się załadować polecanych roślin");
      }
    });

    setisLoading(false);
  }, [location]);

  return (
      <AppWrapper>
        <Container className="pt-3">
          {/* Big Banner */}
          <div className="banner">
          <img className="banner-img" src={require("../../assets/background1.png")} />
          </div>
          <p className="site-description">Witaj! W naszym sklepie znajdziesz rośliny domowe oraz podłoża i akcesoria do ich pielęgnacji. Zpraszamy też serdecznie do części blogowej zawierajacej krótkie porady dotyczące hodowli.</p>
          <h2>Polecane rośliny</h2>
          <Row className="mt-3">
            {plants.map((plant) => (
                <Col md={2} sm={4} key={plant.id} onClick={() => navigate(`/plant/${plant.id}`)}>
                  <div className="article-tile">
                    <h3><strong>{plant.name}</strong></h3>
                  </div>
                </Col>
            ))}
          </Row>
          <h2>Najnowsze artykuły</h2>
          <Row className="mt-3">
            {articles.map((article) => (
              <Col md={2} sm={4} key={article.id} onClick={() => navigate(`/article/${article.id}`)}>
                <div className="article-tile">
                  <h3><strong>{article.title}</strong></h3>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </AppWrapper>
  );
};

export default HomeScreen;
