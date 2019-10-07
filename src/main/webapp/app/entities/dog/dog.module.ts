import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuditingSharedModule } from 'app/shared/shared.module';
import { DogComponent } from './dog.component';
import { DogDetailComponent } from './dog-detail.component';
import { DogUpdateComponent } from './dog-update.component';
import { DogDeletePopupComponent, DogDeleteDialogComponent } from './dog-delete-dialog.component';
import { dogRoute, dogPopupRoute } from './dog.route';

const ENTITY_STATES = [...dogRoute, ...dogPopupRoute];

@NgModule({
  imports: [AuditingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DogComponent, DogDetailComponent, DogUpdateComponent, DogDeleteDialogComponent, DogDeletePopupComponent],
  entryComponents: [DogComponent, DogUpdateComponent, DogDeleteDialogComponent, DogDeletePopupComponent]
})
export class AuditingDogModule {}
