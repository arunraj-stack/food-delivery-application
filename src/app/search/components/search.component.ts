import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Menu } from 'src/app/models/Menu';
import { Restaurant } from 'src/app/models/Restaurant';
import { MenuService } from '../services/menu.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  isFormSubmitted = false;
  restaurants: Restaurant[] = [];
  menuDetails: Menu[] = [];

  constructor(private searchService: SearchService, private menuService: MenuService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchType: ['restaurant', Validators.required],
      restaurantName: ['', this.restaurantNameValidator()],
      menuSelection: [''],
    });

    this.searchForm.get('searchType')?.valueChanges.subscribe((searchType) => {
      this.updateValidators(searchType);
    });

    this.menuService.getMenuDetails().subscribe(data => this.menuDetails = data);
  }

  updateValidators(searchType: string) {
    const restaurantNameControl = this.searchForm.get('restaurantName');
    const menuSelectionControl = this.searchForm.get('menuSelection');

    if (searchType === 'restaurant') {
      restaurantNameControl?.setValidators([Validators.required, this.restaurantNameValidator()]);
      menuSelectionControl?.clearValidators();
    } else if (searchType === 'menu') {
      menuSelectionControl?.setValidators([Validators.required, this.menuSelectionValidator()]);
      restaurantNameControl?.clearValidators();
    }

    restaurantNameControl?.updateValueAndValidity();
    menuSelectionControl?.updateValueAndValidity();
  }

  search(): void {
    this.isFormSubmitted = true;
    if (this.searchForm.valid) {
      const searchType = this.searchForm.get('searchType')?.value;
      const searchTerm = this.searchForm.get(searchType === 'restaurant' ? 'restaurantName' : 'menuSelection')?.value;

      this.searchService.search(searchType, searchTerm).subscribe((data) => {
        this.restaurants = data;
      });
    }
  }

  private restaurantNameValidator(): ValidatorFn {
    return (control) => {
      if (!control?.value) {
        return { restaurantNameRequired: true };
      }
      return null;
    };
  }

  private menuSelectionValidator(): ValidatorFn {
    return (control) => {
      if (!control?.value) {
        return { menuSelectionRequired: true };
      }
      return null;
    };
  }
}
