import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { HttpModule } from '@nestjs/axios'


@Module({
  imports: [ConfigModule.forRoot(), PokemonModule,HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
