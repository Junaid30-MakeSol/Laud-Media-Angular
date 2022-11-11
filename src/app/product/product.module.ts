import { NgModule } from '@angular/core';

import { SharedModule } from '@app/@shared';
import { NgbButtonsModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CustomDigitOnlyModule } from '@app/@shared/custom-digit/custom-digit-only.module';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
    NgbButtonsModule,
    NgbModule,
    UiSwitchModule,
    FontAwesomeModule,
    NgSelectModule,
    CustomDigitOnlyModule,
  ],
  declarations: [ProductComponent, ProductListComponent, ProductAddComponent, ProductEditComponent],
  exports: [ProductListComponent],
})
export class ProductModule {}
