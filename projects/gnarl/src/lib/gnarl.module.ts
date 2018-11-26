import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { GnarlComponent } from './gnarl.component';
import { GnarlInputComponent } from './gnarl-input/gnarl-input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GnarlComponent, GnarlInputComponent],
  exports: [GnarlComponent]
})
export class GnarlModule { }
