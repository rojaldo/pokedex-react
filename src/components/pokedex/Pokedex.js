import React, { Component } from 'react';
import Pokemon from '../../models/Pokemon';
import PokedexCardComponent from '../pokedexCard/PokedexCardComponent';
import './pokedex.css';


class Pokedex extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '', cards: [], showCards: [] }

    }

    componentWillMount() {
        this.doRequest()
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentWillUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {

    }info

    componentWillUnmount() {

    }

    // This method sorts an array based on a given key 
    sortByKey(array, key){
        return array.sort(function(a, b){
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    // This method gets information from API of 100 first pokemons
    // Each pokemon needs 2 aditional calls to get general information and evolutions
    // TODO: implement infinite scroll to get next 100 pokemons
    // TODO: isolate state variable to just been called once after all the informations is retrieved
    doRequest() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                for (const jsonCard of data.results) {
                    let pokemonData = {};
                    console.log('jsonCardURL: ' + jsonCard.url);
                    // Next API call to get pokemon information
                    fetch(jsonCard.url)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            pokemonData = data;
                            // Another API call to get species information
                            fetch(pokemonData.species.url)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((data) => {
                                    let speciesData = data;
                                    let tempCards = this.state.cards;
                                    tempCards = [...tempCards, new Pokemon(pokemonData, speciesData)]
                                    tempCards = this.sortByKey(tempCards,'id')
                                    this.setState({ cards: tempCards, showCards: tempCards })
                                });

                        });
                }
            });
    }


    handleInputChange(e) {
        console.log(e.target.value);
        this.setState({searchText: e.target.value})
        console.log(JSON.stringify(this.state.cards));
        const filteredCards = this.state.cards.filter(pokemon => pokemon.name.startsWith(e.target.value));
        console.log(JSON.stringify(filteredCards))
        this.setState({ showCards: filteredCards })
    }

    render() {
        const cards =
            this.state.showCards.map((card, i) => <PokedexCardComponent key={i} myCard={card} ></PokedexCardComponent>
            );

        return (

            <div className="container">
                <div className="d-flex flex-column">
                    <div className="row d-flex justify-content-between">
                        {cards}
                    </div>
                </div>
            </div>

        );
    }
}


export default Pokedex;