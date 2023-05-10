import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueStockComponent } from './historique-stock.component';

describe('HistoriqueStockComponent', () => {
  let component: HistoriqueStockComponent;
  let fixture: ComponentFixture<HistoriqueStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
