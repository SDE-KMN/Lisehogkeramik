import React, { Component } from 'react';
import './index.css';
import styles from './index.css';
import * as Icons from '@iconscout/react-unicons';
import FARMOR from './FARMOR.jpg'

class Bund extends React.Component {
    onTouchMove = event => {
        alert("STOP MED AT RØRER MIG")
    }
    render() {
        return (
            <div class="container-bund">
                <h1>Kontaktoplysninger:</h1>
                <div>
                    <section>
                        <Icons.UilPhone size="80" color="#6e6e6e" />
                        <h3>Telefon</h3>
                        <h2>8888-8888</h2>
                    </section>
                    <section>
                        <Icons.UilFacebookF size="80" color="#6e6e6e" />
                        <h3>Facebook</h3>
                        <h2>Nima Badiei</h2>
                    </section>
                    <section>
                        <Icons.UilEnvelope size="80" color="#6e6e6e" />
                        <h3>E-Mail</h3>
                        <h2>Mail@gmail.com</h2>
                    </section>
                </div>
            </div>
        )
    }
}

export default Bund;