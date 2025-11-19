import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { AnimationItem } from 'lottie-web'
import { environment } from '../../../../environments/environment'
import { NgClass } from '@angular/common'
import { Tooltip } from '../tooltip/tooltip'

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive, LottieComponent, NgClass, Tooltip],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly isOverlayOpen = signal<boolean>(false)

  protected readonly items: {
    label: string
    route: string
    disabled: boolean
  }[] = [
    // Enabled depending on Environment variable ONLY_ARTISTS.
    // Remember to also adjust in app.routes.ts
    {
      label: 'Standees',
      route: 'standees',
      disabled: environment.ONLY_ARTISTS,
    },
    {
      label: 'Keychains',
      route: 'keychains',
      disabled: environment.ONLY_ARTISTS,
    },
    {
      label: 'Stickers',
      route: 'stickers',
      disabled: environment.ONLY_ARTISTS,
    },
    {
      label: 'Artists',
      route: 'artists',
      disabled: false,
    },
  ]

  protected lottieBurgerOptions: AnimationOptions = {
    path: '/lottie/burger.json',
    autoplay: false,
    loop: false,
  }
  private lottieBurgerItem: AnimationItem | null = null

  protected toggleOverlay() {
    const isOverlayOpen = this.isOverlayOpen()

    if (!isOverlayOpen) {
      this.playForward()
    } else {
      this.playReverse()
    }

    this.isOverlayOpen.set(!isOverlayOpen)
  }

  protected onCreated(animationItem: AnimationItem) {
    this.lottieBurgerItem = animationItem
  }

  private playForward() {
    if (!this.lottieBurgerItem) return

    this.lottieBurgerItem.resetSegments(true)

    const half = this.lottieBurgerItem.getDuration(true) / 2

    this.lottieBurgerItem.setSpeed(1.75)
    this.lottieBurgerItem.playSegments([0, half], true)
  }

  private playReverse() {
    if (!this.lottieBurgerItem) return

    this.lottieBurgerItem.setSpeed(-1.75)
    this.lottieBurgerItem.play()
  }
}
