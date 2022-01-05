import { 
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('')
export class PokemonController {
    constructor(private readonly service: PokemonService) {}

    @Get('/pokemon/:nameid')
    async root(@Param('nameid') nameid){
        return await this.service.findPokemonName(nameid);
    }

    @Get('/pokemon/ability/:abilityidname')
    async abilities(@Param('abilityidname') abilityidname){
        return await this.service.findAbility(abilityidname);
    }

    @Get('/pokemon/species/:idpokemonname')
    async species(@Param('idpokemonname') idpokemonname){
        return await this.service.findPokemonSpecies(idpokemonname);
    }
}
