import React, { Component } from "react";
import "./index.css";
import * as bootstrap from "bootstrap";
import { useState } from "react";
window.bootstrap = bootstrap;

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      ber: [],
      mainbillede: "",
      list: [],
      knap: 0,
    };
  }

  slidesnbuttons = (tal) => {
    this.state.list = [];
    for (var i = 1; i < tal; i++) {
      const x = i;
      if (this.state.knap < this.state.ber.length - 1) {
        this.state.list.push(
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={x}
            aria-label={"Slide " + (x + 1)}
          ></button>
        );
      } else {
        this.state.list.push(
          <div class="carousel-item">
            <img src={this.state.ber[x]} class="d-block w-100" alt="" />
          </div>
        );
      }
      this.state.knap++;
    }
    return this.state.list;
  };

  billeder = async () => {
    const request = await fetch("/billeder")
    const response = await request.json();
    response.billeder.forEach((image) => {
      this.state.ber.push(`./static/${image}`)
    })
    this.setState({ mainbillede: this.state.ber[0] })
  }

  componentDidMount() {
    this.billeder()
    const carousel = new bootstrap.Carousel("#carouselExampleIndicators");
  }
  render() {
    return (
      <div class="container-carousel">
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-interval="false"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>

            {this.slidesnbuttons(this.state.ber.length)}
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={this.state.mainbillede} class="d-block w-100" alt="" />
            </div>

            {this.slidesnbuttons(this.state.ber.length)}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
