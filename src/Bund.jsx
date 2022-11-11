import React, { Component } from 'react';
import './index.css';
import styles from './index.css';

class Bund extends React.Component {
    render() {
        return (
            <div class="container-bund">
                <h1>Kontaktoplysninger: </h1>
                <table>
                    <tr>
                        <th>Nummer:</th>
                        <td>61417696</td>
                    </tr>
                    <tr>
                        <th>Adresse:</th>
                        <td>Adressevej 1</td>
                    </tr>
                    <tr>
                        <th>E-mail</th>
                        <td></td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default Bund;