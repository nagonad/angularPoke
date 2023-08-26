export interface Pokemon {
  _id: string;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: string[];
  base: {
    Attack: number;
    Defense: number;
    HP: number;
    Speed: number;
    SpAttack: number;
    SpDefense: number;
  };
  imageUrl: string;
  backImageUrl: string;
  matches: 0;
  wins: 0;
  __v: number;
}

export interface SelectedPokemons {
  firstPokemon: Pokemon;
  secondPokemon: Pokemon;
}

export enum FightState {
  SELECTION,
  FIGHTING,
}

export const emptyPokemon: Pokemon = {
  _id: '',
  name: {
    english: '',
    chinese: '',
    french: '',
    japanese: '',
  },
  type: [],
  base: {
    Attack: 0,
    Defense: 0,
    HP: 0,
    SpAttack: 0,
    SpDefense: 0,
    Speed: 0,
  },
  imageUrl: '',
  backImageUrl: '',
  matches: 0,
  wins: 0,
  __v: 0,
};
export const emptySelectedPokemons: SelectedPokemons = {
  firstPokemon: emptyPokemon,
  secondPokemon: emptyPokemon,
};
