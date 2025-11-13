import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Standee } from '../../../../shared/types/standee'

@Component({
  selector: 'standee-card',
  imports: [],
  templateUrl: './standee-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandeeCard {
  readonly standee = input.required<Standee>()
}
