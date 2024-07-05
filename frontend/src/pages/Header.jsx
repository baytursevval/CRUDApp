import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import SurpriseModal from './SurpriseModal';
import { FaTheaterMasks } from 'react-icons/fa';

const Header = () => {
    return (
        <div>
            <Navbar bg="custom" variant="dark" expand="lg" className="custom-navbar justify-content-center">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="mx-auto">
                        <FaTheaterMasks size="2em" className="mr-2" />  TİYATROLAR
                        <FaTheaterMasks size="2em" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            <SurpriseModal />
        </div>
    );
}

export default Header;
