import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { StandeeService } from '../../shared/services/standee-service'
import { toSignal } from '@angular/core/rxjs-interop'
import { StandeeCard } from './components/standee-card/standee-card'

@Component({
  selector: 'standees',
  imports: [StandeeCard],
  templateUrl: './standees.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Standees {
  private readonly _standeeService = inject(StandeeService)

  protected readonly standees = toSignal(this._standeeService.getStandees(), {
    initialValue: [],
  })
}
