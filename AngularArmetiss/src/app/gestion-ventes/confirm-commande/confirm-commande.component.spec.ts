import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCommandeComponent } from './confirm-commande.component';

describe('ConfirmCommandeComponent', () => {
  let component: ConfirmCommandeComponent;
  let fixture: ComponentFixture<ConfirmCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
