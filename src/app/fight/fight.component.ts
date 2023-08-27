import { Component, Input } from '@angular/core';
import {
  FightState,
  Pokemon,
  SelectedPokemons,
  calculateDamage,
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
  @Input() switchToWinner: Function = () => {};
  private selectedPokemonSubscription!: Subscription;
  public currentState: FightState = FightState.SELECTION;
  private fightingStateSubscription!: Subscription;
  selectedPokemons$: SelectedPokemons = emptySelectedPokemons;

  currentHp = {
    firstPokemon: 100,
    secondPokemon: 100,
  };

  isDamageVisible = {
    first: false,
    second: false,
  };

  damageNumbers = {
    first: 0,
    second: 0,
  };

  constructor(private pokemonsService: PokemonService) {}

  ngOnInit() {
    this.selectedPokemonSubscription =
      this.pokemonsService.selectedPokemons$.subscribe((newValue) => {
        this.selectedPokemons$ = newValue;
      });
    this.fightingStateSubscription = this.pokemonsService.fightState$.subscribe(
      (newValue: number) => {
        this.currentState = newValue;
      }
    );
  }

  ngOnDestroy() {
    this.selectedPokemonSubscription.unsubscribe();
    this.fightingStateSubscription.unsubscribe();
  }

  async attackFirst() {
    const damage = calculateDamage(this.selectedPokemons$, true);
    this.damageNumbers = { ...this.damageNumbers, first: Math.floor(damage) };
    this.isFirstPokeAttacking = !this.isFirstPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
    this.isDamageVisible = { ...this.isDamageVisible, second: true };
    this.currentHp = {
      ...this.currentHp,
      secondPokemon:
        this.currentHp.secondPokemon -
        (damage * 100) / this.selectedPokemons$.secondPokemon.base.HP,
    };
    this.isFirstPokeAttacking = !this.isFirstPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
    await this.delay(ATTACK_OPTIONS.attackDelay);
    this.isDamageVisible = { ...this.isDamageVisible, second: false };
    if (this.currentHp.secondPokemon < 0) {
      await this.delay(2000);
      this.pokemonsService.setFightingState(FightState.WINNER);
    }
    this.attackSecond();
  }

  async attackSecond() {
    const damage = calculateDamage(this.selectedPokemons$, false);
    this.damageNumbers = { ...this.damageNumbers, second: Math.floor(damage) };
    this.isSecondPokeAttacking = !this.isSecondPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
    this.isDamageVisible = { ...this.isDamageVisible, first: true };
    this.currentHp = {
      ...this.currentHp,
      firstPokemon:
        this.currentHp.firstPokemon -
        (damage * 100) / this.selectedPokemons$.firstPokemon.base.HP,
    };
    this.isSecondPokeAttacking = !this.isSecondPokeAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
    await this.delay(ATTACK_OPTIONS.attackDelay);

    this.isDamageVisible = { ...this.isDamageVisible, first: false };
    if (this.currentHp.firstPokemon < 0) {
      await this.delay(2000);
      this.pokemonsService.setFightingState(FightState.WINNER);
    }
    this.attackFirst();
  }

  async delay(timeout: number) {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }
}
