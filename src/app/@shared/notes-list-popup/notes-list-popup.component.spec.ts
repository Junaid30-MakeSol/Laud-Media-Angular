import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListPopupComponent } from './notes-list-popup.component';

describe('NotesListPopupComponent', () => {
  let component: NotesListPopupComponent;
  let fixture: ComponentFixture<NotesListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesListPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
