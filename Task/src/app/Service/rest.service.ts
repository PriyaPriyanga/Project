import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {HttpErrorResponse } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  
  constructor(private http : HttpClient) 
  {


  }


  getDetails()
  {
    return this.http.get('http://localhost:57735/api/Service/GetService');
    

  }



}
