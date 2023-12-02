import { ReactNode, useContext, useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Form, ListGroup, Modal, Nav, NavDropdown, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FaPen, FaTrash } from 'react-icons/fa';
import {useError} from "../../common/ErrorContext";
import {BsCheck2Circle} from "react-icons/all";
import {AuthContext} from "../../auth/AuthContext";
import {Chapter} from "./chapter";

type Props = {
    chapter: Chapter,
}
export const ChallengeListItem = (props: Props) => {
    const navigate = useNavigate();
    const { articleId } = useParams();
    const { errorMessages, setError } = useError();
    const location = useLocation();
    const { isAuthorized } = useContext(AuthContext);
    //make a copy of challenge

    const challenge: Chapter = { ...props.chapter };

    const [showModal, setShowModal] = useState(false);


    const handleDeleteChallenge = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();


        setShowModal(false);
    };


    return (
        <div
            className="custom-list-item d-flex justify-content-between align-items-start "
            onClick={() => navigate(`/challenge/`, { state: { challenge } })}
        >
            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Usunąć zadanie?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy jesteś pewny że chcesz usunąć to zadanie?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(event) => { event.preventDefault();event.stopPropagation();setShowModal(false) }}>
                        Nie
                    </Button>
                    <Button variant="danger" onClick={(e) => handleDeleteChallenge(e)}>
                        Tak
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.chapter.name}</div>


            </div>
            <div className='option-section'>
                {isAuthorized("MODERATOR") &&
                    <span className="modify-button">
                        <FaPen onClick={(event) => { event.preventDefault(); event.stopPropagation(); navigate(`/admin/challenge/edit/${props.chapter.id}`) }} />

                    </span>}
                {isAuthorized("MODERATOR") &&
                    <span className="modify-button">
                        <FaTrash onClick={(event) => { event.preventDefault(); event.stopPropagation(); setShowModal(true) }} />

                    </span>}
            </div>
        </div>
    );
};
