import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, elementAt } from 'rxjs';
import {Empleado} from 'src/app/interfaces/interface.empleados';
import { EmpleadoService } from 'src/app/services/empleado.service';
@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit{
  empleados: Empleado[] = [];

  constructor(private _empleadoService: EmpleadoService,    private toastr: ToastrService) {}
  ngOnInit(): void{
    this.getEmpleados();
  }
  async getEmpleados() {
   try{
    this.empleados = await this._empleadoService.getEmpleados();
    console.log(this.empleados);
   }catch(er){
    console.log('error Al obtener los datos:', er)
   }
  }
  async eliminarEmpleado(id: string){
    try{
      await this._empleadoService.eliminarEmpleado(id);
      this.toastr.error('El empleado eliminado correctamente', 'Empleado Eliminado', {
        positionClass: 'toast-bottom-right'
      });
      console.log('empleado eliminado con exito')
      this.getEmpleados();
    }catch(err){
      console.log(err);
    }
    
  }
}
