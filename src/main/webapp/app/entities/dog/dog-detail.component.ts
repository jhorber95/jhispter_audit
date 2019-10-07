import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDog } from 'app/shared/model/dog.model';

@Component({
  selector: 'jhi-dog-detail',
  templateUrl: './dog-detail.component.html'
})
export class DogDetailComponent implements OnInit {
  dog: IDog;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dog }) => {
      this.dog = dog;
    });
  }

  previousState() {
    window.history.back();
  }
}
