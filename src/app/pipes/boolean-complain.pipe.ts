import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanComplainFilter',
  pure: false,
})
export class BooleanComplainPipe implements PipeTransform {
  transform(value: boolean): any {
    return value ? 'Behandlet' : 'Under behandling';
  }
}
