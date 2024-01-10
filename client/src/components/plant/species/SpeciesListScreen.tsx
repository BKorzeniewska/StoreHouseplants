import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Container, Modal, Pagination, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useError } from "../../common/ErrorContext";
import {Species, loadSpecies, deleteSpecies} from "./apis/species";
import { AppWrapper } from "../../common/AppWrapper";
import "./SpeciesItemList.css";
import {FaArrowUpAZ} from "react-icons/fa6";
import {AddSpecies} from "../../admin/species/AdminSpeciesScreen"; // Załóżmy, że stworzyłeś plik CSS o tej nazwie

export const SpeciesItemList = () => {
    const navigate = useNavigate();
    const { setError } = useError();
    const [allSpecies, setAllSpecies] = useState<Species[]>([]);
    const [displaySpecies, setDisplaySpecies] = useState<Species[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;
    const [sortAscending, setSortAscending] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [speciesId, setSpeciesId] =  useState<number>(0);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const [addPlant, setAddPlant] = useState(false);

    useEffect(() => {
        fetchSpecies();
    }, []);

    useEffect(() => {
        const filteredSpecies = searchTerm
            ? allSpecies.filter(species => species.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : allSpecies;

        setTotalPages(Math.ceil(filteredSpecies.length / itemsPerPage));
        setDisplaySpecies(filteredSpecies.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }, [allSpecies, pageNumber, searchTerm]);

    const fetchSpecies = async () => {
        setIsLoading(true);
        try {
            const result = await loadSpecies();
            if (result.isOk) {
                setAllSpecies(result.value);
            } else {
                setError("Failed to load species");
            }
        } catch (error) {
            setError("Error loading species");
        }
        setIsLoading(false);
    };

    const sortSpeciesByName = () => {
        setSortAscending(!sortAscending);
        setDisplaySpecies([...displaySpecies].sort((a, b) => {
            if (sortAscending) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AppWrapper hideSidebar>
            <Container className="my-2 w-200">
                <div className="page-tile"> Gatunki roślin</div>
                <hr className="h-10" />
                <div className="title-admin">
                    <input
                        type="text"
                        placeholder="Wyszukaj po nazwie"
                        className="form-control "
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaArrowUpAZ onClick={sortSpeciesByName}  style={{ fontSize: '30px' }}>
                        <i className={`bi ${sortAscending ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
                    </FaArrowUpAZ>
                </div>
                <Row xs={6}   className="g-4">
                    {displaySpecies.map(species => (
                        <Col key={species.id}>
                            <Card onClick={() => navigate(`/plants/species/${species.id}`)}>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${species?.image}`} alt={species?.name} />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="text-center card-title-custom h-25">{species.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Pagination className='d-flex justify-content-center mt-4'>
                    <Pagination.First onClick={() => setPageNumber(1)} disabled={pageNumber === 1} />
                    <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1} />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Pagination.Item
                            key={page}
                            active={page === pageNumber}
                            onClick={() => setPageNumber(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages} />
                    <Pagination.Last onClick={() => setPageNumber(totalPages)} disabled={pageNumber === totalPages} />
                </Pagination>

            </Container>
        </AppWrapper>
    );
}