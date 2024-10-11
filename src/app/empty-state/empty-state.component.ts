import { Component , Input} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.css'
})
export class EmptyStateComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() buttonLabel: string = 'Go back';
  @Input() link: string = '/';
}
