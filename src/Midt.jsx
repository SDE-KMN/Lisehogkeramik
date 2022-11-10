    import React, { Component } from 'react';
    import './index.css';
    import left from './BillederFolder/arrows_left.png'
    import right from './BillederFolder/arrows_right.png'
    import * as bootstrap from 'bootstrap';
    window.bootstrap = bootstrap;

    function importAll(r) {
        return r.keys().map(r);
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    let images = importAll(require.context('./BillederFolder/slideshow/', false, /\.(png|jpg)$/))

    class Midt extends React.Component {
        constructor(props) {
            super(props)
            let ber = images;                                         // Laver en liste med de forskellige billeders variabler
            this.state = {                                            // Laver et dictonary med variabler som vi bruger i koden
                nummer: 0,
                ber: ber,
                billede: ber[0],
                billede2: ber[1],
                billede3: ber[2],
                list: []
            }
            this.skifthojre = this.skifthojre.bind(this);
            this.skiftvenstre = this.skiftvenstre.bind(this);
        }

        componentDidMount() {
            this.dot(0)
        }

        // Skifter slideshowet en tak til højre
        skifthojre() {
            this.state.nummer++                                                     // Plusser variablen [nummer] med 1
            this.setState({ billede: this.state.ber[this.state.nummer] })           // Opdaterer billedet i slideshowet så det matcher med variablen [nummer]
            this.setState({ billede2: this.state.ber[this.state.nummer+1] })           // Opdaterer billedet i slideshowet så det matcher med variablen [nummer]
            this.setState({ billede3: this.state.ber[this.state.nummer+2] })           // Opdaterer billedet i slideshowet så det matcher med variablen [nummer]

            if (this.state.nummer === this.state.ber.length)                        // Tjekker hvis [nummer] er lig med længden af mængden af billeder (tjekker om det er det sidste billede i listen)
            {
                this.setState({ billede: this.state.ber[0] });                      
                this.setState({ billede2: this.state.ber[1] });                      
                this.setState({ billede3: this.state.ber[2] });                      
                this.setState({ nummer: 0 })                                        
            }
            
            if (this.state.nummer + 1 === this.state.ber.length) {
                this.setState({ billede2: this.state.ber[0]})
                this.setState({ billede3: this.state.ber[1] })
            }
            if (this.state.nummer + 2 === this.state.ber.length) {
                this.setState({ billede3: this.state.ber[0]})
            }

            let i = 0;                                                              // Opretteter en variabel [i] med værdien 0
            for (let x of this.state.list) {   
                                                     // Looper igennem listen med billeder som [x] for hver gang den kører
                console.log(x)

                if (this.state.nummer === i) {
                    document.getElementById('dot' + i).classList.add("active")      // Tilføjer class'en [active] til dot'en 
                }
                else if (this.state.nummer === this.state.ber.length) {             // Fixer et problem med at en dot ikke fik class'en [active]
                    document.getElementById('dot' + 0).classList.add("active")
                    document.getElementById('dot' + (this.state.ber.length - 1)).classList.remove("active")
                }
                else {
                    document.getElementById('dot' + i).classList.remove("active")   // Fjerner class'en [active] 

                }

                i++

            }
        }


        // Skifter slideshowet en tak til venstre
        skiftvenstre() {
            this.state.nummer--                                                     // Minuser variablen [nummer] med 1
            this.setState({ billede: this.state.ber[this.state.nummer] })           // Opdaterer billedet i slideshowet så det matcher med variablen [nummer]
            this.setState({ billede2: this.state.ber[this.state.nummer+1] })        // Opdaterer billedet i slideshowet så det matcher med variablen [nummer]
            this.setState({ billede3: this.state.ber[this.state.nummer+2] })        // Opdaterer billedet i slideshowet så det matcher med variablen [nummer]

            if (this.state.nummer === -1) {
                this.setState({ billede: this.state.ber.at(-1) });
                this.setState({ nummer: this.state.ber.length - 1 })
            }


            if (this.state.nummer === this.state.ber.length)                        // Tjekker hvis [nummer] er lig med længden af mængden af billeder (tjekker om det er det sidste billede i listen)
            {
                this.setState({ billede: this.state.ber[0] });                      
                this.setState({ billede2: this.state.ber[1] });                      
                this.setState({ billede3: this.state.ber[2] });                      
                this.setState({ nummer: 0 })                                        
            }
            if (this.state.ber.length === this.state.nummer + 1) {
                this.setState({ billede2: this.state.ber[0]})
                this.setState({ billede3: this.state.ber[1] })
            }
            if (this.state.ber.length === this.state.nummer + 2) {
                this.setState({ billede3: this.state.ber[0]})
            }




            let i = 0;
            for (let x of this.state.list) {

                console.log(x)

                if (this.state.nummer === i) {
                    document.getElementById('dot' + i).classList.add("active")
                }
                else if (this.state.nummer === -1) {
                    document.getElementById('dot' + (this.state.ber.length - 1)).classList.add("active")
                    document.getElementById('dot' + 0).classList.remove("active")
                }
                else {
                    document.getElementById('dot' + i).classList.remove("active")
                }

                i++

            }

        }

        dot = (nr) => {
            this.setState({ billede: this.state.ber.at(nr) })
            this.setState({ billede2: this.state.ber.at(nr+1) })
            this.setState({ billede3: this.state.ber.at(nr+2) })

            this.state.nummer = nr

            if (this.state.ber.length === this.state.nummer + 1) {
                this.setState({ billede2: this.state.ber[0]})
                this.setState({ billede3: this.state.ber[1] })
            }
            if (this.state.ber.length === this.state.nummer + 2) {
                this.setState({ billede3: this.state.ber[0]})
            }

            let i = 0;
            for (let x of this.state.list) {
                
                console.log(x)

                if (this.state.nummer === i) {
                    document.getElementById('dot' + i).classList.add("active")
                }
                else {
                    document.getElementById('dot' + i).classList.remove("active")
                }
                i++
            }
        }



        dots = (tal) => {
            this.state.list = [];
            for (var i = 0; i < tal; i++) {
                const o = i
                this.state.list.push(<span id={'dot' + o} class="dots" onClick={() => this.dot(o)} ></span>)
            }
            return this.state.list
        }
        render() {
            return (
                <div class="container-midt">
                    <div class="container-antal">
                        {this.state.nummer + 1} / {this.state.ber.length}
                    </div>
                    <div class="container-slideshow">
                        <button type="button" class="btn" onClick={this.skiftvenstre}><img alt="" src={left} /></button>
                        <img class="billeder" name="billede" alt={this.state.nummer} id="billede" src={this.state.billede} onClick={this.skiftvenstre} />
                        <img class="billeder midt-billede" name="billede2" alt={this.state.nummer+1} id="billede2" src={this.state.billede2} />
                        <img class="billeder"  name="billede3"alt={this.state.nummer+2} id="billede3" src={this.state.billede3} onClick={this.skifthojre} />
                        <button type="button" class="btn" onClick={this.skifthojre}><img alt="" src={right} /></button>
                    </div>
                    <div class="container-dots">
                        {this.dots(this.state.ber.length)}
                    </div>
                    <p class="muted">Placeholder text to demonstrate some <a href="#" data-bs-toggle="tooltip" data-bs-title="Default tooltip">inline links</a> with tooltips. This is now just filler, no killer. Content placed here just to mimic the presence of <a href="#" data-bs-toggle="tooltip" data-bs-title="Another tooltip">real text</a>. And all that just to give you an idea of how tooltips would look when used in real-world situations. So hopefully you've now seen how <a href="#" data-bs-toggle="tooltip" data-bs-title="Another one here too">these tooltips on links</a> can work in practice, once you use them on <a href="#" data-bs-toggle="tooltip" data-bs-title="The last tip!">your own</a> site or project.
</p>
                </div>
            )
        }
    }

    export default Midt;