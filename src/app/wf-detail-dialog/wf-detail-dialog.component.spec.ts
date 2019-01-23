import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfDetailDialogComponent } from './wf-detail-dialog.component';

describe('WfDetailDialogComponent', () => {
  let component: WfDetailDialogComponent;
  let fixture: ComponentFixture<WfDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
