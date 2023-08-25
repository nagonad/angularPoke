import { Component, Input } from '@angular/core';
import { Pokemon } from '../common/models/pokemon';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

const ATTACK_OPTIONS = {
  attackSpeed: '0.3s',
  attackDelay: 300,

  animation: () => {
    return animate(ATTACK_OPTIONS.attackSpeed);
  },
};

const POSITION_OPTIONS = {
  attackRange: '50px',
  firstAttack: {
    left: '50px',
    bottom: '50px',
  },
  firstDefaultPosition: {
    left: '0px',
    bottom: '0px',
  },
  secondAttack: {
    top: '50px',
    right: '50px',
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
  isAttacking: boolean = false;
  @Input() pokemons: Pokemon[] = [];

  async changeDimmed() {
    this.isAttacking = !this.isAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
    this.isAttacking = !this.isAttacking;
    await this.delay(ATTACK_OPTIONS.attackDelay);
  }

  async delay(timeout: number) {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }
}
