import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Sticker } from '../../../../shared/types/sticker'

@Component({
  selector: 'sticker-card',
  imports: [],
  templateUrl: './sticker-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerCard {
  readonly sticker = input.required<Sticker>()
}
