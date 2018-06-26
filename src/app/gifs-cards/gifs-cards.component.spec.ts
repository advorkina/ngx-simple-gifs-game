import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsCardsComponent } from './gifs-cards.component';

describe('GifsCardsComponent', () => {
  let component: GifsCardsComponent;
  let fixture: ComponentFixture<GifsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GifsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
