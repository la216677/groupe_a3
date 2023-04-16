import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoSaleComponent } from './histo-sale.component';

describe('HistoSaleComponent', () => {
  let component: HistoSaleComponent;
  let fixture: ComponentFixture<HistoSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
