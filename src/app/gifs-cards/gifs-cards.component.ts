import { Component, OnInit } from "@angular/core";
import { IGifCard } from "./gif-card.interface";
import { GifsCardsService } from "./gifs-cards.service";

@Component({
  selector: "app-gifs-cards",
  templateUrl: "./gifs-cards.component.html",
  styleUrls: ["../app.component.css", "./gifs-cards.component.css"]
})
export class GifsCardsComponent implements OnInit {
  xNumber = 4;
  yNumber = 4;
  numberOfUniqueCards = (this.xNumber * this.yNumber) / 2;
  currentOpenedCards: number[][] = [];

  gifUrls = [];
  cards: IGifCard[][] = [];
  cardCouples: { [id: number]: number } = {};

  constructor(private gifsCardsService: GifsCardsService) {}

  ngOnInit() {
    this.initialize();
  }

  openCard(card: IGifCard, x: number, y: number): void {
    card.isOpen = true;

    if (this.currentOpenedCards.length > 1) {
      this.cards[this.currentOpenedCards[0][0]][
        this.currentOpenedCards[0][1]
      ].isOpen = false;
      this.cards[this.currentOpenedCards[1][0]][
        this.currentOpenedCards[1][1]
      ].isOpen = false;
      this.currentOpenedCards = [];
    } else {
      this.currentOpenedCards.unshift([x, y]);
    }
  }

  reset(): void {
    this.initialize();
  }

  private initialize(): void {
    for (let i = 0; i < this.xNumber; i++) {
      this.cards[i] = [];
    }

    for (let i = 0; i < this.numberOfUniqueCards; i++) {
      this.gifsCardsService.getGifUrl().subscribe((r: any) => {
        this.gifUrls[i] = r.data.embed_url;
      });
    }

    const usedNumbers: { [id: number]: boolean } = {};
    this.cardCouples = {};
    let gifURLNumber = 0;
    for (let number = 0; number < this.numberOfUniqueCards; number++) {
      const nextNumber = this.getNextFreeNumber(usedNumbers);
      usedNumbers[nextNumber] = true;

      const nextNumberCouple = this.getNextFreeNumber(usedNumbers);
      usedNumbers[nextNumberCouple] = true;

      this.cardCouples[nextNumber] = nextNumberCouple;
      this.cardCouples[nextNumberCouple] = nextNumber;

      const xC = this.getXCoordinate(nextNumberCouple);
      const yC = this.getYCoordinate(nextNumberCouple);

      const x: number = this.getXCoordinate(nextNumber);
      const y: number = this.getYCoordinate(nextNumber);

      const card: IGifCard = {
        isOpen: false,
        url: undefined,
        gifUrlNumber: gifURLNumber
      };

      this.cards[x][y] = card;
      this.cards[xC][yC] = { ...card };
      gifURLNumber++;
    }
    console.log(usedNumbers);
    console.log(this.cards);
  }

  getNextFreeNumber(usedNumbers: { [id: number]: boolean }): number {
    const maxNumber: number = this.xNumber * this.yNumber - 1;
    let nextNumber: number = Math.floor(Math.random() * maxNumber);
    while (usedNumbers[nextNumber] && nextNumber < maxNumber) {
      nextNumber++;
    }

    if (nextNumber === maxNumber && usedNumbers[nextNumber]) {
      nextNumber = 0;
      while (usedNumbers[nextNumber] && nextNumber < maxNumber) {
        nextNumber++;
      }
    }

    return nextNumber;
  }

  getXCoordinate(cardNumber: number): number {
    return Math.floor(cardNumber / this.yNumber);
  }

  getYCoordinate(cardNumber: number): number {
    return Math.floor(cardNumber % this.xNumber);
  }
}
