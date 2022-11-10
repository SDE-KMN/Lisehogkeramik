import React, { Component } from 'react';
import './index.css';

class Bund extends React.Component {
    render() {
        return (
            <div class="container-bund">
                <h3>Kontaktoplysninger: </h3>
                <table>
                    <tr>
                        <th>Nummer</th>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>Adresse</th>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <th>CVR</th>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default Bund;