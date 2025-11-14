import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { StandeeService } from '../../shared/services/standee-service'
import { ShopItemCard } from '../../shared/components/shop-item-card/shop-item-card'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'standees',
  imports: [ShopItemCard],
  templateUrl: './standees.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Standees {
  private readonly _standeeService = inject(StandeeService)

  protected readonly standees = toSignal(this._standeeService.getStandees(), {
    initialValue: [],
  })
}
