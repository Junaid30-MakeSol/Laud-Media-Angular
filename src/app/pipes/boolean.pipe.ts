import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanFilter',
  pure: false,
})
export class BooleanPipe implements PipeTransform {
  transform(value: boolean): any {
    return value ? 'Aktiv' : 'Inaktiv';
  }
}
