import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ArtistService } from '../../shared/services/artist-service'
import { toSignal } from '@angular/core/rxjs-interop'
import { ArtistCard } from './components/artist-card/artist-card'

@Component({
  selector: 'artists',
  imports: [ArtistCard],
  templateUrl: './artists.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Artists {
  private readonly _artistService = inject(ArtistService)

  protected readonly artists = toSignal(this._artistService.getArtists(), {
    initialValue: [],
  })
}
