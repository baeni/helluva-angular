import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { ArtistService } from '../../services/artist-service'
import { ShopItem } from '../../types/common/shop-item'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { AnimationItem } from 'lottie-web'

@Component({
  selector: 'shop-item-card',
  imports: [LottieComponent],
  templateUrl: './shop-item-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCard {
  private readonly _artistService: ArtistService = inject(ArtistService)

  readonly shopItem = input.required<ShopItem>()

  private readonly _artist$ = toObservable(this.shopItem).pipe(
    switchMap((shopItem) =>
      this._artistService.getArtistById(shopItem.artistId)
    )
  )

  private readonly artist = toSignal(this._artist$, { initialValue: null })

  protected readonly artistName = computed(() => this.artist()?.name)

  protected lottieBagOptions: AnimationOptions = {
    path: '/lottie/bag.json',
    autoplay: false,
    loop: false,
  }
  private lottieBagItem: AnimationItem | null = null

  protected onCreated(animationItem: AnimationItem) {
    this.lottieBagItem = animationItem
  }

  protected playForward() {
    if (!this.lottieBagItem) return

    this.lottieBagItem.resetSegments(true)

    const half = this.lottieBagItem.getDuration(true) / 2

    this.lottieBagItem.setSpeed(1.75)
    this.lottieBagItem.playSegments([0, half], true)
  }

  protected playReverse() {
    if (!this.lottieBagItem) return

    this.lottieBagItem.setSpeed(-1.75)
    this.lottieBagItem.play()
  }
}
