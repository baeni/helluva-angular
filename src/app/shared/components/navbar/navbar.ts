import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { AnimationItem } from 'lottie-web'

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive, LottieComponent],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly isOverlayOpen = signal<boolean>(false)

  protected readonly items: { label: string; route: string }[] = [
    {
      label: 'Standees',
      route: 'standees',
    },
    {
      label: 'Keychains',
      route: 'keychains',
    },
    {
      label: 'Stickers',
      route: 'stickers',
    },
    {
      label: 'Artists',
      route: 'artists',
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
