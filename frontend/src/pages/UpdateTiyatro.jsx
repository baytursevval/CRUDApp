import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateTiyatro.css'


const UpdateTiyatro = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        actor: '',
        description: '',
        time: ''
    });

    const handleInputChange = (event) => { //form elemanının değeri değiştiğinde değişiklikleri işler.
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchTiyatro = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/tiyatro/' + id);
                const data = await response.json();
                setFormData(data);
                console.log(data);
            } catch (error) {
                console.error("error:", error.message);
            }
        };
        fetchTiyatro();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.actor || !formData.description || !formData.time) {
            setError('Lütfen bu alanı doldurun');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/tiyatro/' + id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("güncellenen oyun: ", data);

            navigate("/");
        } catch (error) {
            console.log("error: ", error.message)
        }
    };
    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <div className="center-form">
                <h2>Güncelle</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Oyun</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Oyun adı"
                            name="title"
                            value={formData.title}
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
                            value={formData.actor}
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
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTime">
                        <Form.Label>Süre</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Süre"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="mt-3">
                        Güncelle
                    </Button>
                </Form>
                <Button variant="secondary" className="fixed-bottom-left mt-3" onClick={handleBack}>Geri</Button>
            </div>
        </div>
    )
}

export default UpdateTiyatro;