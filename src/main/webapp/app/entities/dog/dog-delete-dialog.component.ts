import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDog } from 'app/shared/model/dog.model';
import { DogService } from './dog.service';

@Component({
  selector: 'jhi-dog-delete-dialog',
  templateUrl: './dog-delete-dialog.component.html'
})
export class DogDeleteDialogComponent {
  dog: IDog;

  constructor(protected dogService: DogService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dogService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dogListModification',
        content: 'Deleted an dog'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dog-delete-popup',
  template: ''
})
export class DogDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dog }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DogDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dog = dog;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dog', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dog', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
