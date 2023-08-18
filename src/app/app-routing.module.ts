import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';

// pathMatch: 'full': La URL debe coincidir exactamente con la ruta definida para activar la redirección.
// pathMatch: 'prefix': La URL debe comenzar con la ruta definida para activar la redirección.
const routes: Routes = [
  { path: '', redirectTo: 'list-empleados', pathMatch: 'full'},
  { path:'list-empleados', component: ListEmpleadosComponent },
  { path:'create-empleado', component: CreateEmpleadoComponent },
  { path:'editEmpleado/:id', component: CreateEmpleadoComponent },
  { path:'**', redirectTo: 'list-empleados', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
