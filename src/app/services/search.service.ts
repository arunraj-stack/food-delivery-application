import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { restaurantMockData } from '../data/restaurant-mock-data';
import { Restaurant } from '../models/Restaurant';

@Injectable({
  providedIn: 'root', // This makes the service a Singleton
})

export class SearchService {
  //private apiUrl = 'your-api-url'; // Replace with your API endpoint

  search(searchCriteria: string, searchTerm: string): Observable<Restaurant[]> {
    //const url = `${this.apiUrl}/restaurants?searchCriteria=searchCriteria&&searchTerm=searchTerm`;
    if (!searchCriteria || !searchTerm) {
      // If search criteria or term is not provided, return an empty array
      return of([]);
    }
    
    return of(restaurantMockData);
  }
}
