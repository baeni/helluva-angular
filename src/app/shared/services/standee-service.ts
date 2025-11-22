import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, shareReplay } from 'rxjs'
import { Standee } from '../types/standee'

@Injectable({
  providedIn: 'root',
})
export class StandeeService {
  private readonly _http = inject(HttpClient)

  private readonly standees$ = this._http
    .get<Standee[]>('/data/standees/standees.json')
    .pipe(shareReplay(1))

  getAll(): Observable<Standee[]> {
    return this.standees$
  }
}
