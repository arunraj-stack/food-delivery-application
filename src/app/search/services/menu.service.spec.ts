import { Menu } from 'src/app/models/Menu';
import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of menus', () => {
    service.getMenuDetails().subscribe((menus: Menu[]) => {
      expect(menus).toBeTruthy();
      expect(menus.length).toBe(5);
    });
  });
});
