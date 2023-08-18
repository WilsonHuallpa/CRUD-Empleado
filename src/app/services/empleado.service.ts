import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QueryDocumentSnapshot, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Empleado} from '../interfaces/interface.empleados';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  constructor(private firestore: Firestore) {}

  agregarEmpleado(empleado: any): Promise<any> {
    const aCollection = collection(this.firestore, 'empleados'); 
    return addDoc(aCollection, empleado);
  }
  
 async getEmpleados(): Promise<Empleado[]> {
    const aCollection = collection(this.firestore, 'empleados');
    const q = query(aCollection, orderBy('fechaCreacion', 'asc'));
    const querySnapshot = await getDocs(q);
    const empleados: Empleado[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data() as Empleado;
      // Convertir Firestore Timestamp a Date
      data.fechaActualizacion = (data.fechaActualizacion as any).toDate();
      data.fechaCreacion = (data.fechaCreacion as any).toDate();
      data.id = doc.id; 
      empleados.push(data);
    })
    return empleados;
  }

  async eliminarEmpleado(id: string): Promise<void> {
    const aCollection = collection(this.firestore, 'empleados');
    const empleadoDoc = doc(aCollection, id);
    await deleteDoc(empleadoDoc);
  }
  async getEmpleadoPorId(id: string): Promise<Empleado | null> {
    const aCollection = collection(this.firestore, 'empleados');
    const empleadoDoc = doc(aCollection, id);
    const docSnapshot = await getDoc(empleadoDoc);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as Empleado;
      // Convertir Firestore Timestamp a Date
      data.fechaActualizacion = (data.fechaActualizacion as any).toDate();
      data.fechaCreacion = (data.fechaCreacion as any).toDate();
      data.id = docSnapshot.id;
      return data;
    } else {
      return null;
    }
  }
  async actualizarEmpleado(id: string, data: Empleado): Promise<void> {
    const aCollection = collection(this.firestore, 'empleados');
    const empleadoDoc = doc(aCollection, id);
    
    const camposActualizar = {
      nombre: data.nombre,
      apellido: data.apellido,
      document: data.document,
      salario: data.salario,
      fechaActualizacion: new Date(),
    };
  
    await updateDoc(empleadoDoc, camposActualizar);
  }
}
