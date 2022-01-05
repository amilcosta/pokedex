import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { setupCache } from 'axios-cache-adapter';
import { map } from 'rxjs/operators';
import { LazyModuleLoader } from '@nestjs/core';

const url = 'https://pokeapi.co/api/v2/';
//const url = process.env.URL;

@Injectable()
export class PokemonService {
    private cache;
    constructor(private httpService: HttpService) {  
        this.cache = setupCache({
            maxAge: 60 * 1000, // 60 minutes
        });
    }

    
    async findPokemonName(name){
        const config = {        
            adapter: this.cache.adapter,
        };
        let urlComplete=url+'pokemon/'+name;
        let urlEvolutions = url+''
        console.log('URL: ',urlComplete)

        const response = await this.httpService.get(urlComplete,config).pipe(map(response => response.data)).toPromise()
        .catch(err => {
            console.log(err)
        });

        const responseEvolutions = await this.httpService.get(response.species.url).pipe(map(response => response.data)).toPromise()
        .catch(err => {
            console.log(err)
        });
        

        let result = { 
            foto: response.sprites.front_default,
            peso: response.weight,
            tipo: response.types,
            habilidades: response.abilities,
            evoluciones: responseEvolutions.evolves_from_species,
            descripcion: {
                color: responseEvolutions.color.name,
                formDecription: responseEvolutions.form_descriptions,
                stats: response.stats
            }
        }

        return result;
    }
    
    
    async findAbility(nameid){
        const config = {        
            adapter: this.cache.adapter,
        };
        let urlComplete=url+'ability/'+nameid;

        const response = await this.httpService.get(urlComplete,config).pipe(map(response => response.data)).toPromise()
        .catch(err => {
            console.log(err)
        });

        return response;
    }

    async findPokemonSpecies(id_species){
        console.log('GEt SPECIES')
        const config = {        
            adapter: this.cache.adapter,
        };
        let urlComplete=url+'pokemon-species/'+id_species;
        
        const response = await this.httpService.get(urlComplete,config).pipe(map(response => response.data)).toPromise()
        .catch(err => {
            console.log(err)
        });

        return response;
    }

}
