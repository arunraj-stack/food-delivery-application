import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/models/Menu';
import { menuMockData } from 'src/app/data/menu-mock-data';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  //private apiUrl = 'https://your-api-url/menu'; // Replace with the actual API URL

  // Fetch menu details from the API
  getMenuDetails(): Observable<Menu[]> {
    return of(menuMockData);
  }
}