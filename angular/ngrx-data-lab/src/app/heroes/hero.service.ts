import { Injectable } from '@angular/core';
import { Hero } from '../core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';

@Injectable({ providedIn: 'root' })
export class HeroService extends EntityCollectionServiceBase<Hero> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Hero', serviceElementsFactory);
  }

  // constructor(private http: HttpClient, private toastService: ToastService) {}

  // logout() {
  //   return this.http.get(`${api}/logout`);
  // }

  // getProfile() {
  //   return this.http.get<any>(`${api}/profile`);
  // }

  // getAll() {
  //   const url = `${api}/heroes`;
  //   const msg = 'Heroes retrieved successfully!';
  //   return this.http
  //     .get<Hero[]>(url)
  //     .pipe(
  //       tap(() => this.toastService.openSnackBar(msg, 'GET')),
  //       catchError(this.handleError)
  //     );
  // }

  // private handleError(res: HttpErrorResponse) {
  //   console.error(res.error);
  //   return observableThrowError(res.error || 'Server error');
  // }

  // delete(hero: Hero) {
  //   return this.http
  //     .delete(`${api}/hero/${hero.id}`)
  //     .pipe(
  //       tap(() =>
  //         this.toastService.openSnackBar(`Hero ${hero.name} deleted`, 'DELETE')
  //       )
  //     );
  // }

  // add(hero: Hero) {
  //   return this.http
  //     .post<Hero>(`${api}/hero/`, hero)
  //     .pipe(
  //       tap(() =>
  //         this.toastService.openSnackBar(`Hero ${hero.name} added`, 'POST')
  //       )
  //     );
  // }

  // update(hero: Hero) {
  //   return this.http
  //     .put<Hero>(`${api}/hero/${hero.id}`, hero)
  //     .pipe(
  //       tap(() =>
  //         this.toastService.openSnackBar(`Hero ${hero.name} updated`, 'PUT')
  //       )
  //     );
  // }
}
