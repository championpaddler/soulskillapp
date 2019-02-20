import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  angForm: FormGroup;
  business: any = {};
  public uploader = this.bs.uploader;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: BusinessService,
    private fb: FormBuilder) {
      this.createForm();
     }

  createForm() {
    this.angForm = this.fb.group({
        Name: ['', Validators.required ],
        Phone: ['', Validators.required ],
        Email: ['', Validators.required ],
        Job: ['', Validators.required ],
        Resume: ['', Validators.required]


      });
    }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bs.editBusiness(params['id']).subscribe(res => {
        this.business = res;
      });
    });
  
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status == 200) {
        this.route.params.subscribe(params => {
          this.bs.updateBusiness(this.angForm.value.Name,this.angForm.value.Phone,this.angForm.value.Email,this.angForm.value.Job,response, params['id']);
          this.router.navigate(['users']);
       });
      }
      else 
      {
        alert("Error While Updating")
      }
    };
  }


}
