import axios from 'axios';

const baseService = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

const api = {
    async GetPokemonList(limit) {
        let {data} = await baseService.get('pokemon/?limit=' + limit);
        const dataDetails = await this.getDetails(data);
        const details = await Promise.all(dataDetails);
        data.results = details;
        return data;
    },
    async GetPokemonListByType(type) {
        let {data} = await baseService.get('type/' + type);
        data.results = data.pokemon.map(item => {
            return item.pokemon
        })
        const dataDetails = await this.getDetails(data);
        const details = await Promise.all(dataDetails);
        data.pokemon = details;
        return data.pokemon;
    },
    async GetPokemon(nameOrId, evolutions = false) {
        const data = await baseService.get('pokemon/' + nameOrId).catch(() => {
            return false;
        });

        if(evolutions) {
            if(data) {
                data.data.species = await this.getSpecies(data.data.species.url);
                data.data.species.evolution_chain = await this.getEvolutions(data.data.species.evolution_chain.url);
            }
        }
        
        return data;
    },
    async GetResource(url) {
        let {data} = await axios.get(url);
        const dataDetails = await this.getDetails(data);
        const details = await Promise.all(dataDetails);
        data.results = details;
        return data;
    },
    async getDetails(data) {
        return data.results.map(async (pokemon) => {
            let {data} = await this.GetPokemon(pokemon.name);
            return data;
        });
    },
    async getSpecies(url) {
        const {data} = await axios.get(url);
        return data;
    },
    async getEvolutions(url) {
        const {data} = await axios.get(url);
        return data;
    }
}

export default api
