import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotesListPopupComponent } from './notes-list-popup.component';
import { NotesAddModule } from '../notes-add/notes-add.module';
import { NotesListModule } from '../notes-list/notes-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, NotesAddModule, TranslateModule, NotesListModule],
  declarations: [NotesListPopupComponent],
  exports: [NotesListPopupComponent],
})
export class NotesListPopupModule {}
