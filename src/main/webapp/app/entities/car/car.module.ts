import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuditingSharedModule } from 'app/shared/shared.module';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarUpdateComponent } from './car-update.component';
import { CarDeletePopupComponent, CarDeleteDialogComponent } from './car-delete-dialog.component';
import { carRoute, carPopupRoute } from './car.route';

const ENTITY_STATES = [...carRoute, ...carPopupRoute];

@NgModule({
  imports: [AuditingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CarComponent, CarDetailComponent, CarUpdateComponent, CarDeleteDialogComponent, CarDeletePopupComponent],
  entryComponents: [CarComponent, CarUpdateComponent, CarDeleteDialogComponent, CarDeletePopupComponent]
})
export class AuditingCarModule {}
