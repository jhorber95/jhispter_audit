import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AuditingTestModule } from '../../../test.module';
import { DogDeleteDialogComponent } from 'app/entities/dog/dog-delete-dialog.component';
import { DogService } from 'app/entities/dog/dog.service';

describe('Component Tests', () => {
  describe('Dog Management Delete Component', () => {
    let comp: DogDeleteDialogComponent;
    let fixture: ComponentFixture<DogDeleteDialogComponent>;
    let service: DogService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AuditingTestModule],
        declarations: [DogDeleteDialogComponent]
      })
        .overrideTemplate(DogDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DogDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DogService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
