import { Component, OnInit } from '@angular/core';
import { FightState, Pokemon } from '../common/models/pokemon';
import { PokemonService } from '../common/services/pokemons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-costum-card',
  templateUrl: './costum-card.component.html',
  styleUrls: ['./costum-card.component.scss'],
})
export class CostumCardComponent implements OnInit {
  pokemons: Pokemon[] = [];
  public currentState: FightState = FightState.SELECTION;
  private fightingStateSubscription!: Subscription;

  constructor(private pokemonsService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonsService.all().subscribe((result) => {
      this.pokemons = result as Pokemon[];
    });
    this.fightingStateSubscription = this.pokemonsService.fightState$.subscribe(
      (newValue: number) => {
        this.currentState = newValue;
      }
    );
  }

  ngOnDestroy() {
    this.fightingStateSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  switchToFight() {
    this.pokemonsService.setFightingState(FightState.FIGHTING);
  }
}
