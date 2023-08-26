import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FightState,
  Pokemon,
  SelectedPokemons,
  emptySelectedPokemons,
} from '../models/pokemon';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  model = 'pokemons';
  private _fightState: BehaviorSubject<FightState> =
    new BehaviorSubject<FightState>(FightState.SELECTION);
  public fightState$: Observable<number> = this._fightState.asObservable();

  private _selectedPokemons: BehaviorSubject<SelectedPokemons> =
    new BehaviorSubject<SelectedPokemons>(emptySelectedPokemons);
  public selectedPokemons$: Observable<SelectedPokemons> =
    this._selectedPokemons.asObservable();

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

  setSelectedPokemons(newState: SelectedPokemons) {
    this._selectedPokemons.next(newState);
  }
}
