import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tooltip {
  readonly text = input.required<string>()
  readonly position = input<'top' | 'bottom' | 'right' | 'left'>('top')
  readonly disabled = input<boolean>(false)

  protected readonly tooltipPositionClasses: Record<string, string> = {
    top: 'left-1/2 -translate-x-1/2 bottom-full mb-2',
    bottom: 'left-1/2 -translate-x-1/2 top-full mt-2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }
}
