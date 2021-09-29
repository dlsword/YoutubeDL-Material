import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageRoleComponent } from './manage-role.component';

describe('ManageRoleComponent', () => {
  let component: ManageRoleComponent;
  let fixture: ComponentFixture<ManageRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
