import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { KeychainService } from '../../shared/services/keychain-service'
import { ShopItemCard } from '../../shared/components/shop-item-card/shop-item-card'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'keychains',
  imports: [ShopItemCard],
  templateUrl: './keychains.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Keychains {
  private readonly _keychainService = inject(KeychainService)

  protected readonly keychains = toSignal(
    this._keychainService.getKeychains(),
    {
      initialValue: [],
    }
  )
}
