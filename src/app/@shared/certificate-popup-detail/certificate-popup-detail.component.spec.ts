import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatePopupDetailComponent } from './certificate-popup-detail.component';

describe('CertificatePopupDetailComponent', () => {
  let component: CertificatePopupDetailComponent;
  let fixture: ComponentFixture<CertificatePopupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CertificatePopupDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatePopupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
