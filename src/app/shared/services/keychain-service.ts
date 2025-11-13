import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Keychain } from '../types/keychain'

@Injectable({
  providedIn: 'root',
})
export class KeychainService {
  private readonly _http = inject(HttpClient)

  getKeychains(): Observable<Keychain[]> {
    return this._http.get<Keychain[]>('/data/keychains.json')
  }
}
