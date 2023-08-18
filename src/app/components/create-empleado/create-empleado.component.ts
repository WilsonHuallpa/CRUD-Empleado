import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/interfaces/interface.empleados';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit{
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = "Agregar Empleado";
  empleadoEdit: Empleado | null = null;
  constructor(
    private fb: FormBuilder,
    private _empleadoServices: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }
  ngOnInit(): void {
    this.esEditar()
  }
  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    if(this.id === null){
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      document: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._empleadoServices
      .agregarEmpleado(empleado)
      .then(() => {
        this.toastr.success('El empleado fue registrado con exito', 'Empleado registrado', {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
        this.router.navigate(['/list-empleados'])
      })
      .catch((error) => { 
        console.log(error);
        this.loading = false;
      });
  }
  async editarEmpleado(id: string){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      document: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date(),
    };
    try {
      this.loading = true;
      await this._empleadoServices.actualizarEmpleado(id, empleado);
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado Actualizado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/list-empleados'])
    }catch(err){
      console.log("Error al actualizar", err)
    }
 
    
  }
  async esEditar(){
    if(this.id !== null){
      this.loading = true;
      this.titulo = "Editar empleado";
      this.empleadoEdit = await this._empleadoServices.getEmpleadoPorId(this.id);
      this.loading = false;
      if (this.empleadoEdit !== null) {
        this.createEmpleado.setValue({
          nombre: this.empleadoEdit.nombre,
          apellido: this.empleadoEdit.apellido,
          documento: this.empleadoEdit.document,
          salario: this.empleadoEdit.salario
        })
      }
    }
  }
}
