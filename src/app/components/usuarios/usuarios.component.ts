import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public user: any;
  public users: any[];

  public session: any;
  public error: any;

  constructor(private _userService: UserService) {
    this.user = {'place':'ACTRES', 'acronym':'ULE'};
    this.session = {identity: '', token: ''}
  }

  ngOnInit() {

    this.watchStorage();
    this.session = this._userService.getSession();
    this.loadUsers();

  }

  loadUsers(){

    this._userService.getAllUsers(this.session.token).subscribe(

      response => {
        this.users = response.users;
      },

      error =>{
        console.log(error._body);
      }

    );

  }

  saveUser(){

    this._userService.saveUser(this.session.token, this.user).subscribe(

      response => {
        this.loadUsers();
        this.user = {'place':'Universidad de León', 'acronym':'ULE'};
      },

      error =>{
        this.error = true;
        if (error.status == 401) this._userService.removeSession();
      }

    );

  }

  deleteUser(userID, index){

    this._userService.deleteUser(this.session.token, userID).subscribe(

      response => {
        this.users.splice(index, 1);
      },

      error =>{
        if (error.status == 401) this._userService.removeSession();
      }

    );

  }

  watchStorage(){
    this._userService.watchStorage().subscribe((data:string) => {
      this.session = this._userService.getSession();
    });
  }

}
