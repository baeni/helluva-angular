import { Routes } from '@angular/router'
import { Standees } from './pages/standees/standees'
import { Artists } from './pages/artists/artists'
import { Stickers } from './pages/stickers/stickers'
import { Keychains } from './pages/keychains/keychains'
import { DefaultLayout } from './shared/layouts/default-layout/default-layout'
import { ArtistDetails } from './pages/artist-details/artist-details'

const appTitle: string = 'Helluva Snowball Fight'

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
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
        path: 'artists/:id',
        component: ArtistDetails,
        title: `Artists — ${appTitle}`,
      },

      { path: '**', redirectTo: 'standees' },
    ],
  },
]
