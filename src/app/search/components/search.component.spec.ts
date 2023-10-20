import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { SearchService } from '../services/search.service';
import { MenuService } from '../services/menu.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;
  let menuService: MenuService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [SearchService, MenuService],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    menuService = TestBed.inject(MenuService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.searchForm.get('searchType')?.value).toEqual('restaurant');
    expect(component.searchForm.get('restaurantName')?.value).toEqual('');
    expect(component.searchForm.get('menuSelection')?.value).toEqual('');
  });

  it('should update form control validators based on search type', () => {
    component.ngOnInit();
    component.searchForm.get('searchType')?.setValue('menu');
    expect(component.searchForm.get('menuSelection')?.hasError('menuSelectionRequired')).toBe(true);
    expect(component.searchForm.get('restaurantName')?.getError('restaurantNameRequired')).toBeNull();
  });

  it('should fetch menu details from the service', () => {
    const mockMenuDetails = [{ id: 1, name: 'Menu 1' }];
    spyOn(menuService, 'getMenuDetails').and.returnValue(of(mockMenuDetails));
    component.ngOnInit();
    expect(component.menuDetails).toEqual(mockMenuDetails);
  });

  it('should submit the form and call the search service', () => {
    const mockResponse = [{
      id: 3,
      name: 'Ristorante Buona Tavola',
      address: '789 Oak Street',
      menus: [
        {
          id: 301,
          name: 'PIZZA',
          price: 15.99,
        },
      ],
    }];
    component.ngOnInit();
    spyOn(searchService, 'search').and.returnValue(of(mockResponse));
    component.searchForm.get('searchType')?.setValue('restaurant');
    component.searchForm.get('restaurantName')?.setValue('SearchTerm');
    component.search();
    expect(searchService.search).toHaveBeenCalledWith('restaurant', 'SearchTerm');
    expect(component.restaurants).toEqual(mockResponse);
  });

  it('should display validation errors for required fields', () => {
    component.ngOnInit();
    component.isFormSubmitted = true;
    component.search();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.validation-message')).not.toBeNull();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
