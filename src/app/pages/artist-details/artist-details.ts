import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core'
import { ArtistCard } from '../artists/components/artist-card/artist-card'
import { Artist } from '../../shared/types/artist'
import { ActivatedRoute } from '@angular/router'
import { ArtistService } from '../../shared/services/artist-service'

@Component({
  selector: 'artist-details',
  imports: [ArtistCard],
  templateUrl: './artist-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetails implements OnInit {
  private readonly _route = inject(ActivatedRoute)
  private readonly _artistService = inject(ArtistService)

  protected readonly artist = signal<Artist | null>(null)

  ngOnInit(): void {
    // Reactively subscribe to param changes
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id')
      if (!id) return // TODO: show not found

      this._artistService
        .getArtistById(id)
        .subscribe((artist) => this.artist.set(artist))
    })
  }
}
