import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GifsCardsComponent } from './gifs-cards/gifs-cards.component';
import { GifsCardsService } from './gifs-cards/gifs-cards.service';
import { SafePipe } from './safe.pipe';
import { PlayersComponent } from './players/players.component';

@NgModule({
  declarations: [
    AppComponent,
    GifsCardsComponent,
    SafePipe,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ GifsCardsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
