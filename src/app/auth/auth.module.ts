import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [TranslateModule, ReactiveFormsModule, I18nModule, AuthRoutingModule],
  declarations: [LoginComponent],
})
export class AuthModule {}
