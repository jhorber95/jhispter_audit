import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDog, Dog } from 'app/shared/model/dog.model';
import { DogService } from './dog.service';

@Component({
  selector: 'jhi-dog-update',
  templateUrl: './dog-update.component.html'
})
export class DogUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    color: []
  });

  constructor(protected dogService: DogService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dog }) => {
      this.updateForm(dog);
    });
  }

  updateForm(dog: IDog) {
    this.editForm.patchValue({
      id: dog.id,
      name: dog.name,
      color: dog.color
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dog = this.createFromForm();
    if (dog.id !== undefined) {
      this.subscribeToSaveResponse(this.dogService.update(dog));
    } else {
      this.subscribeToSaveResponse(this.dogService.create(dog));
    }
  }

  private createFromForm(): IDog {
    return {
      ...new Dog(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      color: this.editForm.get(['color']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDog>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
