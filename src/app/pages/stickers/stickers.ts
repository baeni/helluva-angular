import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { StickerService } from '../../shared/services/sticker-service'
import { ShopItemCard } from '../../shared/components/shop-item-card/shop-item-card'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'stickers',
  imports: [ShopItemCard],
  templateUrl: './stickers.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stickers {
  private readonly _stickerService = inject(StickerService)

  protected readonly stickers = toSignal(this._stickerService.getStickers(), {
    initialValue: [],
  })
}
