import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfroomComponent } from './confroom.component';

describe('ConfroomComponent', () => {
  let component: ConfroomComponent;
  let fixture: ComponentFixture<ConfroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
