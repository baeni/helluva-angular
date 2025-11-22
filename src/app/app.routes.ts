import { Routes } from '@angular/router'
import { Standees } from './pages/standees/standees'
import { Artists } from './pages/artists/artists'
import { Stickers } from './pages/stickers/stickers'
import { Keychains } from './pages/keychains/keychains'
import { DefaultLayout } from './shared/layouts/default-layout/default-layout'
import { environment } from '../environments/environment'
import { inject } from '@angular/core'
import { APP_INFO } from './app.config'

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
            title: () => {
              const { name } = inject(APP_INFO)
              return `Standees — ${name}`
            },
          },
          {
            path: 'keychains',
            component: Keychains,
            title: () => {
              const { name } = inject(APP_INFO)
              return `Keychains — ${name}`
            },
          },
          {
            path: 'stickers',
            component: Stickers,
            title: () => {
              const { name } = inject(APP_INFO)
              return `Stickers — ${name}`
            },
          },
          {
            path: 'artists',
            component: Artists,
            title: () => {
              const { name } = inject(APP_INFO)
              return `Artists — ${name}`
            },
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
            title: () => {
              const { name } = inject(APP_INFO)
              return `Artists — ${name}`
            },
          },
          {
            path: '**',
            redirectTo: 'artists',
          },
        ],
  },
]
