import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core'

@Directive({
  selector: '[tooltip]',
})
export class Tooltip {
  private readonly _host = inject(ElementRef<HTMLElement>).nativeElement

  readonly tooltip = input.required<string>()
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>(
    'bottom'
  )
  readonly tooltipDisabled = input<boolean>(false)

  private readonly isVisible = signal<boolean>(false)

  private tooltipEl: HTMLElement | null = null

  private readonly positionClasses: Record<string, string> = {
    top: 'left-1/2 -translate-x-1/2 bottom-full mb-2',
    bottom: 'left-1/2 -translate-x-1/2 top-full mt-2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }

  constructor() {
    effect(() => {
      if (!this.isVisible() || this.tooltipDisabled()) {
        this.removeTooltip()
        return
      }
      this.createTooltip()
    })

    this._host.classList.add('relative', 'inline-block')
  }

  /** Show tooltip on hover/focus */
  @HostListener('mouseenter') onMouseEnter() {
    this.isVisible.set(true)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isVisible.set(false)
  }

  @HostListener('focus') onFocus() {
    this.isVisible.set(true)
  }

  @HostListener('blur') onBlur() {
    this.isVisible.set(false)
  }

  // Create tooltip element
  private createTooltip() {
    if (this.tooltipEl) return

    const tooltip = document.createElement('div')
    tooltip.textContent = this.tooltip()

    tooltip.className = `
      pointer-events-none absolute z-50 px-2 py-1 rounded
      bg-black text-white text-xs whitespace-nowrap
      opacity-0 scale-95 transition-all duration-200
      ${this.positionClasses[this.tooltipPosition()]}
    `

    // Trigger transition on next tick
    requestAnimationFrame(() => {
      tooltip.classList.add('opacity-100', 'scale-100')
    })

    this.tooltipEl = tooltip
    this._host.appendChild(tooltip)
  }

  // Remove tooltip element
  private removeTooltip() {
    if (!this.tooltipEl) return

    const el = this.tooltipEl
    el.classList.remove('opacity-100', 'scale-100')

    setTimeout(() => el.remove(), 150)
    this.tooltipEl = null
  }
}
