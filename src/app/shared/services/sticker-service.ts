import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Sticker } from '../types/sticker'

@Injectable({
  providedIn: 'root',
})
export class StickerService {
  private readonly _http = inject(HttpClient)

  getStickers(): Observable<Sticker[]> {
    return this._http.get<Sticker[]>('/data/stickers/stickers.json')
  }
}
