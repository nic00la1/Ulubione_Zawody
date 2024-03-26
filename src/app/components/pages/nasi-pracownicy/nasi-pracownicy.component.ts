import { Component, inject } from '@angular/core';
import { Osoba } from '../../../shared/models/Osoba.model';
import { OsobaService } from '../../../services/osoba.service';

@Component({
  selector: 'app-nasi-pracownicy',
  standalone: true,
  imports: [],
  templateUrl: './nasi-pracownicy.component.html',
  styleUrl: './nasi-pracownicy.component.css'
})
export class NasiPracownicyComponent {
  osoby!:Osoba[]
  osobaService = inject(OsobaService)

  ngOnInit() {
    this.getOsoby();
  }

  getOsoby() : void {
    this.osoby = this.osobaService.getOsoby();
  }
}
