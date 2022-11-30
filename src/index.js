import React from 'react';
import ReactDOM from 'react-dom/client';
import Top from './Top.jsx'
import Midt from './Midt.jsx'
import Bund from './Bund.jsx'
import Carousel from './telefoncarousel.jsx'
import * as bootstrap from 'bootstrap';
 window.bootstrap = bootstrap;

 const top = ReactDOM.createRoot(document.getElementById('top'))
 top.render(<Top/>)
 
 const midt = ReactDOM.createRoot(document.getElementById('midt'))
 midt.render(<Midt/>)
 
 const Telefoncarousel = ReactDOM.createRoot(document.getElementById('telefoncarousel'))
 Telefoncarousel.render(<Carousel/>)
 
 const bund = ReactDOM.createRoot(document.getElementById('bund'))
 bund.render(<Bund/>)
 



