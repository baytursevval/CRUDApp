import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PostTiyatro.css";

const PostTiyatro = () => {
    const [newTiyatro, setNewTiyatro] = useState({
        title: '',
        actor: '',
        description: '',
        time: ''
    });

    const handleInputChange = (event) => { //form elemanının değeri değiştiğinde değişiklikleri işler.
        const { name, value } = event.target;
        setNewTiyatro({
            ...newTiyatro,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newTiyatro.title || !newTiyatro.actor || !newTiyatro.description || !newTiyatro.time) {
            setError('Lütfen bu alanı doldurun');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/tiyatro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTiyatro),
            });

            const addedTiyatro = await response.json();
            console.log("tiyatro eklendi:", addedTiyatro);
            //setNewTiyatro({ title: '', actor: '', description: '', time: '' });
            //setError('');
            navigate('/');
        } catch (error) {
            console.error("Error:", error.message);
        }
    };
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <div>
            <div className="center-form">
                <h2>Yeni Tiyatro Ekle</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Oyun</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Oyun adı"
                            name="title"
                            value={newTiyatro.title}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formActor">
                        <Form.Label>Aktör</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Aktör"
                            name="actor"
                            value={newTiyatro.actor}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Açıklama</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Açıklama"
                            name="description"
                            value={newTiyatro.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTime">
                        <Form.Label>Süre (dk)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Süre"
                            name="time"
                            value={newTiyatro.time}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="mt-3">
                        Tiyatro Ekle
                    </Button>
                </Form>
                <Button variant="secondary" className="fixed-bottom-left mt-3" onClick={handleBack}>Geri</Button>
            </div>
        </div>
    );
};

export default PostTiyatro;
