import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';

@Injectable()
export class ContentService {

  public url: string;
  private storage = new Subject<string>();

  constructor(private _http: Http, private _userService: UserService) {
    this.url = 'http://localhost:3978/api/';
    this.url = 'https://actres.unileon.es/actres_internal/api/';
  }

  watchStorage(): Observable<any> {
    return this.storage.asObservable();
  }

  loadLanguage(){

    let language = 'es';

    if (localStorage.getItem('language')) {
        language = localStorage.getItem('language');
    }

    return language;
  }

  setLanguage(language){

    localStorage.setItem('language', language);
    this.storage.next(this.loadLanguage());

  }

  getContent(nameContent, language){

    const session = this._userService.getSession();

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':session.token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'content/' + nameContent + '/' + language, options).map(res => res.json());

  }

  getContentDatasheet(type){

    const session = this._userService.getSession();

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':session.token
    });

    let options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'content_datasheet/' + type, options).map(res => res.json());

  }

  editContent(token, content, action?:any){

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});

    if (action) {

      if (action.title == 'delete') {
        this._http.delete(this.url + 'datasheet/' + action.datasheet.oldName + '/' + action.datasheet.type, options).subscribe(res => res.json());
      }

      if (action.title == 'edit') {
        let params = {'name': action.datasheet.newName};
        this._http.put(this.url + 'datasheet_name/' + action.datasheet.oldName + '/' + action.datasheet.type, params, options).subscribe(res => res.json());
      }

    }

    let params = JSON.stringify(content);

    return this._http.put(this.url + 'content/' + content._id, params, options).map(res => res.json());

  }

}
