/**
 * Toast utility adapted from DKFDS
 * API: const toast = new Toast(element); toast.show(); toast.hide(); toast.destroy();
 * Expects markup similar to DKFDS:
 * <div class="toast hide|showing|show toast-info|toast-success|toast-warning|toast-error" aria-atomic="true">
 *   <div class="toast-icon"></div>
 *   <div class="toast-message"> ... <button class="toast-close">Luk</button></div>
 * </div>
 */

type EventHandler = (_event: Event) => void

export default class Toast {
  private root: HTMLElement
  private listeners: Array<{
    element: Element | Window | Document
    event: string
    handler: EventHandler
  }> = []
  private autoDismissTimer: number | null = null

  constructor(element: HTMLElement) {
    if (!element.classList.contains('toast')) {
      throw new Error('Toast: Root element must have class "toast"')
    }
    this.root = element
    this.init()
  }

  private init(): void {
    // Ensure initial state is hidden for animation to work as DKFDS expects
    if (!this.root.classList.contains('hide') && !this.root.classList.contains('show')) {
      this.root.classList.add('hide')
    }

    // Close button
    const closeBtn = this.root.querySelector('.toast-close')
    if (closeBtn) {
      this.addEvent(closeBtn, 'click', () => this.hide())
    }
  }

  show(autoDismissMs?: number): void {
    this.clearTimer()
    this.root.classList.remove('hide')
    this.root.classList.add('showing')
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.root.offsetHeight
    this.root.classList.remove('showing')
    this.root.classList.add('show')

    if (typeof autoDismissMs === 'number' && autoDismissMs > 0) {
      this.autoDismissTimer = window.setTimeout(() => this.hide(), autoDismissMs)
    }
  }

  hide(): void {
    this.clearTimer()
    this.root.classList.remove('show')
    this.root.classList.add('hide')
  }

  destroy(): void {
    this.clearTimer()
    // Remove listeners
    for (const { element, event, handler } of this.listeners) {
      element.removeEventListener(event, handler)
    }
    this.listeners = []
  }

  private clearTimer(): void {
    if (this.autoDismissTimer !== null) {
      window.clearTimeout(this.autoDismissTimer)
      this.autoDismissTimer = null
    }
  }

  private addEvent(
    element: Element | Window | Document,
    event: string,
    handler: EventHandler,
  ): void {
    element.addEventListener(event, handler)
    this.listeners.push({ element, event, handler })
  }
}
