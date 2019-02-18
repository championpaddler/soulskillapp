import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: BusinessService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Name: ['', Validators.required ],
      Phone: ['', Validators.required ],
      Email: ['', Validators.required ],
      Job: ['', Validators.required ]
    });
  }

  addBusiness(Name, Phone, Email,Job) {
    this.bs.addBusiness(Name, Phone, Email,Job);
  }

  ngOnInit() {
  }

}
