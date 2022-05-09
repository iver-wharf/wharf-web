import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from '../shared/shared.module';
import { LicensesComponent } from './licenses.component';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    LicensesComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ProgressSpinnerModule,
    SharedModule,
    TooltipModule,
    AccordionModule,
  ],
  providers: [
    TitleCasePipe,
  ],
})
export class LicensesModule { }
