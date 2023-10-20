import { TestBed } from '@angular/core/testing';
import { Restaurant } from 'src/app/models/Restaurant';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of restaurants match the search criteria', () => {
    const searchCriteria = 'nonexistent'; 
    const searchTerm = 'Nonexistent Restaurant';

    service.search(searchCriteria, searchTerm).subscribe((restaurants: Restaurant[]) => {
      expect(restaurants).toBeTruthy();
      expect(restaurants.length).toBe(3);
    });
  });
});
