import { Component, OnInit } from '@angular/core';
import { GunService } from '../shared/gun.service';
import { Router } from '@angular/router';
import { Guntype } from '../shared/guntype.model';

@Component({
  selector: 'app-guntype',
  templateUrl: './guntype.component.html',
  styleUrls: ['./guntype.component.scss']
})
export class GuntypeComponent implements OnInit {
  btnLabel: string;

  constructor(
    public service: GunService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshList();
    this.btnLabel = 'Add Type';
  }

  refreshList() {
    this.service.getGunTypes().then(res => this.service.guntypeList = res as Guntype[]);
  }

  resetForm() {
    this.service.guntypeData = {
      GunTypeID: 0,
      GunTypeName: ''
    };

    this.service.guntypeList = [];
  }

  editGunType(obj: Guntype) {
    this.service.guntypeData = obj;
    this.btnLabel = 'Update Auto Type';
  }

  submitGunAuto() {
    if (this.service.guntypeData.GunTypeID === 0) {
      this.service.postGunType(this.service.guntypeData).subscribe(res => {
        this.resetForm();
        this.refreshList();
      });
    } else {
      this.service.putGunType(this.service.guntypeData).subscribe(res => {
        this.resetForm();
        this.refreshList();
      });
    }
  }

  routeGun() {
    this.router.navigate(['/gun']);
  }

  routeAuto() {
    this.router.navigate(['/gunautomatic']);
  }
}
