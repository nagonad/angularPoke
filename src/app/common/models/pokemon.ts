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

export enum FightState {
  SELECTION,
  FIGHTING,
}
