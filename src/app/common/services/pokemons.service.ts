import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  model = 'pokemons';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(this.getUrl());
  }

  getUrl() {
    return `${BASE_URL}${this.model}`;
  }
}
