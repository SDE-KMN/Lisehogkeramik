import React, { Component } from 'react';
import './index.css';
import canvas from './keramik-kursus-1.jpeg';

class Top extends React.Component {
    render() {
        return (
            <div>
                <div className="nav-link">
                    <a href="http://172.16.3.120:3000/" rel="home">
                        <span>LogoPlatformTing</span>
                    </a>
                </div>
            <div class="container-top">
                <img src={canvas} class="intro" />
                <h1 class="slide-right">
                    Lise Høg Keramik
                </h1>
            </div>
            </div>
        )
    }
}

export default Top;