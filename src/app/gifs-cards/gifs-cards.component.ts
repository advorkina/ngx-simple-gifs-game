import { Component, OnInit } from "@angular/core";
import { IGifCard } from "./gif-card.interface";
import { GifsCardsService } from "./gifs-cards.service";

@Component({
  selector: "app-gifs-cards",
  templateUrl: "./gifs-cards.component.html",
  styleUrls: ["../app.component.css", "./gifs-cards.component.css"]
})
export class GifsCardsComponent implements OnInit {
  xNumber: number = 5;
  yNumber: number = 4;
  numberOfUniqueCards = (this.xNumber + this.yNumber) / 2;

  cards: IGifCard[][] = [];
  constructor(private gifsCardsService: GifsCardsService) {}

  ngOnInit() {
    this.initialize();
  }

  openCard(card: IGifCard): void {
    card.isOpen = true;
  }

  reset(): void {
    this.cards = [];
    this.initialize();
  }

  private initialize(): void {
    let gifUrls = [];
    for (let i = 0; i < this.numberOfUniqueCards; i++) {
      this.gifsCardsService.getGifUrl().subscribe((r: any) => {
        gifUrls[i] = r.data.embed_url;
      });
    }

    for (let x = 0; x < this.xNumber; x++) {
      for (let y = 0; y < this.yNumber; y++) {
        const card: IGifCard = {
          isOpen: false,
          url: undefined
        };

        if (!this.cards[x]) {
          this.cards[x] = [];
        }

        this.cards[x][y] = card;

        this.gifsCardsService.getGifUrl().subscribe((r: any) => {
          this.cards[x][y].url = r.data.embed_url;
        });
      }
    }
  }
}
