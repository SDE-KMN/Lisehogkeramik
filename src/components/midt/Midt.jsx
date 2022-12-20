import React from "react";
import "./midt.css";
import left from "../../BillederFolder/arrows_left.png";
import right from "../../BillederFolder/arrows_right.png";
import * as Icons from "@iconscout/react-unicons";
import axios from "axios";

let hide_admin = false;

async function fetch_ip() {
  let ip;

  const res = await fetch("https://api.ipify.org/?format=json");

  ip = await res.json();

  if (ip.ip === "80.208.66.190" || ip.ip === "62.116.202.228") {
  } else {
    let admin = document.getElementsByName("admin");
    for (let x of admin) {
      x.classList.add("hidden");
    }
    document.getElementById("slet").style.display = "none";
  }
}

fetch_ip();

class Midt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nummer: 0,
      ber: [],
      billede: "",
      billede2: "",
      billede3: "",
      list: [],
      hide_admin: hide_admin,
      selectedFile: null,
    };
    this.skifthojre = this.skifthojre.bind(this);
    this.skiftvenstre = this.skiftvenstre.bind(this);
  }

  billeder = async () => {
    const request = await fetch("/billeder");
    const response = await request.json();
    response.billeder.forEach((image) => {
      this.state.ber.push(`./static/${image}`);
    });
    this.setState({ billede: this.state.ber[0] });
    this.setState({ billede2: this.state.ber[1] });
    this.setState({ billede3: this.state.ber[2] });
    this.dot(0);
  };

  componentDidMount() {
    this.billeder();
    if (hide_admin === true) {
      let admin = document.getElementsByName("admin");
      for (let x of admin) {
        x.classList.add("hidden");
      }
      document.getElementById("slet").style.display = "none";
    }}

  billede() {
    if (this.state.ber.length === this.state.nummer + 1) {
      this.setState({ billede2: this.state.ber[0] });
      this.setState({ billede3: this.state.ber[1] });
    }
    if (this.state.ber.length === this.state.nummer + 2) {
      this.setState({ billede3: this.state.ber[0] });
    }
  }

  classes = async () => {
    let i = 0;
    for (let x of this.state.list) {
      if (this.state.nummer === i) {
        document.getElementById("dot"+i).classList.add("active")
      } else if (this.state.nummer === this.state.ber.length) {
        document.getElementById("dot" + 0).classList.add("active");
        document
          .getElementById("dot" + (this.state.ber.length - 1))
          .classList.remove("active");
      } else if (this.state.nummer === -1) {
        document
          .getElementById("dot" + (this.state.ber.length - 1))
          .classList.add("active");
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
    this.state.list.push(
    <span id={"dot0"} name="dot" class="dots active" onClick={() => this.dot(0)}></span>)
    for (var i = 1; i < tal; i++) {
      const o = i;
      this.state.list.push(
        <span id={"dot" + o} name="dot" class="dots" onClick={() => this.dot(o)}></span>
      );
    }
    return this.state.list;
  };

  slet = async img => {
    let formData = new FormData();
    formData.append("file", img.split("./static/")[1]);
    
    await axios.post('/unlinkFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      window.location.reload()
    )
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    await axios.post('/appendFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      window.location.reload()
    )

  };

  fileData = () => {
    if (this.state.selectedFile) {
      alert(this.state.selectedFile.name);
    }
  };

  render() {
    return (
      <div class="container-midt">

        <div id="liveAlertPlaceholder"></div>

        <div class="container-antal">
          {this.state.nummer + 1} / {this.state.ber.length}
        </div>
        <div class="slideshow-knap">
          <button
            name="admin"
            id="tilfoj"
            class="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#tilfoj_modal"
          >
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
                  <p>Upload dit billede herunder:</p>
                  <form
                    method="POST"
                    action="https://www.youtube.com"
                    target="_blank"
                    id="billede_upload"
                  >
                    <div class="form-group">
                      <input
                        type="file"
                        class="form-control"
                        id="file"
                        name="file"
                        accept=".png, .jpg, .gif, .jpeg"
                        onChange={this.onFileChange}
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={this.onFileUpload}
                    id="liveAlertBtn"
                  >
                    Tilføj
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
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
              alt={this.state.nummer + 1}
              title={this.state.billede2}
              id="billede2"
              src={this.state.billede2}
            />
            <div class="admin">
              <button
                name="admin"
                id="slet"
                onClick={() => console.log(this.state.billede2)}
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
                  Er du sikker på at du gerne vil slette dette billede?<br></br>{" "}
                </p>
                <img
                  src={this.state.billede2}
                  class="img-fluid rounded mx-auto d-block"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => this.slet(this.state.billede2)}
                >
                  Slet
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
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
