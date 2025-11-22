import { computed, inject, Injectable } from '@angular/core'
import { StandeeService } from './standee-service'
import { KeychainService } from './keychain-service'
import { StickerService } from './sticker-service'
import { combineLatest } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root',
})
export class ShopItemAggregateService {
  private readonly _standeeService = inject(StandeeService)
  private readonly _keychainService = inject(KeychainService)
  private readonly _stickerService = inject(StickerService)

  private readonly _all$ = combineLatest([
    this._standeeService.getAll(),
    this._keychainService.getAll(),
    this._stickerService.getAll(),
  ])

  private readonly allItems = toSignal(this._all$, {
    initialValue: [[], [], []],
  })

  getCountFor(artistId: string): number {
    return this.artistItemCount().get(artistId) ?? 0
  }

  /** Map: artistId → total contributed items */
  private readonly artistItemCount = computed(() => {
    const [stickers, standees, keychains] = this.allItems()

    const map = new Map<string, number>()

    const add = (artistId: string) => {
      map.set(artistId, (map.get(artistId) ?? 0) + 1)
    }

    stickers.forEach((i) => add(i.artistId))
    standees.forEach((i) => add(i.artistId))
    keychains.forEach((i) => add(i.artistId))

    return map
  })
}
