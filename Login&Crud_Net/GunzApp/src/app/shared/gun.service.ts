import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gun } from './gun.model';
import { Guntype } from './guntype.model';
import { Gunautomatic } from './gunautomatic.model';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GunService {
  gunData: Gun;
  gunList: Gun[];
  guntypeData: Guntype;
  guntypeList: Guntype[];
  gunautoData: Gunautomatic;
  gunautoList: Gunautomatic[];

  constructor( private http: HttpClient ) { }

  getGuns() {
    return this.http.get(environment.ApiURL + '/Guns').toPromise();
  }

  postGun(obj: Gun) {
    return this.http.post(environment.ApiURL + '/Guns', obj);
  }

  putGun(obj: Gun) {
    return this.http.put(environment.ApiURL + '/Guns/' + obj.GunID, obj);
  }

  deleteGun(id: number) {
    return this.http.delete(environment.ApiURL + '/Guns/' + id);
  }

  getGunTypes() {
    return this.http.get(environment.ApiURL + '/GunTypes').toPromise();
  }

  postGunType(obj: Guntype) {
    return this.http.post(environment.ApiURL + '/GunTypes', obj);
  }

  putGunType(obj: Guntype) {
    return this.http.put(environment.ApiURL + '/GunTypes/' + obj.GunTypeID, obj);
  }

  getGunAutos() {
    return this.http.get(environment.ApiURL + '/GunAutomatics').toPromise();
  }

  postGunAuto(obj: Gunautomatic) {
    return this.http.post(environment.ApiURL + '/GunAutomatics', obj);
  }

  putGunAuto(obj: Gunautomatic) {
    return this.http.put(environment.ApiURL + '/GunAutomatics/' + obj.GunAutomaticID, obj);
  }
}
