import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanExpiryFilter',
  pure: false,
})
export class BooleanExpiryPipe implements PipeTransform {
  transform(value: boolean): any {
    return value ? 'Utløpsdato' : '';
  }
}
