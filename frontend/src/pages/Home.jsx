import React, { Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
    return (
        <Fragment>
            <div style={{ margin: "10rem" }}>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>name</th>
                            <th>age</th>
                        </tr>
                    </tbody>
                </Table>

            </div>
        </Fragment>
    );
}

export default Home