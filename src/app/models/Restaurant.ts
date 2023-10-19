import { Injectable } from '@angular/core';
import { Menu } from "../models/Menu";


export interface Restaurant {
  id: number;
  name: string;
  address: string;
  menus: Menu[];
}
