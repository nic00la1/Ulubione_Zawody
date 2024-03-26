import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Osoba } from './shared/models/Osoba.model';
import { OsobaService } from './services/osoba.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  osoby!:Osoba[]
  osobaService = inject(OsobaService)

  ngOnInit() {
    this.getOsoby();
  }

  getOsoby() : void {
    this.osoby = this.osobaService.getOsoby();
  }
  
}
