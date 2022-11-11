import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPersonTypeFilter',
  pure: false,
})
export class BooleanPersonTypePipe implements PipeTransform {
  transform(value: boolean): any {
    return value ? 'Ja' : 'Nei';
  }
}
