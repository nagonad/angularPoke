import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../common/models/pokemon';
import { PokemonService } from '../common/services/pokemons.service';

@Component({
  selector: 'app-costum-card',
  templateUrl: './costum-card.component.html',
  styleUrls: ['./costum-card.component.scss'],
})
export class CostumCardComponent implements OnInit {
  pokemons: Pokemon[] = [];
  count: number = 1;

  constructor(private pokemonsService: PokemonService) {}

  increment() {
    this.count++;
  }

  ngOnInit(): void {
    this.pokemonsService.all().subscribe((result) => {
      this.pokemons = result as Pokemon[];
    });
  }
}
// const emptyPokemon: Pokemon = {
//   _id: '',
//   name: {
//     english: '',
//     japanese: '',
//     chinese: '',
//     french: '',
//   },
//   type: [],
//   base: {
//     Attack: 0,
//     Defense: 0,
//     HP: 0,
//     SpAttack: 0,
//     SpDefense: 0,
//     Speed: 0,
//   },
//   imageUrl: '',
//   backImageUrl: '',
//   matches: 0,
//   wins: 0,
//   __v: 0,
// };
