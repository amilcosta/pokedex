import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule,ConfigModule.forRoot()],
  providers: [PokemonService],
  controllers: [PokemonController]
})
export class PokemonModule {}
