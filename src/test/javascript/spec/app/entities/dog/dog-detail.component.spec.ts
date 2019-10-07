import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AuditingTestModule } from '../../../test.module';
import { DogDetailComponent } from 'app/entities/dog/dog-detail.component';
import { Dog } from 'app/shared/model/dog.model';

describe('Component Tests', () => {
  describe('Dog Management Detail Component', () => {
    let comp: DogDetailComponent;
    let fixture: ComponentFixture<DogDetailComponent>;
    const route = ({ data: of({ dog: new Dog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AuditingTestModule],
        declarations: [DogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
