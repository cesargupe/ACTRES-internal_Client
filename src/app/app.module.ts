import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { Error500Component } from './components/error500/error500.component';
import { Error404Component } from './components/error404/error404.component';
import { CorpusComparablesComponent } from './components/corpus-comparables/corpus-comparables.component';
import { CorpusParalelosComponent } from './components/corpus-paralelos/corpus-paralelos.component';
import { HerramientasComponent } from './components/herramientas/herramientas.component';
import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import { FichaTecnicaComponent } from './components/ficha-tecnica/ficha-tecnica.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Error500Component,
    Error404Component,
    CorpusComparablesComponent,
    CorpusParalelosComponent,
    HerramientasComponent,
    AplicacionesComponent,
    FichaTecnicaComponent,
    AccesoComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
