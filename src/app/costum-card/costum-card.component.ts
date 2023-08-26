import { Component, OnInit } from '@angular/core';
import {
  FightState,
  Pokemon,
  SelectedPokemons,
  emptyPokemon,
  emptySelectedPokemons,
} from '../common/models/pokemon';
import { PokemonService } from '../common/services/pokemons.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-costum-card',
  templateUrl: './costum-card.component.html',
  styleUrls: ['./costum-card.component.scss'],
})
export class CostumCardComponent {
  pokemons: Pokemon[] = [];
  selectedPokemons$: SelectedPokemons = emptySelectedPokemons;
  public currentState: FightState = FightState.SELECTION;
  private fightingStateSubscription!: Subscription;
  private selectPokemonSubscription!: Subscription;
  firstPokemon = new FormControl<Pokemon>(emptyPokemon)!;
  secondPokemon = new FormControl<Pokemon>(emptyPokemon)!;

  constructor(private pokemonsService: PokemonService) {}

  saveFirstPokemon(event: MatAutocompleteSelectedEvent) {
    this.selectedPokemons$ = {
      ...this.selectedPokemons$,
      firstPokemon: event.option.value,
    };
  }

  saveSecondPokemon(event: MatAutocompleteSelectedEvent) {
    this.selectedPokemons$ = {
      ...this.selectedPokemons$,
      secondPokemon: event.option.value,
    };
  }

  ngOnInit(): void {
    this.pokemonsService.all().subscribe((result) => {
      this.pokemons = result as Pokemon[];
    });
    this.fightingStateSubscription = this.pokemonsService.fightState$.subscribe(
      (newValue: number) => {
        this.currentState = newValue;
      }
    );
    this.selectPokemonSubscription =
      this.pokemonsService.selectedPokemons$.subscribe((newValue) => {
        this.selectedPokemons$ = newValue;
      });
  }

  ngOnDestroy() {
    this.fightingStateSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    this.selectPokemonSubscription.unsubscribe();
  }

  switchToFight() {
    this.pokemonsService.setFightingState(FightState.FIGHTING);
    this.pokemonsService.setSelectedPokemons({
      firstPokemon: this.firstPokemon.value!,
      secondPokemon: this.secondPokemon.value!,
    });
  }
}
