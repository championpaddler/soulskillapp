import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  uri = 'http://localhost:4000/business';
  public uploader:FileUploader = new FileUploader({url:this.uri+'/upload', itemAlias: 'photo'});

  constructor(private http: HttpClient,) { }


  
  addBusiness(Name, Phone, Email, Job) {
    const obj = {
      Name: Name,
      Phone: Phone,
      Email: Email,
      Job: Job
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
  uploadfile()
  {

  }

  updateBusiness(Name, Phone, Email, Job,id) {

    const obj = {
      Name: Name,
      Phone: Phone,
      Email: Email,
      Job: Job
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
