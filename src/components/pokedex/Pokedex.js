import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useParams
  } from "react-router-dom";
import Pokemon from '../../models/Pokemon';
import PokedexCardComponent from '../pokedexCard/PokedexCardComponent';
import PokemonInfoComponent from '../pokemonInfo/PokemonInfoComponent';
import './pokedex.scss';
import InfiniteScroll from 'react-infinite-scroll-component';


class Pokedex extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '', cards: [], showCards: [], itemsLength: 964, nextPokemons: '' }
        this.ShowPokemon = this.ShowPokemon.bind(this);


    }

    componentWillMount() {
    }

    componentDidMount() {
        this.doRequest()
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

    }

    componentWillUnmount() {

    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        console.log('Fetching: ' + this.state.nextPokemons);
        if (this.state.nextPokemons !== null) {
            this.doRequest(this.state.nextPokemons)
        }
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
    // TODO: isolate state variable to just been called once after all the information is retrieved
    doRequest(url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100') {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({nextPokemons: data.next});
                for (const jsonCard of data.results) {
                    let pokemonData = {};
                    // Next API call to get pokemon information
                    fetch(jsonCard.url)
                        .then((response) => {
                            if (response.ok) {
                                return response.json();
                              } else {
                                throw new Error('Something went wrong ...');
                              }
                        })
                        .then((data) => {
                            pokemonData = data;
                            this.nextPokemons = pokemonData.next;
                            // Another API call to get species information
                            fetch(pokemonData.species.url)
                                .then((response) => {
                                    if (response.ok) {
                                        return response.json();
                                      } else {
                                        throw new Error('Something went wrong ...');
                                      }
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

    // This method filters the array that shows PokemonCardComponents, it is called each time that the text input value changes
    handleInputChange(e) {
        this.setState({searchText: e.target.value});
        const filteredCards = this.state.cards.filter(pokemon => pokemon.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
        this.setState({ showCards: filteredCards });
    }

    // This method shows PokemonInfoComponent each time that a pokemon card component is clicked. 
    // The PokemonInfoComponent is wrapped in a Link component linking route '/home' to go back to list when it is clicked 
    ShowPokemon() {
        let { id } = useParams();
        if (id!=='home') {
            return(<Link to="/home"><PokemonInfoComponent myCard={this.state.showCards.find(element => element.name === id)} ></PokemonInfoComponent></Link>)
        } else {
            return (
                <div>
                </div>
              );
        }
    }

    render() {
        const cards =
            this.state.showCards.map((card, i) => <Link to={card.name}><PokedexCardComponent key={i} myCard={card} ></PokedexCardComponent></Link>
            );
        return (
            <div className="container">
                <Router>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/home">
                        <div className="d-flex flex-column">
                            <input className="form-control mt-4 mb-4 shadow" type="text" placeholder="Filtra pokemons por nombre..." aria-label="Search" onChange={(e)=>this.handleInputChange(e)} value={this.state.searchText}></input>
                            
                            <InfiniteScroll
                            dataLength={this.state.itemsLength}
                            next={this.fetchMoreData}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}>
                                <div className="row d-flex justify-content-between">
                                    {cards}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </Route>
                    <Switch>
                        <Route path="/:id" children={<this.ShowPokemon />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}


export default Pokedex;