import { useState , useEffect } from 'react'
import './App.css'
import Editor from './components/Editor'
import axios from 'axios';

interface Pokemons {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string
  }
}

const App: React.FC = () => {
  const [pokemons, setPokemons]=useState<Pokemon[]>([])

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      // console.log(res.data)
      // retrieving individual values of each pokemon
      res.data.results.forEach(async(pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p) => [...p, poke.data]);
      })
    };
    getPokemon();
  }, [])

  return (
    <div>
      <h1>Welcome to Pokedexical</h1>
      <div className="editor-wrapper">
        <Editor pokemons={pokemons}/>
      </div>
    </div>
  )
}

export default App
