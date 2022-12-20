import React, { Component } from "react";
import "./bund.css";
import * as Icons from "@iconscout/react-unicons";

class Bund extends React.Component {
  componentDidMount() {
}
  render() {
    return (
      <div class="container-bund">
        <h1>Kontaktoplysninger:</h1>
        <div>
          <section>
            <button
              type="button"
              onClick={() => window.open('tel:'+document.getElementById("tel").innerHTML, "_parent")}
              style={{
                backgroundColor: "#40c55c",
                border: "0",
                borderRadius: "15px",
              }}>
              <Icons.UilPhone size="80" color="white"/>
            </button>
            <h3>Telefon</h3>
            <h2 id="tel">61 41 76 96</h2> 
          </section>
          <section>
            <button
              type="button"
              onClick={() => window.open("https://facebook.com/"+"lise.b.hoeg")}
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
            <h2 style={{ fontSize: "38px" }} id="fb">Lise Høg</h2>
          </section>
          <section>
            <button
              type="button"
              onClick={() => window.open('mailto:'+document.getElementById("email").innerHTML)}
              style={{
                backgroundColor: "#0587B3",
                border: "0",
                borderRadius: "15px",
              }}
            >
              <Icons.UilEnvelope size="80" color="white"/>
            </button>
            <h3>E-Mail</h3>
            <h2 id="email">lise.b.hoeg@gmail.com</h2>
          </section>
        </div>
      </div>
    );
  }
}

export default Bund;
