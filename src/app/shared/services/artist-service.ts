import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Artist } from '../types/artist'

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly _http = inject(HttpClient)

  getArtists(): Observable<Artist[]> {
    return this._http.get<Artist[]>('/data/artists.json')
  }

  getArtistById(id: string): Observable<Artist | null> {
    return this.getArtists().pipe(
      map((artists) => artists.find((a) => a.id === id) ?? null)
    )
  }
}
