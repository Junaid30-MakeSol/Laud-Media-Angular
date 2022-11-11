import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyPdfPopupDetailComponent } from './company-pdf-popup-detail.component';

describe('CompanyPdfPopupDetailComponent', () => {
  let component: CompanyPdfPopupDetailComponent;
  let fixture: ComponentFixture<CompanyPdfPopupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyPdfPopupDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPdfPopupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
