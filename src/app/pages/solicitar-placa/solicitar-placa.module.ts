import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SolicitarPlacaPage } from './solicitar-placa.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarPlacaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SolicitarPlacaPage]
})
export class SolicitarPlacaPageModule {}
