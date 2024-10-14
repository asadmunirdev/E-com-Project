import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-all-in-one',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './all-in-one.component.html',
  styleUrls: ['./all-in-one.component.css']
})
export class AllInOneComponent {
  constructor(private toastr: ToastrService) {} // Inject ToastrService

  showToast() {
    this.toastr.success('This is a success message!', 'Success'); // Show toast
  }
}
