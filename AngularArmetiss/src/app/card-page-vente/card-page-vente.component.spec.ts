import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPageVenteComponent } from './card-page-vente.component';

describe('CardPageComponent', () => {
  let component: CardPageVenteComponent;
  let fixture: ComponentFixture<CardPageVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPageVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPageVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
