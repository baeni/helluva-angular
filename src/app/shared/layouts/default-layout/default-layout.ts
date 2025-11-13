import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Navbar } from '../../components/navbar/navbar'
import { RouterOutlet } from '@angular/router'
import { Snowflakes } from '../../components/snowflakes/snowflakes'

@Component({
  selector: 'default-layout',
  imports: [RouterOutlet, Navbar, Snowflakes],
  templateUrl: './default-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayout {}
