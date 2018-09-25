import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http : Http) { }

  getResult(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('assets/json/week_14.json', { headers: headers })
      .map(res => res.json()
    );
  }
}
