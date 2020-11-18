import { Component, OnInit } from '@angular/core';
import { GunService } from '../shared/gun.service';
import { Gun } from '../shared/gun.model';
import { Guntype } from '../shared/guntype.model';
import { Gunautomatic } from '../shared/gunautomatic.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gun',
  templateUrl: './gun.component.html',
  styleUrls: ['./gun.component.scss']
})
export class GunComponent implements OnInit {
  btnLabel: string;

  constructor(
    public service: GunService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshList();
    this.btnLabel = 'Add New Gun';
  }

  refreshList() {
    this.service.getGunTypes().then(res => this.service.guntypeList = res as Guntype[]);
    this.service.getGunAutos().then(res => this.service.gunautoList = res as Gunautomatic[]);
    this.service.getGuns().then(res => this.service.gunList = res as Gun[]);
  }

  resetForm() {
    this.service.gunData = {
      GunID: 0,
      GunName: '',
      GunDescription: '',
      GunTypeID: 0,
      GunAutomaticID: 0
    };

    this.service.gunList = [];
    this.service.guntypeList = [];
    this.service.gunautoList = [];
  }

  editGun(obj: Gun) {
    this.service.gunData = obj;
    this.btnLabel = 'Update Gun';
  }

  deleteGun(id: number) {
    this.service.deleteGun(id).subscribe(res => {
      this.resetForm();
      this.refreshList();
    });
  }

  selectGunType(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.service.gunData.GunTypeID = 0;
    } else {
      this.service.gunData.GunTypeID = this.service.guntypeList[ctrl.selectedIndex - 1].GunTypeID;
    }
  }

  selectGunAuto(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.service.gunData.GunAutomaticID = 0;
    } else {
      this.service.gunData.GunAutomaticID = this.service.gunautoList[ctrl.selectedIndex - 1].GunAutomaticID;
    }
  }

  submitGun() {
    if (this.service.gunData.GunID === 0) {
      this.service.postGun(this.service.gunData).subscribe(res => {
        this.resetForm();
        this.refreshList();
      });
    } else {
      this.service.putGun(this.service.gunData).subscribe(res => {
        this.resetForm();
        this.refreshList();
      });
    }
  }

  routeType() {
    this.router.navigate(['/guntype']);
  }

  routeAuto() {
    this.router.navigate(['/gunautomatic']);
  }
}
