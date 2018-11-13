import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GnarlModule } from '../../projects/gnarl/src/lib/gnarl.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GnarlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
