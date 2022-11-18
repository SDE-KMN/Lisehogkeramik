import React, { Component } from "react";
import "./index.css";
import styles from "./index.css";
import * as Icons from "@iconscout/react-unicons";

class Bund extends React.Component {
  onTouchMove = (event) => {
    alert("STOP MED AT RØRER MIG");
  };
  render() {
    return (
      <div class="container-bund">
        <h1>Kontaktoplysninger:</h1>
        <div>
          <section>
            <button
              type="button"
              onClick={() => alert(document.getElementById("tel").innerHTML)}
              style={{
                backgroundImage: "linear-gradient(#b8fab0 8%, #40c55c)",
                border: "0",
                borderRadius: "15px",
              }}>
              <Icons.UilPhone size="80" color="white"/>
            </button>
            <h3>Telefon</h3>
            <h2 id="tel">88 88 88 88</h2>
          </section>
          <section>
            <button
              type="button"
              onClick={() => alert(document.getElementById("fb").innerHTML)}
              style={{
                color: "white",
                backgroundColor: "#6290BC",
                border: "0",
                borderRadius: "15px",
              }}
            >
              <Icons.UilFacebookF size="80"/>
            </button>
            <h3>Facebook</h3>
            <h2 id="fb">Nima Badiei</h2>
          </section>
          <section>
            <button
              type="button"
              onClick={() => alert(document.getElementById("email").innerHTML)}
              style={{
                backgroundColor: "cyan",
                border: "0",
                borderRadius: "15px",
              }}
            >
              <Icons.UilEnvelope size="80" color="white"/>
            </button>
            <h3>E-Mail</h3>
            <h2 id="email">Mail@gmail.com</h2>
          </section>
        </div>
      </div>
    );
  }
}

export default Bund;
