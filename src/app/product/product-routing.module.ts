import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';

const childrenRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: childrenRoutes,
    data: {
      title: extract('Product.Title'),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProductRoutingModule {}
