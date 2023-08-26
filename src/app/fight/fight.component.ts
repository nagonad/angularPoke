import { Component, Input } from '@angular/core';
import {
  Pokemon,
  SelectedPokemons,
  emptyPokemon,
  emptySelectedPokemons,
} from '../common/models/pokemon';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { PokemonService } from '../common/services/pokemons.service';
import { Subscription } from 'rxjs';

const ATTACK_OPTIONS = {
  attackSpeed: '0.3s',
  attackDelay: 300,
  attackRange: '80px',

  animation: () => {
    return animate(ATTACK_OPTIONS.attackSpeed);
  },
};

const POSITION_OPTIONS = {
  firstAttack: {
    left: ATTACK_OPTIONS.attackRange,
    bottom: ATTACK_OPTIONS.attackRange,
  },
  firstDefaultPosition: {
    left: '0px',
    bottom: '0px',
  },
  secondAttack: {
    top: ATTACK_OPTIONS.attackRange,
    right: ATTACK_OPTIONS.attackRange,
  },
  secondDefaultPosition: {
    top: '0px',
    right: '0px',
  },
};

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss'],
  animations: [
    trigger('attackFirst', [
      state('attacking', style(POSITION_OPTIONS.firstAttack)),
      state('notAttacking', style(POSITION_OPTIONS.firstDefaultPosition)),
      transition('notAttacking => attacking', [ATTACK_OPTIONS.animation()]),
      transition('attacking => notAttacking', [ATTACK_OPTIONS.animation()]),
    ]),
    trigger('attackSecond', [
      state('notAttacking', style(POSITION_OPTIONS.secondDefaultPosition)),
      state('attacking', style(POSITION_OPTIONS.secondAttack)),
      transition('notAttacking => attacking', [ATTACK_OPTIONS.animation()]),
      transition('attacking => notAttacking', [ATTACK_OPTIONS.animation()]),
    ]),
  ],
})
export class FightComponent {
  isFirstPokeAttacking: boolean = false;
  isSecondPokeAttacking: boolean = false;
  @Input() pokemons: Pokemon[] = [];
  private selectedPokemonSubscription!: Subscription;
  selectedPokemons$: SelectedPokemons = emptySelectedPokemons;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.selectedPokemonSubscription =
      this.pokemonService.selectedPokemons$.subscribe((newValue) => {
        this.selectedPokemons$ = newValue;
      });
  }

  ngOnDestroy() {
    this.selectedPokemonSubscription.unsubscribe();
  }

  async attackFirst() {
    this.isFirstPokeAttacking = !this.isFirstPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
    this.isFirstPokeAttacking = !this.isFirstPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
  }

  async attackSecond() {
    this.isSecondPokeAttacking = !this.isSecondPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
    this.isSecondPokeAttacking = !this.isSecondPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
  }

  async delay(timeout: number) {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }
}
