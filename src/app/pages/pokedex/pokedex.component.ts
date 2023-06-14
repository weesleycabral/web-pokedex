import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  pokemon: any
  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
      this.getAllPokemon();
  }

  getAllPokemon() {
    this.pokeapiService.getAllPokemon(3).subscribe((res) => {
      console.log(res);
      this.pokemon = res.pokemon_species;
      console.log(this.pokemon);
    });
  }
}
