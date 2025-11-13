import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { KeychainService } from '../../shared/services/keychain-service'
import { KeychainCard } from './components/keychain-card/keychain-card'

@Component({
  selector: 'keychains',
  imports: [KeychainCard],
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
