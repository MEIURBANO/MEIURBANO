import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'solicitar-placa', loadChildren: './pages/solicitar-placa/solicitar-placa.module#SolicitarPlacaPageModule' },
  { path: 'add-nota', loadChildren: './add-nota/add-nota.module#AddNotaPageModule' },
  { path: 'add-chassi', loadChildren: './add-chassi/add-chassi.module#AddChassiPageModule' },
  { path: 'realizar-pedido', loadChildren: './realizar-pedido/realizar-pedido.module#RealizarPedidoPageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  // { path: 'solicitar-placa', loadChildren: './pages/solicitar-placa/solicitar-placa.module#HomeResultsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
