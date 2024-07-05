import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
    const [tiyatro, setTiyatro] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTiyatro = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/tiyatrolar');
                const data = await response.json();
                setTiyatro(data);
                console.log("Fetched data:", data);
            } catch (error) {
                console.error("error: ", error.message);
            }
        };
        fetchTiyatro();
    }, []); //[]: comp. ilk render edildiğinde sadece 1 kere çalışır

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost:8080/api/tiyatro/' + id, {
                method: "DELETE",
            });
            if (response.ok) {
                setTiyatro((oncekiTiyatro) =>
                    oncekiTiyatro.filter((tiyatro) => tiyatro.id !== id)
                );
            }
            console.log(id + " nolu oyun silindi");
        } catch (error) {
            console.error("error: ", error.message);
        }
    }

    const handleUpdate = (id) => {
        navigate("/tiyatro/" + id);
    }

    const handleNavigateToPostTiyatro = () => {
        navigate('/tiyatro');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tiyatro.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(tiyatro.length / itemsPerPage); //üst tamsayıya yuvarlama

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleViewDetails = (id) => {
        navigate("/tiyatrodetails/" + id);
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Oyunlar Listesi</h1>
                    <Button variant="dark" onClick={handleNavigateToPostTiyatro} className="mb-3">
                        Yeni Oyun Ekle
                    </Button>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Oyun</th>
                                <th>Aktör</th>
                                <th>Açıklama</th>
                                <th>Süre</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.title}</td>
                                    <td>{t.actor}</td>
                                    <td> {t.description.length > 20 ? (
                                        <>
                                            {t.description.substring(0, 20)}...
                                            <Button variant="link" onClick={() => handleViewDetails(t.id)}>Devamını Gör</Button>
                                        </>
                                    ) : (
                                        t.description
                                    )}</td>
                                    <td>{t.time} dk</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => handleUpdate(t.id)}>Güncelle</Button>{" "}
                                        <Button variant="outline-danger" onClick={() => handleDelete(t.id)}>Sil</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination className="justify-content-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                                className="custom-pagination-item"
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
