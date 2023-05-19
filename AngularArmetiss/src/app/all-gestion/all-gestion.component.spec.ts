import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGestionComponent } from './all-gestion.component';

describe('AllGestionComponent', () => {
  let component: AllGestionComponent;
  let fixture: ComponentFixture<AllGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
