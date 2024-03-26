import { Injectable } from '@angular/core';
import { Osoba } from '../shared/models/Osoba.model';
import { OSOBY } from '../shared/constants/Osoby';

@Injectable({
  providedIn: 'root'
})
export class OsobaService {

  constructor() { }

  getOsoby(): Osoba[] {
    return OSOBY;
  }

  getOsoba(id: number): Osoba {
    return OSOBY.find(osoba => osoba.id === id) as Osoba;
  }
}
