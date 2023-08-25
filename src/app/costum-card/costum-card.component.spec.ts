import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumCardComponent } from './costum-card.component';

describe('CostumCardComponent', () => {
  let component: CostumCardComponent;
  let fixture: ComponentFixture<CostumCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostumCardComponent]
    });
    fixture = TestBed.createComponent(CostumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
