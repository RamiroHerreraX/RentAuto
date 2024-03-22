import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSucursalesComponent } from './admin-sucursales.component';

describe('AdminSucursalesComponent', () => {
  let component: AdminSucursalesComponent;
  let fixture: ComponentFixture<AdminSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSucursalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
