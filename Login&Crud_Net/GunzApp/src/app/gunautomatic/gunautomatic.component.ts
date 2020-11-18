import { Component, OnInit } from '@angular/core';
import { GunService } from '../shared/gun.service';
import { Router } from '@angular/router';
import { Gunautomatic } from '../shared/gunautomatic.model';

@Component({
  selector: 'app-gunautomatic',
  templateUrl: './gunautomatic.component.html',
  styleUrls: ['./gunautomatic.component.scss']
})
export class GunautomaticComponent implements OnInit {
  btnLabel: string;

  constructor(
    public service: GunService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshList();
    this.btnLabel = 'Add Auto Type';
  }

  refreshList() {
    this.service.getGunAutos().then(res => this.service.gunautoList = res as Gunautomatic[]);
  }

  resetForm() {
    this.service.gunautoData = {
      GunAutomaticID: 0,
      GunAutoDesc: ''
    };

    this.service.gunautoList = [];
  }

  editGunAuto(obj: Gunautomatic) {
    this.service.gunautoData = obj;
    this.btnLabel = 'Update Auto Type';
  }

  submitGunAuto() {
    if (this.service.gunautoData.GunAutomaticID === 0) {
      this.service.postGunAuto(this.service.gunautoData).subscribe(res => {
        this.resetForm();
        this.refreshList();
      });
    } else {
      this.service.putGunAuto(this.service.gunautoData).subscribe(res => {
        this.resetForm();
        this.refreshList();
      });
    }
  }

  routeGun() {
    this.router.navigate(['/gun']);
  }

  routeType() {
    this.router.navigate(['/guntype']);
  }

}
