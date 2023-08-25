import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FightState } from '../models/pokemon';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  model = 'pokemons';
  private _fightState: BehaviorSubject<FightState> =
    new BehaviorSubject<number>(0);
  public fightState$: Observable<number> = this._fightState.asObservable();

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(this.getUrl());
  }

  getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  setFightingState(newState: FightState) {
    this._fightState.next(newState);
  }
}
