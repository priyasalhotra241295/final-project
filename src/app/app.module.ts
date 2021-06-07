import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { FooterComponent} from './modules/shared/layout/footer/footer.component';
import { HeaderComponent,} from './modules/shared/layout/header/header.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './modules/fish/home/home.component';
import { NgImageSliderModule } from 'ng-image-slider';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpModule,
    NgImageSliderModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    Ng2TelInputModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
