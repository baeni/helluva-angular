import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideRouter, withViewTransitions } from '@angular/router'
import {
  provideCacheableAnimationLoader,
  provideLottieOptions,
} from 'ngx-lottie'
import player from 'lottie-web/build/player/lottie_light'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideLottieOptions({
      player: () => player,
    }),
    provideCacheableAnimationLoader(),
  ],
}
