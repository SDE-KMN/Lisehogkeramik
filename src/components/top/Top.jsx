import React, { Component } from "react";
import "./top.css";
import canvas from "../../BillederFolder/keramik-kursus-1.jpeg";

class Top extends React.Component {
  render() {
    return (
      <div>
        <div className="nav-link">
          <a href="http://172.16.3.120:3000/" rel="home">
            <span class="logo">Lh</span>
            <span class="logotext">Unika-Keramik</span>
          </a>
        </div>
        <div class="container-top">
          <img src={canvas} class="intro" />
          <h1 class="slide-right">Lise Høg Keramik</h1>
        </div>
        <div class="profile">
            <div class="user"></div>
            <p class="usertext"><br/>
            Hej jeg hedder Lise Nielsen Høg<br/><br/>
            I min fritid laver jeg keramik og strikker<br/><br/>
            Jeg går på pension og mangler noget at lave<br/><br/>
            Så jeg bruger min tid på at være kreativ</p>
        </div>
      </div>
    );
  }
}

export default Top;
