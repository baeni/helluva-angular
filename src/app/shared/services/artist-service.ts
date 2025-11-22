import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, shareReplay } from 'rxjs'
import { Artist } from '../types/artist'

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly _http = inject(HttpClient)

  private readonly artists$ = this._http
    .get<Artist[]>('/data/artists.json')
    .pipe(shareReplay(1))

  getArtists(): Observable<Artist[]> {
    return this.artists$
  }

  getArtistById(id: string): Observable<Artist | null> {
    return this.artists$.pipe(
      map((artists) => artists.find((a) => a.id === id) ?? null)
    )
  }
}
