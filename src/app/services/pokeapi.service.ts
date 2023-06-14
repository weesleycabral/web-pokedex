import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllPokemon(gen: number): Observable<any> {
    return this.http.get(`${this.Basepath()}generation/${gen}`, {
      headers: this.Headers(),
    });
  }

  public getPokemonDetails(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}pokemon/${id}`, {
      headers: this.Headers(),
    });
  }

  public getTypesDetails(url: string): Observable<any> {
    return this.http.get(`${url}`, {
      headers: this.Headers(),
    });
  }

  public getAbilityDetails(url: string): Observable<any> {
    return this.http.get(`${url}`, {
      headers: this.Headers(),
    });
  }
}
