import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Standee } from '../types/standee'

@Injectable({
  providedIn: 'root',
})
export class StandeeService {
  private readonly _http = inject(HttpClient)

  getStandees(): Observable<Standee[]> {
    return this._http.get<Standee[]>('/data/standees/standees.json')
  }
}
