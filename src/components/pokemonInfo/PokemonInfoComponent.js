import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pokemonInfo.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



class PokemonInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { answered: false }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        const types = this.props.myCard.types.map((type, i) => <div class="type-box">{type.type.name}</div>);
        let evolvesFrom = null;
        if (this.props.myCard.evolvesFrom !== null) {
            evolvesFrom = 
                <div class="d-flex flex-column mt-3 p-1 evo-box">
                    <h6>Evoluciona de:</h6>
                    <h4>{this.props.myCard.evolvesFrom}</h4>
                </div>
        } else {
            evolvesFrom = <div></div>
        }
        return (
        <div class="container h-100">
            <ReactCSSTransitionGroup transitionName = "info"
            transitionAppear = {true} transitionAppearTimeout = {500}>
               <div class="row align-items-center h-100">
                    <div class="col-6 mx-auto">
                        <div className="card m-3 pokemon-info shadow-lg">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-column top-part">
                                    <div className="d-flex justify-content-center">
                                        <img className="card-img" src={this.props.myCard.image} alt="Card cap"/>
                                    </div>
                                    <div className="d-flex flex-row align-items-start id-box">
                                        <div class="d-inline p-2">ID / {this.props.myCard.id}</div>
                                    </div>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h2 class="pokemon-name-label">{this.props.myCard.name}</h2>
                                    <div className="d-flex justify-content-start">
                                        {types}
                                    </div>
                                    {evolvesFrom}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        </div>
            
        );
    }
}

PokemonInfoComponent.propTypes = {
    myCard: PropTypes.object
};

export default PokemonInfoComponent;