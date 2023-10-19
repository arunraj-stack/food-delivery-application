import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchService } from './../../services/search.service';
import { SearchComponent } from './search.component';
import { of, throwError } from 'rxjs';
import { restaurantMockData } from 'src/app/data/restaurant-mock-data';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule], // Use HttpClientTestingModule if you make HTTP requests
      providers: [SearchService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.searchType).toBe('restaurant');
    expect(component.searchTerm).toBe('');
    expect(component.restaurants).toEqual([]);
  });

  it('should call the search service on search()', () => {
    const searchType = 'restaurant';
    const searchTerm = 'pizza';
    const searchResults = restaurantMockData;

    spyOn(searchService, 'search').and.returnValue(of(searchResults));

    component.searchType = searchType;
    component.searchTerm = searchTerm;
    component.search();

    expect(searchService.search).toHaveBeenCalledWith(searchType, searchTerm);
    expect(component.restaurants).toEqual(searchResults);
  });
});
