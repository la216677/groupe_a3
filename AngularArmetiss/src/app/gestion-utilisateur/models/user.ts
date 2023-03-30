import { Role } from "./role";

export class Users {
   id: number;
   last_name: string;
   first_name: string;
   pwd:string;
   confirm_pwd: string;
   originalEmail: string;
   email:string;
   birthDate:Date;
   role: Role;
   activity: boolean;
/*
  constructor(last_name: string,first_name: string,pwd:string,email:string,birthDate: Date, role:number) {

  this.last_name =last_name;
  this.first_name = first_name;
  this.pwd = pwd;
  this.email = email;
  this.role = role;
  this.activity = true;
  this.birthDate = birthDate;
  }
  */
  }
