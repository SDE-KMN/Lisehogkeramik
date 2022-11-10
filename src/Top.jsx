import React, { Component } from 'react';
import './index.css';
import canvas from './keramik-kursus-1.jpeg';

class Top extends React.Component {
    render() {
        return (
            <div class="container-top">
                <img src={canvas} class="intro" />
                <h1 class="slide-right">
                    Lise Høg Keramik
                </h1>
            </div>
        )
    }
}

export default Top;