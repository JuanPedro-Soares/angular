import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { Observable } from 'rxjs';
import { Photos } from 'src/app/photo.interface';

@Injectable({providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Photos[]>>{
  constructor(private service:PhotoService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photos[]> | Observable<Observable<Photos[]>> | Promise<Observable<Photos[]>> {
 const userName=route.params['userName']
 return this.service.listFromUserPaginated(userName,1)
  }
}