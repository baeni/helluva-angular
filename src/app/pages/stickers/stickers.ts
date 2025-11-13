import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { StickerService } from '../../shared/services/sticker-service'
import { toSignal } from '@angular/core/rxjs-interop'
import { StickerCard } from './components/sticker-card/sticker-card'

@Component({
  selector: 'stickers',
  imports: [StickerCard],
  templateUrl: './stickers.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stickers {
  private readonly _stickerService = inject(StickerService)

  protected readonly stickers = toSignal(this._stickerService.getStickers(), {
    initialValue: [],
  })
}
