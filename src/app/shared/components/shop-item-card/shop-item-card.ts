import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { ArtistService } from '../../services/artist-service'
import { ShopItem } from '../../types/common/shop-item'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { AnimationItem } from 'lottie-web'
import { isPlatformBrowser } from '@angular/common'
import { LottieCacheService } from '../../services/lottie-cache-service'

@Component({
  selector: 'shop-item-card',
  imports: [RouterModule, LottieComponent],
  templateUrl: './shop-item-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCard {
  private readonly _platformId = inject(PLATFORM_ID)
  private readonly _artistService: ArtistService = inject(ArtistService)
  private readonly _lottieCacheService: LottieCacheService =
    inject(LottieCacheService)

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

  protected lottieBagOptions: AnimationOptions | null = null
  private lottieBagItem: AnimationItem | null = null

  constructor() {
    effect(() => {
      this._lottieCacheService.bag$.subscribe((json) => {
        this.lottieBagOptions = {
          animationData: json,
          autoplay: false,
          loop: false,
        }
      })
    })
  }

  protected onCreated(animationItem: AnimationItem) {
    this.lottieBagItem = animationItem
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

  protected onImageError(e: Event, shopItem: ShopItem) {
    const img = e.target as HTMLImageElement
    img.style.display = 'none'
    // img.src = `https://i.pravatar.cc/400?u=${shopItem.id}`
  }
}
