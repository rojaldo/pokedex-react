import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pokedexCard.scss';



class PokedexCardComponent extends Component {
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
        const types = this.props.myCard.types.map((type, i) => <button type="button" className="btn btn-outline-secondary btn-small disabled mr-2">{type.type.name}</button>);
        let evolvesFrom = null;
        if (this.props.myCard.evolvesFrom !== null) {
            evolvesFrom = 
                <div className="d-flex flex-column mt-3 p-1 evo-box" >
                    <h6>Evoluciona de:</h6>
                    <h4>{this.props.myCard.evolvesFrom}</h4>
                </div>
        } else {
            evolvesFrom = <div></div>
        }
        return (
                <div className="card mb-3 pokemon-card shadow">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-column top-part">
                        <div className="d-flex justify-content-center">
                            <img className="card-img" src={this.props.myCard.image} alt="Card cap"/>
                        </div>
                            <div className="d-flex flex-nowrap align-items-start ">
                                <div className="d-inline p-2 id-label">ID / {this.props.myCard.id}</div>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h2 className="pokemon-name-label">{this.props.myCard.name}</h2>
                            <div className="d-flex justify-content-start">
                                {types}
                            </div>
                            {evolvesFrom}
                        </div>
                    </div>
                </div>

        );
    }
}

PokedexCardComponent.propTypes = {
    myCard: PropTypes.object
};

export default PokedexCardComponent;