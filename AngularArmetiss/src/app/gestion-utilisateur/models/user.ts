export class User {
   Id_User: number;
   User_Last_Name: string;
   User_First_Name: string;
   User_Password:string;
   confirm_pwd: string;
   originalEmail: string;
   User_Email_Address:string;
   User_BirthDate:Date;
   Id_Role: number;
   User_Activity: boolean;
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
