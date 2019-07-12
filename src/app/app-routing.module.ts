import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { CorpusComparablesComponent } from './components/corpus-comparables/corpus-comparables.component';
import { CorpusParalelosComponent } from './components/corpus-paralelos/corpus-paralelos.component';
import { CorpusCetriComponent } from './components/corpus-cetri/corpus-cetri.component';
import { CorpusCorpesComponent } from './components/corpus-corpes/corpus-corpes.component';
import { CorpusGedireComponent } from './components/corpus-gedire/corpus-gedire.component';
import { HerramientasComponent } from './components/herramientas/herramientas.component';
import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { Error404Component } from './components/error404/error404.component';

const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'corpus-comparables', component: CorpusComparablesComponent},
  {path: 'corpus-paralelos', component: CorpusParalelosComponent},
  {path: 'corpus-cetri', component: CorpusCetriComponent},
  {path: 'corpus-corpes', component: CorpusCorpesComponent},
  {path: 'corpus-gedire', component: CorpusGedireComponent},
  {path: 'herramientas', component: HerramientasComponent},
  {path: 'aplicaciones', component: AplicacionesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers:[],
  declarations: []
})
export class AppRoutingModule { }
