import { Routes } from '@angular/router'
import { Standees } from './pages/standees/standees'
import { Artists } from './pages/artists/artists'
import { Stickers } from './pages/stickers/stickers'
import { Keychains } from './pages/keychains/keychains'
import { DefaultLayout } from './shared/layouts/default-layout/default-layout'
import { environment } from '../environments/environment'

const appTitle: string = 'HellACollab Snowball-Fight Fan Merch'

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: !environment.ONLY_ARTISTS
      ? [
          // Environment variable ONLY_ARTISTS being false.
          // Remember to also adjust in navbar.ts
          {
            path: 'standees',
            component: Standees,
            title: `Standees — ${appTitle}`,
          },
          {
            path: 'keychains',
            component: Keychains,
            title: `Keychains — ${appTitle}`,
          },
          {
            path: 'stickers',
            component: Stickers,
            title: `Stickers — ${appTitle}`,
          },
          {
            path: 'artists',
            component: Artists,
            title: `Artists — ${appTitle}`,
          },

          {
            path: '**',
            redirectTo: 'standees',
          },
        ]
      : [
          // Environment variable ONLY_ARTISTS being true.
          // Remember to also adjust in navbar.ts
          {
            path: 'artists',
            component: Artists,
            title: `Artists — ${appTitle}`,
          },

          {
            path: '**',
            redirectTo: 'artists',
          },
        ],
  },
]
