import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilecmpComponent } from './filecmp.component';

describe('FilecmpComponent', () => {
  let component: FilecmpComponent;
  let fixture: ComponentFixture<FilecmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilecmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilecmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
