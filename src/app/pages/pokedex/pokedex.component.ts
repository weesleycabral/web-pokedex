import { Component, OnInit } from '@angular/core';
import { ModelPokedex } from 'src/app/models/pokedex.model';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  public pokemonList: ModelPokedex[] = [];
  public filteredPokemonList: ModelPokedex[] = [];
  _filtroPokemon: string;
  public geracao: any
  public geracoes: string[] = ['Geração 1', 'Geração 2', 'Geração 3', 'Geração 4', 'Geração 5', 'Geração 6', 'Geração 7', 'Geração 8', 'Geração 9']

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.filteredPokemonList = this.pokemonList;
    console.log(this.filteredPokemonList.length);

    // this.getAllPokemon();
  }

  public getAllPokemon(gen: number): void {
    const generation = Number(gen)
    // this.currentGeneration = generation;
    // localStorage.setItem('currentGen', String(this.currentGeneration));
    this.pokemonList = [];

    // this.showDetails = false;
    // this.generic.showLoading(true);
    this.pokeapiService.getAllPokemon(generation).subscribe(
      (value) => {
        console.log(value)
        Object.values(value.pokemon_species).forEach((element: any) => {
          const id = element.url.split('pokemon-species')[1].replaceAll('/', '').trim()

          this.pokemonList.push({
            id,
            name: element.name,
          });
        });
        console.log(this.pokemonList)
        this.pokemonList.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1);
        // if (this.currentGeneration == 8) {
        //   const last = this.pokemonList.findIndex(x => x.id == 899)
        //   this.pokemonList.splice(last)
        // }
        // this.generic.showLoading(false);
      },
      (err) => {
        console.log('oi');
        // this.generic.showLoading(false);
        // this.generic.presentToast('Erro na conexão com o servidor.');
      }
    );
  }

  // getAllPokemon(id: number) {
  //   this.pokeapiService.getAllPokemon(id).subscribe((res) => {
  //     this.pokemonList = res.pokemon_species;
  //     // this.filteredPokemonList = this.pokemonList;
  //   });
  // }

  selectGeneration(id: number) {
    console.log(id);
    if (id == 0) {
      id + 1;
      console.log(id);

    }
    console.log(id);

    this.getAllPokemon(id);
  }

  // filterPokemonList(filter: any): void {
  //   console.log(filter);

  //   const data = String(filter.target.value);
  //   const upperFilter = data.toUpperCase();
  //   this.filteredPokemonList = this.pokemonList.filter((attr) =>
  //     attr.name.toUpperCase().includes(upperFilter)
  //   );
  // }

  get filtroPokemon(): string {
    return this._filtroPokemon;
  }

  set filtroPokemon(value: string) {
    this._filtroPokemon = value;
    this.filteredPokemonList = this._filtroPokemon ? this.filtrarPokemon(this._filtroPokemon) : this.pokemonList;
  }

  filtrarPokemon(filtrarPor: string): ModelPokedex[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.pokemonList.filter(res =>
      res.name.toLowerCase().indexOf(filtrarPor) !== -1);
  }
}
