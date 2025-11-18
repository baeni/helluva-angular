import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { DisclaimerBanner } from './shared/components/disclaimer-banner/disclaimer-banner'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DisclaimerBanner],
  templateUrl: './app.html',
})
export class App {}
