import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dog } from 'app/shared/model/dog.model';
import { DogService } from './dog.service';
import { DogComponent } from './dog.component';
import { DogDetailComponent } from './dog-detail.component';
import { DogUpdateComponent } from './dog-update.component';
import { DogDeletePopupComponent } from './dog-delete-dialog.component';
import { IDog } from 'app/shared/model/dog.model';

@Injectable({ providedIn: 'root' })
export class DogResolve implements Resolve<IDog> {
  constructor(private service: DogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDog> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Dog>) => response.ok),
        map((dog: HttpResponse<Dog>) => dog.body)
      );
    }
    return of(new Dog());
  }
}

export const dogRoute: Routes = [
  {
    path: '',
    component: DogComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Dogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DogDetailComponent,
    resolve: {
      dog: DogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DogUpdateComponent,
    resolve: {
      dog: DogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DogUpdateComponent,
    resolve: {
      dog: DogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dogs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dogPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DogDeletePopupComponent,
    resolve: {
      dog: DogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dogs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
