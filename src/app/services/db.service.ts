import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { triggerAsyncId } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  infoUsuario = {
    nombre: "",
    rut: "",
    correo: ""
  }

  infoExtraUsuario = {
    rut: "",
    carrera: "",
    semestre: "",
    numeroCelular: ""
  }

  constructor(private router: Router, private sqlite: SQLite) {
    // CREACION TABLA USUARIO
    this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(NOMBRE VARCHAR(50),RUT VARCHAR(15),MAIL VARCHAR(75),CONTRASENA VARCHAR(30))', []
      ).then(() =>{
        console.log("LC: TABLA USUARIO CREADA")
      }).catch(e => {
        console.log("LC: TABLA USUARIO NO CREADA")
      })
    }).catch(e => {
      console.log("LC: BD NO CREADA")
    })
    // CREACION TABLA EXTRA_USUARIO
    this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('CREATE TABLE IF NOT EXISTS EXTRA_USUARIO(RUT VARCHAR(15),CARRERA VARCHAR(50),SEMESTRE VARCHAR(6),CELULAR VARCHAR(9))', []
      ).then(() =>{
        console.log("LC: TABLA EXTRA_USUARIO CREADA")
      }).catch(e => {
        console.log("LC: TABLA EXTRA_USUARIO NO CREADA")
      })
    }).catch(e => {
      console.log("LC: BD NO CREADA")
    })

  }
// TABLA USUARIO
  almacenarUsuario(usuario:any, rut:any, correo: any, contrasena: any){
    this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {

      db.executeSql('INSERT INTO USUARIO VALUES(?, ?, ?, ?)', [usuario, rut, correo, contrasena]
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

  verificarUsuario(correo: string, contrasena: string){
    return this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {
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

  listarInfoUsuario(correo: string){
    return this.sqlite.create({
      name: 'db.datos',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      return db.executeSql('SELECT NOMBRE, RUT, MAIL FROM USUARIO WHERE MAIL = ?', [correo]
      ).then((data) =>{
        this.infoUsuario.nombre = data.rows.item(0).NOMBRE,
        this.infoUsuario.rut = data.rows.item(0).RUT,
        this.infoUsuario.correo = data.rows.item(0).MAIL
        localStorage.setItem('usuario',JSON.stringify(this.infoUsuario))
        console.log("LC: "+JSON.stringify(this.infoUsuario))
        console.log("LC: DATOS SALIENTES DE LA BASE DE DATOS")
        console.log("LC: "+localStorage.getItem('usuario'))
        console.log("LC: DATOS GUARDADOS EN EL LOCALSTORAGE")
        return this.infoUsuario
      }).catch(e => {
      })
    }).catch(e => {
    })
  }

// TABLA EXTRA_USUARIO
almacenarExtraUsuario(rut:any, carrera:any, semestre: any, celular: any){
  this.sqlite.create({
    name: 'db.datos',
    location: 'default'
  }).then((db: SQLiteObject)=> {

    db.executeSql('INSERT INTO EXTRA_USUARIO VALUES(?, ?, ?, ?)', [rut, carrera, semestre, celular]
    ).then(() =>{
      console.log("LC: EXTRA_USUARIO ALMACENADO")
    }).catch(e => {
      console.log("LC: EXTRA_USUARIO NO ALMACENADO")
    })
  }).catch(e => {
    console.log("LC: BD NO CREADA")
  })
}
listarInfoExtraUsuario(rut: string){
  return this.sqlite.create({
    name: 'db.datos',
    location: 'default'
  }).then((db: SQLiteObject)=> {
    return db.executeSql('SELECT RUT, CARRERA, SEMESTRE, CELULAR FROM EXTRA_USUARIO WHERE RUT = ?', [rut]
    ).then((data) =>{
      this.infoExtraUsuario.rut = data.rows.item(0).RUT,
      this.infoExtraUsuario.carrera = data.rows.item(0).CARRERA,
      this.infoExtraUsuario.semestre = data.rows.item(0).SEMESTRE,
      this.infoExtraUsuario.numeroCelular = data.rows.item(0).CELULAR
      localStorage.setItem('extraUsuario',JSON.stringify(this.infoExtraUsuario))
      console.log("LC: "+JSON.stringify(this.infoExtraUsuario))
      console.log("LC: DATOS SALIENTES DE LA BASE DE DATOS")
      console.log("LC: "+localStorage.getItem('extraUsuario'))
      console.log("LC: DATOS GUARDADOS EN EL LOCALSTORAGE")
      return this.infoExtraUsuario
    }).catch(e => {
    })
  }).catch(e => {
  })
}



}
