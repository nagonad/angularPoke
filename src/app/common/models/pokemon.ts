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
  WINNER,
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

export const defaultPokemons: SelectedPokemons = {
  firstPokemon: {
    _id: '647e0a2ffcc413834e0a5dea',
    name: {
      english: 'Ninetales',
      japanese: 'キュウコン',
      chinese: '九尾',
      french: 'Feunard',
    },
    type: ['Fire'],
    base: {
      Attack: 76,
      Defense: 75,
      HP: 73,
      Speed: 100,
      SpAttack: 81,
      SpDefense: 100,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png',
    backImageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/38.png',
    matches: 0,
    wins: 0,
    __v: 0,
  },
  secondPokemon: {
    _id: '647e0a2ffcc413834e0a5dc7',
    name: {
      english: 'Venusaur',
      japanese: 'フシギバナ',
      chinese: '妙蛙花',
      french: 'Florizarre',
    },
    type: ['Grass', 'Poison'],
    base: {
      Attack: 82,
      Defense: 83,
      HP: 80,
      Speed: 80,
      SpAttack: 100,
      SpDefense: 100,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    backImageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png',
    matches: 0,
    wins: 0,
    __v: 0,
  },
};

export function calculateDamage(
  selectedPokemons: SelectedPokemons,
  attacker: boolean
): number {
  let attackerPokemon: Pokemon = selectedPokemons.firstPokemon;
  let defenderPokemon: Pokemon = selectedPokemons.secondPokemon;
  if (!attacker) {
    attackerPokemon = selectedPokemons.secondPokemon;
    defenderPokemon = selectedPokemons.firstPokemon;
  }
  return (attackerPokemon.base.Attack / defenderPokemon.base.Defense) * 10;
}
