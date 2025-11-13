import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { Standee } from '../../../../shared/types/standee'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'
import { ArtistService } from '../../../../shared/services/artist-service'

@Component({
  selector: 'standee-card',
  imports: [],
  templateUrl: './standee-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandeeCard {
  private readonly _artistService = inject(ArtistService)

  readonly standee = input.required<Standee>()

  private readonly _artist$ = toObservable(this.standee).pipe(
    switchMap((standee) => this._artistService.getArtistById(standee.artistId))
  )

  private readonly artist = toSignal(this._artist$, { initialValue: null })

  protected readonly artistName = computed(() => this.artist()?.name)
}
