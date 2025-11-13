import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly items: { label: string; route: string }[] = [
    {
      label: 'Standees',
      route: 'standees',
    },
    {
      label: 'Keychains',
      route: 'keychains',
    },
    {
      label: 'Stickers',
      route: 'stickers',
    },
    {
      label: 'Artists',
      route: 'artists',
    },
  ]
}
