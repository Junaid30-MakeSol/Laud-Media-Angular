import { NgModule } from '@angular/core';
import { CustomDigitOnlyDirective } from './custom-digit-only.directive';
import { CustomDigitPipe } from './custom-digit-pipe';

@NgModule({
  imports: [],
  declarations: [CustomDigitOnlyDirective, CustomDigitPipe],
  exports: [CustomDigitOnlyDirective, CustomDigitPipe],
  providers: [CustomDigitPipe],
})
export class CustomDigitOnlyModule {}
