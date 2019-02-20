import { Component, OnInit } from '@angular/core';
import Business from '../Business';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Business[];
  empty: boolean ;

  constructor(private bs: BusinessService) { }

  ngOnInit() {
    this.bs.getBusinesses().subscribe((data: Business[]) => {
      this.businesses = data;
      if (data.length != 0) {
        this.empty = false;
      }
      else {
        this.empty = true;
      }
    });
  }

  deleteBusiness(id) {
    this.bs.deleteBusiness(id).subscribe(res => {
      alert('Deleted');
      this.bs.getBusinesses().subscribe((data: Business[]) => {
        this.businesses = data;
        if (data.length != 0) {
          this.empty = false;
        }
        else {
          this.empty = true;
        }
      });
    });
  }

}
