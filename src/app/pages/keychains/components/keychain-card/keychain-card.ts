import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Keychain } from '../../../../shared/types/keychain'

@Component({
  selector: 'keychain-card',
  imports: [],
  templateUrl: './keychain-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeychainCard {
  readonly keychain = input.required<Keychain>()
}
