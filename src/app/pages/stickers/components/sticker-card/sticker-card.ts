import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { Sticker } from '../../../../shared/types/sticker'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'
import { ArtistService } from '../../../../shared/services/artist-service'

@Component({
  selector: 'sticker-card',
  imports: [],
  templateUrl: './sticker-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerCard {
  private readonly _artistService = inject(ArtistService)

  readonly sticker = input.required<Sticker>()

  private readonly _artist$ = toObservable(this.sticker).pipe(
    switchMap((sticker) => this._artistService.getArtistById(sticker.artistId))
  )

  private readonly artist = toSignal(this._artist$, { initialValue: null })

  protected readonly artistName = computed(() => this.artist()?.name)
}
