import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ModelPokedex } from 'src/app/models/pokedex.model';
import { PokeapiService } from 'src/app/services/pokeapi.service';

import { SwiperOptions } from 'swiper';
import Swiper, { Navigation } from 'swiper';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  public pokemonList: ModelPokedex[] = [];
  public filteredPokemonList: ModelPokedex[] = [];

  public allPokemonList: ModelPokedex[] = [];

  public pokeById: any[] = [];
  public typesPokemon: any[] = [];
  public imagesSpecies: any[] = [];

  _filtroPokemon: string = '';
  public geracao: any;
  public geracoes: string[] = [
    'Geração 1',
    'Geração 2',
    'Geração 3',
    'Geração 4',
    'Geração 5',
    'Geração 6',
    'Geração 7',
    'Geração 8',
    'Geração 9',
  ];

  public currentSelectedGeneration = 0;

  public loading = false;

  options: AnimationOptions = {
    path: '/assets/animations/notfound.json',
    loop: true,
    autoplay: true,
  };

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.filteredPokemonList = this.pokemonList;
    this.getAllPokemon();
  }

  public getAllPokemon(): void {
    let id = 1;

    this.pokeapiService.getAllGenPokemon().subscribe((res) => {
      res.results.forEach((resultIndex: any) => {
        this.allPokemonList.push({
          id,
          name: resultIndex.name,
        });
        id++;
      });

      console.log(res);
    });
  }

  public getPokemonByGeneration(gen: number): void {
    const generation = Number(gen);
    this.currentSelectedGeneration = gen;
    this.loading = true;
    // this.currentGeneration = generation;
    // localStorage.setItem('currentGen', String(this.currentGeneration));
    this.pokemonList = [];
    this.filteredPokemonList = [];

    // this.showDetails = false;
    // this.generic.showLoading(true);
    this.pokeapiService.getAllPokemon(generation).subscribe(
      (value) => {
        console.log(value);
        Object.values(value.pokemon_species).forEach((element: any) => {
          const id = element.url
            .split('pokemon-species')[1]
            .replaceAll('/', '')
            .trim();

          this.pokemonList.push({
            id,
            name: element.name,
          });
        });

        this.pokemonList.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1));
        this.loading = false;
        // if (this.currentGeneration == 8) {
        //   const last = this.pokemonList.findIndex(x => x.id == 899)
        //   this.pokemonList.splice(last)
        // }
        // this.generic.showLoading(false);
      },
      (err) => {
        console.log('oi');
        this.loading = false;
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
    this.cleanSearchValue();
    if (id == 0) {
      id + 1;
      console.log(id);
    }
    console.log(id);

    this.getPokemonByGeneration(id);
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
    this.filteredPokemonList = this._filtroPokemon
      ? this.filtrarPokemon(this._filtroPokemon)
      : this.pokemonList;
  }

  filtrarPokemon(filtrarPor: string): ModelPokedex[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.allPokemonList.filter(
      (res) => res.name.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  cleanSearchValue() {
    this.filtroPokemon = '';
  }

  detailPokemon(pokeid: number) {
    this.loading = true;
    this.pokeById = [];
    this.imagesSpecies = [];

    Swiper.use([Navigation]);

    this.pokeapiService.getPokemonDetails(pokeid).subscribe((value: any) => {
      this.pokeById.push(value);
      this.typesPokemon = value.types;

      this.imagesSpecies.push(value.sprites.front_default);
      this.imagesSpecies.push(value.sprites.back_default);

      this.imagesSpecies.push(value.sprites.front_shiny);
      this.imagesSpecies.push(value.sprites.back_shiny);

      this.loading = false;
    });
  }
}
