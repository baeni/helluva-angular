import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core'
import { Artist } from '../../../../shared/types/artist'
import { isPlatformBrowser } from '@angular/common'
import { Tooltip } from '../../../../shared/components/tooltip/tooltip'

@Component({
  selector: 'artist-card',
  imports: [Tooltip],
  templateUrl: './artist-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistCard {
  private readonly _platformId = inject(PLATFORM_ID)

  readonly artist = input.required<Artist>()

  protected readonly isMobile =
    isPlatformBrowser(this._platformId) &&
    matchMedia('(pointer: coarse)').matches
}
