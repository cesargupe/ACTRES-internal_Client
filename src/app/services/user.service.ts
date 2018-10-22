import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  public url: string;
  private storage = new Subject<string>();

  constructor(private _http: Http) {
    this.url = 'http://actres.unileon.es/actres_internal/api/';
  }

  watchStorage(): Observable<any> {
    return this.storage.asObservable();
  }

  signIn(user_to_login){

    let params = JSON.stringify(user_to_login);

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let options = new RequestOptions({headers: headers});

    //this.loginGeneradores(user_to_login.team, user_to_login.password);

    return this._http.post(this.url + 'login/', params, options).map(res => res.json());

  }

  getAllUsers(token){

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'users/', options).map(res => res.json());

  }

  saveUser(token, user){

    let params = JSON.stringify(user);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.post(this.url + 'new_user/', params, options).map(res => res.json());

  }


  setSession(identity, token){

    localStorage.setItem('identity', JSON.stringify(identity));
    localStorage.setItem('token', JSON.stringify(token));

    this.storage.next("change");

  }

  getSession(){

    let sesion = {identity: '', token: ''};

    if (localStorage.getItem('identity')) {
        sesion.identity = JSON.parse(localStorage.getItem('identity'));
    }

    if (localStorage.getItem('token')) {
        sesion.token = localStorage.getItem('token');
    }

    return sesion;

  }

  removeSession(){

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.storage.next("change");

  }

  loginPHP() {

    this.autoLogin('https://actres.unileon.es/internal/general_login?username=ACTRES&password=eWh0Z2ZyZWdldHJ5aGdiaGdydGVmZHRyaGdyZg7MTAwMg==');

 }

 loginGeneradores(username, password) {

   let user_login_routes = {'rosa.rabadan':'Gitec/login', 'belen.labrador':'Gitec/login', 'noelia.ramon':'Gitec/login', 'angeles.diez':'Gac/login', 'acrif':'Git/login', 'purificacion.fernandez':'Gac/login', 'pizarro':'Gac/login', 'mariabelen.lopez':'Gac/login', 'mariateresa.ortego':'Gac/login', 'marlen.izquierdo':'Gac/login', 'fjpalacios':'Fitevi/login', 'mperb':'Gac/login', 'roberts.roda':'Gac/login', 'leticia.morenop':'Fitevi/login', 'admin':'Gitec/login'};

   let headers = new Headers({
     'Content-Type':'application/json'
   });

   let options = new RequestOptions({headers: headers});
   let user = JSON.stringify({'nombre':username, 'password': password});

   this._http.post('https://actres.unileon.es:8080/' + user_login_routes[username], user, options).subscribe(
     res => {
       this.autoLogin('https://actres.unileon.es:8080/autoLogin.html?token=' + JSON.stringify(res.json().token));
     },

     error => {
       console.log(error._body);
     }
   );

 }

 autoLogin(url){

   var newWindow = window.open(url, "_blank", "width=80, height=10, location=no, menubar=no, status=no, titlebar=no, resizable=no, status=no");

   setTimeout(function(){
     newWindow.close();
   }, 1000);

 }

}
