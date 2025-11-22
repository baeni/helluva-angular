import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, shareReplay } from 'rxjs'
import { Keychain } from '../types/keychain'

@Injectable({
  providedIn: 'root',
})
export class KeychainService {
  private readonly _http = inject(HttpClient)

  private readonly keychains$ = this._http
    .get<Keychain[]>('/data/keychains/keychains.json')
    .pipe(shareReplay(1))

  getAll(): Observable<Keychain[]> {
    return this.keychains$
  }
}
