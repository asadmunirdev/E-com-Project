import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pkrCurrency',
  standalone: true // Make the pipe standalone
})
export class PkrCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || isNaN(value)) return ''; // Handle invalid values
    return `₨ ${value.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
