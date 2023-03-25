import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  baseurl = "http://localhost:8081/";

  post(url:string,data:any){
    return this.http.post(this.baseurl + url, data)
  }

  put(url:string,data:any){
    return this.http.put(this.baseurl + url,data)
  }

  get(url:string){
    return this.http.get(this.baseurl + url)
  }

  delete(data:any){
    return this.http.delete(this.baseurl + data)
  }

}
