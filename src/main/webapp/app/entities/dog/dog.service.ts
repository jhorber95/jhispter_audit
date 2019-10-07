import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDog } from 'app/shared/model/dog.model';

type EntityResponseType = HttpResponse<IDog>;
type EntityArrayResponseType = HttpResponse<IDog[]>;

@Injectable({ providedIn: 'root' })
export class DogService {
  public resourceUrl = SERVER_API_URL + 'api/dogs';

  constructor(protected http: HttpClient) {}

  create(dog: IDog): Observable<EntityResponseType> {
    return this.http.post<IDog>(this.resourceUrl, dog, { observe: 'response' });
  }

  update(dog: IDog): Observable<EntityResponseType> {
    return this.http.put<IDog>(this.resourceUrl, dog, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDog>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDog[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
