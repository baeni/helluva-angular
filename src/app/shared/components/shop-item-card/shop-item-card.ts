import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core'
import { ArtistService } from '../../services/artist-service'
import { ShopItem } from '../../types/common/shop-item'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { AnimationItem } from 'lottie-web'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'shop-item-card',
  imports: [LottieComponent],
  templateUrl: './shop-item-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCard {
  private readonly _artistService: ArtistService = inject(ArtistService)
  private readonly _platformId = inject(PLATFORM_ID)

  readonly shopItem = input.required<ShopItem>()

  private readonly _artist$ = toObservable(this.shopItem).pipe(
    switchMap((shopItem) =>
      this._artistService.getArtistById(shopItem.artistId)
    )
  )

  private readonly artist = toSignal(this._artist$, { initialValue: null })
  protected readonly artistName = computed(() => this.artist()?.name)

  protected readonly isMobile =
    isPlatformBrowser(this._platformId) &&
    matchMedia('(pointer: coarse)').matches

  protected lottieBagOptions: AnimationOptions = {
    path: '/lottie/bag.json',
    autoplay: false,
    loop: false,
  }
  private lottieBagItem: AnimationItem | null = null

  protected onCreated(animationItem: AnimationItem) {
    this.lottieBagItem = animationItem

    if (this.isMobile) {
      // Jump immediately to last frame (static)
      const half = animationItem.getDuration(true) / 2
      animationItem.goToAndStop(half, true)
    }
  }

  protected playForward() {
    if (!this.lottieBagItem || this.isMobile) return

    this.lottieBagItem.resetSegments(true)

    const half = this.lottieBagItem.getDuration(true) / 2

    this.lottieBagItem.setSpeed(1.75)
    this.lottieBagItem.playSegments([0, half], true)
  }

  protected playReverse() {
    if (!this.lottieBagItem || this.isMobile) return

    this.lottieBagItem.setSpeed(-1.75)
    this.lottieBagItem.play()
  }
}
