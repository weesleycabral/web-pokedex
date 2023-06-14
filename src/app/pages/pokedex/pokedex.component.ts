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

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    // this.getAllPokemon();
  }

  getAllPokemon(id: number) {
    this.pokeapiService.getAllPokemon(id).subscribe((res) => {
      this.pokemonList = res.pokemon_species;
      console.log(this.pokemonList);
    });
  }

  selectGeneration(id: number) {
    this.getAllPokemon(id);
  }

  filterPokemonList(filter: any): void {
    const data = String(filter.detail.value);
    const upperFilter = data.toUpperCase();
    this.filteredPokemonList = this.pokemonList.filter((attr) =>
      attr.name.toUpperCase().includes(upperFilter)
    );
  }
}
