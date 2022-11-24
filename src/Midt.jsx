import React, { Component, useEffect, useState } from "react";
import "./index.css";
import left from "./BillederFolder/arrows_left.png";
import right from "./BillederFolder/arrows_right.png";
// import * as bootstrap from "bootstrap";
import { format } from "react-string-format";
import * as Icons from "@iconscout/react-unicons";
import axios from 'axios';
import * as fs from 'fs';
import fs_react from 'fs-react';

function importAll(r) {
  return r.keys().map(r);
}

let hide_admin = false;

async function fetch_ip() {
  let ip;

  const res = await fetch("https://api.ipify.org/?format=json")

  ip = await res.json();

  if (ip.ip === "80.208.66.190" || ip.ip === "62.116.202.228") {hide_admin = false}
  console.log(hide_admin);
  return hide_admin;
}

/*
window.bootstrap = bootstrap;

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
*/

let images = importAll(
  require.context("./BillederFolder/slideshow/", false, /\.(png|jpg)$/)
);

class Midt extends React.Component {
  constructor(props) {
    super(props);
    let ber = images; // Laver en liste med de forskellige billeders variabler
    this.state = {
      // Laver et dictonary med variabler som vi bruger i koden
      nummer: 0,
      ber: ber,
      billede: ber[0],
      billede2: ber[1],
      billede3: ber[2],
      list: [],
      hide_admin: hide_admin,
      selectedFile: null,
      CLIENT_ID: "536002680283-3fv970aqqvg9g2bm855iijdfkrm97588.apps.googleusercontent.com",
      API_KEY: "AIzaSyAIkbuRlT3OmRASiHWG0mYcXgiFZjqGE2s",
    };
    this.skifthojre = this.skifthojre.bind(this);
    this.skiftvenstre = this.skiftvenstre.bind(this);
  }

  componentDidMount() {
    this.dot(0);

    if (hide_admin === true) {
      let admin = document.getElementsByName("admin");
      for (let x of admin) {
        x.classList.add("hidden");
      }
      document.getElementById("slet").style.display = "none";
    }
  }

  billede() {
    if (this.state.ber.length === this.state.nummer + 1) {
      this.setState({ billede2: this.state.ber[0] });
      this.setState({ billede3: this.state.ber[1] });
    }
    if (this.state.ber.length === this.state.nummer + 2) {
      this.setState({ billede3: this.state.ber[0] });
    }
  }

  classes() {
    let i = 0;
    for (let x of this.state.list) {
      if (this.state.nummer === i) {
        document.getElementById("dot" + i).classList.add("active");
      } else if (this.state.nummer === this.state.ber.length) {
        document.getElementById("dot" + 0).classList.add("active");
        document.getElementById("dot" + (this.state.ber.length - 1)).classList.remove("active");
      } else if (this.state.nummer === -1) {
        document.getElementById("dot" + (this.state.ber.length - 1)).classList.add("active");
        document.getElementById("dot" + 0).classList.remove("active");
      } else {
        document.getElementById("dot" + i).classList.remove("active");
      }
      i++;
      if (x) {
      }
    }
  }

  setstate() {
    this.setState({ billede: this.state.ber[this.state.nummer] });
    this.setState({ billede2: this.state.ber[this.state.nummer + 1] });
    this.setState({ billede3: this.state.ber[this.state.nummer + 2] });
  }

  // Skifter slideshowet et tak til højre
  skifthojre() {
    this.state.nummer++; // Plusser variablen [nummer] med 1
    this.setstate();

    if (this.state.nummer === this.state.ber.length) {
      // Tjekker hvis [nummer] er lig med længden af mængden af billeder (tjekker om det er det sidste billede i listen)
      this.setState({ billede: this.state.ber[0] });
      this.setState({ billede2: this.state.ber[1] });
      this.setState({ billede3: this.state.ber[2] });
      this.setState({ nummer: 0 });
    }
    this.billede();
    this.classes();
  }

  // Skifter slideshowet et tak til venstre
  skiftvenstre() {
    this.state.nummer--; // Minuser variablen [nummer] med 1
    this.setstate();

    if (this.state.nummer === -1) {
      this.setState({ billede: this.state.ber.at(-1) });
      this.setState({ nummer: this.state.ber.length - 1 });
    }
    this.billede();
    this.classes();
  }

  dot = (nr) => {
    this.setState({ billede: this.state.ber.at(nr) });
    this.setState({ billede2: this.state.ber.at(nr + 1) });
    this.setState({ billede3: this.state.ber.at(nr + 2) });

    this.state.nummer = nr;

    this.billede();
    this.classes();
  };

  dots = (tal) => {
    this.state.list = [];
    for (var i = 0; i < tal; i++) {
      const o = i;
      this.state.list.push(
        <span id={"dot" + o} class="dots" onClick={() => this.dot(o)}></span>
      );
    }
    return this.state.list;
  };

  slet(img) {}
  tilfoj(img) {
    document.getElementById('billede_upload').submit();
    alert(img.value)
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files, "$$$$");
    console.log(event.target.files[0], "$$$$");
  };

  onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();
   
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
     
      // Request made to the backend api
      // Send formData object
      axios.post("api/uploadfile", formData);
    };
   
    fileData = () => {
    if (this.state.selectedFile) {alert(this.state.selectedFile.name)}}

  render() {
    return (
      <div class="container-midt">
        <div class="container-antal">
          {this.state.nummer + 1} / {this.state.ber.length}
        </div>
        <div class="slideshow-knap">
          <button name="admin" id="tilfoj" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#tilfoj_modal">
            Tilføj Billede
          </button>

          <div
          class="modal fade"
          id="tilfoj_modal"
          tabindex="-1"
          aria-labelledby="tilfoj_label"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="tilfoj_label">
                  Opmærksom!
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>
                  Upload dit billede herunder:
                </p>
                <form method="POST" action="https://www.youtube.com" target="_blank" id="billede_upload">
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control"
                      id="file"
                      name="file"
                      accept=".png, .jpg, .gif, .jpeg"
                      onChange={() => this.onChange}
                      /> 
                      </div> 
                      </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={this.onFileUpload}> 
                  Tilføj
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Annuller
                </button>
              </div>
            </div>
          </div>
        </div>

        </div>
        <div class="container-slideshow">
          <button type="button" class="btn" onClick={this.skiftvenstre}>
            <img alt="" src={left} />
          </button>
          <div>
            <img
              class="billeder"
              name="billede"
              alt={this.state.nummer}
              id="billede"
              src={this.state.billede}
              onClick={this.skiftvenstre}
            />
          </div>
          <div>
            <img
              class="billeder midt-billede"
              name="billede2"
              alt={this.state.nummer+1}
              title={this.state.ber[this.state.nummer+1]}
              id="billede2"
              src={this.state.billede2}
            />
            <div class="admin">
              <button
                name="admin"
                id="slet"
                onClick={() => console.log(this.state.ber[this.state.nummer])}
                data-bs-toggle="modal"
                data-bs-target="#slet_modal"
              >
                <Icons.UilTrashAlt size="110" class="trash" />
              </button>
            </div>
          </div>
          <div>
            <img
              class="billeder"
              name="billede3"
              alt={this.state.nummer + 2}
              id="billede3"
              src={this.state.billede3}
              onClick={this.skifthojre}
            />
          </div>
          <button type="button" class="btn" onClick={this.skifthojre}>
            <img alt="" src={right} />
          </button>
        </div>

        <div
          class="modal fade"
          id="slet_modal"
          tabindex="-1"
          aria-labelledby="slet_label"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="slet_label">
                  Opmærksom!
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>
                  Er du sikker på at du gerne vil slette{" "}
                  {this.state.ber[this.state.nummer]}
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => this.slet(this.state.ber[this.state.nummer])}>
                  Slet
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Annuller
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container-dots">{this.dots(this.state.ber.length)}</div>
      </div>
    );
  }
}

export default Midt;
