import { NgModule } from '@angular/core';
import { GnarlComponent } from './gnarl.component';
import { GnarlInputComponent } from './gnarl-input/gnarl-input.component';

@NgModule({
  imports: [
  ],
  declarations: [GnarlComponent, GnarlInputComponent],
  exports: [GnarlComponent]
})
export class GnarlModule { }
