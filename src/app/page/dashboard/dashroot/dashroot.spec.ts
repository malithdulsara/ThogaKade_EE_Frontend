import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashroot } from './dashroot';

describe('Dashroot', () => {
  let component: Dashroot;
  let fixture: ComponentFixture<Dashroot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashroot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashroot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
