import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, shareReplay } from 'rxjs'
import { Sticker } from '../types/sticker'

@Injectable({
  providedIn: 'root',
})
export class StickerService {
  private readonly _http = inject(HttpClient)

  private readonly stickers$ = this._http
    .get<Sticker[]>('/data/stickers/stickers.json')
    .pipe(shareReplay(1))

  getAll(): Observable<Sticker[]> {
    return this.stickers$
  }
}
