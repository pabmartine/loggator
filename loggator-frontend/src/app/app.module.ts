import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './pages/main/main.component';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './pages/header/header.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {ColorPickerModule} from 'primeng/colorpicker';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ListboxModule} from 'primeng/listbox';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    ColorPickerModule,
    OverlayPanelModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
