import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from '../business.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {
  public uploader = this.bs.uploader;


  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: BusinessService, private router: Router,
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Name: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      Job: ['', Validators.required],
      Resume: ['', Validators.required]

    });
  }



  adddata() {
    console.log(this.angForm.value.Resume)
    // this.uploader.uploadAll();
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status == 200) {
        this.bs.addBusiness(this.angForm.value.Name, this.angForm.value.Phone, this.angForm.value.Email, this.angForm.value.Job, response).subscribe(res => {
          alert(res['business']);
          this.router.navigate(['users']);
        });

      }
      else {
        alert("Error ")
      }
    };
  }

}
