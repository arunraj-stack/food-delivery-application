import { SearchService } from './../../services/search.service';
import { Component } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchType: 'restaurant' | 'menu' = 'restaurant';
  searchTerm: string = '';
  searchResults: string[] = [];
  errorMessage: string = '';

  restaurants: Restaurant[] = [];

  constructor(private searchService: SearchService) {}

  search(): void {
    this.searchService.search(this.searchType, this.searchTerm.toLowerCase()).subscribe(data => {
      this.restaurants = data;
    });
  }
}
