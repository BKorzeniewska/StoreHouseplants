import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useError } from "../../common/ErrorContext";
import {Species, loadSpecies} from "./apis/species";
import { AppWrapper } from "../../common/AppWrapper";
import "./SpeciesItemList.css"; // Załóżmy, że stworzyłeś plik CSS o tej nazwie

export const SpeciesItemList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [speciesL, setSpecies] = useState<Species[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSpecies().then(result => {
            if (result.isOk) {
                setSpecies(result.value);
            } else {
                setError("Nie udało się wczytać gatunków");
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
                    {speciesL.map(species => (
                        <div key={species.id} className="chapter-tile" onClick={() => navigate(`/chapter/${species.id}`)}>
                            <h3>{species.name}</h3>
                            <img src={species.image || 'default-placeholder.png'} alt={species.name} className="chapter-image" />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};
