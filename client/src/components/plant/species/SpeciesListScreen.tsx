import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useError } from "../../common/ErrorContext";
import { Species, loadSpecies } from "./apis/species";
import { AppWrapper } from "../../common/AppWrapper";
import "./SpeciesItemList.css"; // Załóżmy, że stworzyłeś plik CSS o tej nazwie

export const SpeciesItemList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [speciesL, setSpecies] = useState<Species[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSpecies().then(result => {
            if (result.isOk && Array.isArray(result.value)) {
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
                <h2>Gatunki roślin</h2>
                <div className="product-card-grid">
                    {Array.isArray(speciesL) && speciesL.map(species => (
                        <div key={species.id} className="product-card-tile" onClick={() => navigate(`/plants/species/${species.id}`)}>
                            <h3>{species.name}</h3>
                            <img
                                src={`data:image/jpeg;base64,${species?.image}`}
                                alt={species?.name} className="product-card-image"
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </AppWrapper>
    );
};
