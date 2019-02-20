import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  uri = environment.baseurl;
  
  public uploader:FileUploader = new FileUploader({url:this.uri+'/upload', itemAlias: 'photo'});

  constructor(private http: HttpClient,) { }


  
  addBusiness(Name, Phone, Email, Job,Resume) {
    const obj = {
      Name: Name,
      Phone: Phone,
      Email: Email,
      Job: Job,
      Resume:Resume

    };
    return this.http.post(`${this.uri}/add`, obj)
  }

  getBusinesses() {
    return this
      .http
      .get(`${this.uri}`);
  }

  editBusiness(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }


  updateBusiness(Name, Phone, Email, Job,Resume,id) {

    const obj = {
      Name: Name,
      Phone: Phone,
      Email: Email,
      Job: Job,
      Resume:Resume
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteBusiness(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}
