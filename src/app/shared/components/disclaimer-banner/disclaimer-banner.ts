import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'disclaimer-banner',
  imports: [],
  providers: [CookieService],
  templateUrl: './disclaimer-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerBanner implements OnInit {
  protected readonly showBanner = signal<boolean>(false)
  protected readonly cookieName = 'disclaimer_consent'

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.showBanner.set(!this.cookieService.check(this.cookieName))
  }

  acceptDisclaimer(): void {
    this.cookieService.set(this.cookieName, 'accepted', 365)
    this.showBanner.set(false)
  }
}
