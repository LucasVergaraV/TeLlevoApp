import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { triggerAsyncId } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private router: Router, private sqlite: SQLite) {
    this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(MAIL VARCHAR(75),CONTRASENA VARCHAR(30))', []
      ).then(() =>{
        console.log("LC: TABLA CREADA")
      }).catch(e => {
        console.log("LC: TABLA NO CREADA")
      })
    }).catch(e => {
      console.log("LC: BD NO CREADA")
    })
  }
// TABLA USUARIO
  almacenarUsuario(correo: any, contrasena: any){
    this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {

      db.executeSql('INSERT INTO USUARIO VALUES(?, ?)', [correo, contrasena]
      ).then(() =>{
        console.log("LC: USUARIO ALMACENADO")
      }).catch(e => {
        console.log("LC: USUARIO NO ALMACENADO")
      })
    }).catch(e => {
      console.log("LC: BD NO CREADA")
    })
  }

  validarUsuario(correo: any){
    return this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      
      return db.executeSql('SELECT COUNT(MAIL) AS CANTIDAD FROM USUARIO WHERE MAIL = ?', [correo]
      ).then((data) =>{
        if(data.rows.item(0).CANTIDAD === 0){
          return false; //Si retorna falso el correo NO EXISTE
        }
        return true; //Si retorna true el correo YA EXISTE EN LA BASE DE DATOS
      }).catch(e => {
        return true;
      })
    }).catch(e => {
    })
  }
  prueba:string="hola"
  verificarUsuario(correo: string, contrasena: string){
    return this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      console.log("LC: correo =>"+correo)
      console.log("LC: contrasena =>"+contrasena)
      console.log("LC:"+this.prueba)
      return db.executeSql('SELECT COUNT(MAIL) AS CANTIDAD FROM USUARIO WHERE MAIL = ? AND CONTRASENA = ?', [correo, contrasena]
      ).then((data) =>{
        if(data.rows.item(0).CANTIDAD === 0){
          return false; //Si retorna falso el correo NO EXISTE
        }
        return true; //Si retorna true el correo YA EXISTE EN LA BASE DE DATOS
      }).catch(e => {
        return true;
      })
    }).catch(e => {
    })
  }
}
