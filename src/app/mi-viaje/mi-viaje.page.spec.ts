import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiViajePage } from './mi-viaje.page';

describe('MiViajePage', () => {
  let component: MiViajePage;
  let fixture: ComponentFixture<MiViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
