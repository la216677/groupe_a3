import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addClientModalComponent } from './addClientModal.component';

describe('addClientModalComponent', () => {
  let component: addClientModalComponent;
  let fixture: ComponentFixture<addClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ addClientModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(addClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
