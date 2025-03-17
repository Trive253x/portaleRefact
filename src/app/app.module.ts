import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePickerModalComponent } from './date-picker-modal/date-picker-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestioneAssetsService } from './services/gestioneAssets.service';

@NgModule({
  declarations: [
    AppComponent, 
    DatePickerModalComponent
  ],
  imports: [BrowserModule, IonicModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: GestioneAssetsService}],
  bootstrap: [AppComponent],
})
export class AppModule {}
