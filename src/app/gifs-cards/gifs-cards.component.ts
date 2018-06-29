import { Component, OnInit } from '@angular/core';
import { IGifCard } from './gif-card.interface';
import { GifsCardsService } from './gifs-cards.service';

@Component({
  selector: 'app-gifs-cards',
  templateUrl: './gifs-cards.component.html',
  styleUrls: ['../app.component.css', './gifs-cards.component.css']
})
export class GifsCardsComponent implements OnInit {
  xNumber = 5;
  yNumber = 4;
  numberOfUniqueCards = (this.xNumber + this.yNumber) / 2;

  gifUrls = [];
  cards: IGifCard[][] = [];
  cardCouples: { [id: number]: number } = {};

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
    for (let i = 0; i < this.numberOfUniqueCards; i++) {
      this.gifUrls[i] = 'https://giphy.com/embed/2A45hAogYCigoqRhZF';
      // this.gifsCardsService.getGifUrl().subscribe((r: any) => {
      //   this.gifUrls[i] = r.data.embed_url;
      // });
    }

    const usedNumbers: { [id: number]: boolean } = {};
    let gifURLNumber = 0;
    for (let x = 0; x < this.xNumber; x++) {
      for (let y = 0; y < this.yNumber; y++) {
        const card: IGifCard = {
          isOpen: false,
          url: undefined,
          gifUrlNumber: gifURLNumber
        };
        const nextNumber = this.getNextFreeNumber(
          usedNumbers,
          x * this.xNumber + y
        );
        const nextNumberCouple = this.getNextFreeNumber(
          usedNumbers,
          Math.floor(Math.random() * 20)
        );

        usedNumbers[nextNumber] = true;
        usedNumbers[nextNumberCouple] = true;

        this.cardCouples[nextNumber] = nextNumberCouple;
        this.cardCouples[nextNumberCouple] = nextNumber;

        this.cards[this.getXCoordinate(nextNumber)][
          this.getXCoordinate(nextNumber)
        ] = card;
        this.cards[this.getXCoordinate(nextNumberCouple)][
          this.getXCoordinate(nextNumberCouple)
        ] = card;

        gifURLNumber++;
      }
    }
  }

  getNextFreeNumber(
    usedNumbers: { [id: number]: boolean },
    nextNumber: number
  ): number {
    while (!usedNumbers[nextNumber]) {
      nextNumber++;
    }

    return nextNumber;
  }

  getXCoordinate(cardNumber: number): number {
    return cardNumber / this.xNumber;
  }

  getYCoordinate(cardNumber: number): number {
    return cardNumber % this.yNumber;
  }
}
