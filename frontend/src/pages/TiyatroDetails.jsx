import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './TiyatroDetails.css';

const TiyatroDetails = () => {
    const { id } = useParams();
    const [tiyatro, setTiyatro] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTiyatroDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/tiyatro/${id}`);
                const data = await response.json();
                setTiyatro(data);
            } catch (error) {
                console.error("error: ", error.message);
            }
        };
        fetchTiyatroDetails();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    }

    if (!tiyatro) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>{tiyatro.title}</h1>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Oyun</Form.Label>
                            <Form.Control type="text" value={tiyatro.title} readOnly />
                        </Form.Group>

                        <Form.Group controlId="formActor" className="mt-3">
                            <Form.Label>Aktör</Form.Label>
                            <Form.Control type="text" value={tiyatro.actor} readOnly />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>Açıklama</Form.Label>
                            <Form.Control as="textarea" rows={3} value={tiyatro.description} readOnly />
                        </Form.Group>

                        <Form.Group controlId="formTime" className="mt-3">
                            <Form.Label>Süre</Form.Label>
                            <Form.Control type="text" value={`${tiyatro.time} dk`} readOnly />
                        </Form.Group>

                        <div className="button-container">
                            <Button variant="secondary" className="mt-3" onClick={handleBack}>Geri</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default TiyatroDetails;
