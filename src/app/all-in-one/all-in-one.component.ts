import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-all-in-one',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './all-in-one.component.html',
  styleUrls: ['./all-in-one.component.css']
})
export class AllInOneComponent { }
