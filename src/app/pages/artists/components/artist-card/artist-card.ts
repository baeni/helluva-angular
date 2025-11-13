import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Artist } from '../../../../shared/types/artist'

@Component({
  selector: 'artist-card',
  imports: [],
  templateUrl: './artist-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistCard {
  readonly artist = input.required<Artist>()
}
