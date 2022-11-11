import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotesListComponent } from './notes-list.component';
import { NotesAddModule } from '../notes-add/notes-add.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, NotesAddModule, TranslateModule],
  declarations: [NotesListComponent],
  exports: [NotesListComponent],
})
export class NotesListModule {}
