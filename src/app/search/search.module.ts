import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
