import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../domain/usuario/usuario';

@Injectable()
export class SessionProvider {

  constructor(
    public storage: Storage
  ) {
    
  }
  create(usuario: Usuario){
    this.storage.set('usuario', usuario);
  }
  get(): Promise<any>{
    return this.storage.get('usuario');
  }
  remove(){
    this.storage.remove('usuario');
  }
  exist(){
    this.get().then(res =>{
      console.log ('resultado >>>', res);
    });
  }

}
