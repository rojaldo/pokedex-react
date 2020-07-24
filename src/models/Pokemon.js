export class Pokemon{
    constructor(pokemonJson, speciesJson){
        this.name = pokemonJson.name.charAt(0).toUpperCase() + pokemonJson.name.slice(1);
        this.id = pokemonJson.id;
        this.types = pokemonJson.types;
        if(speciesJson.evolves_from_species !== null){
            this.evolvesFrom = speciesJson.evolves_from_species.name;
        }else {
            this.evolvesFrom = null;
        }
        this.image = pokemonJson.sprites.front_default;
    }
} 

export default Pokemon;