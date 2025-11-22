import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { shareReplay } from 'rxjs'

/**
 * The `provideCacheableAnimationLoader()` which has to be registered as a provider
 * inside app.config.ts did not seem to work in combination with the json
 * being passed to the `ngx-lottie` `AnimationOptions` using the path param.
 *
 * This service fetches the json once so that it can be passed to the
 * animationData param instead.
 */
@Injectable({
  providedIn: 'root',
})
export class LottieCacheService {
  private readonly _http = inject(HttpClient)

  burger$ = this._http.get('/lottie/burger.json').pipe(shareReplay(1))
  bag$ = this._http.get('/lottie/bag.json').pipe(shareReplay(1))
}
