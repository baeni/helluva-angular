import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { Keychain } from '../../../../shared/types/keychain'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'
import { ArtistService } from '../../../../shared/services/artist-service'

@Component({
  selector: 'keychain-card',
  imports: [],
  templateUrl: './keychain-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeychainCard {
  private readonly _artistService = inject(ArtistService)

  readonly keychain = input.required<Keychain>()

  private readonly _artist$ = toObservable(this.keychain).pipe(
    switchMap((keychain) =>
      this._artistService.getArtistById(keychain.artistId)
    )
  )

  private readonly artist = toSignal(this._artist$, { initialValue: null })

  protected readonly artistName = computed(() => this.artist()?.name)
}
