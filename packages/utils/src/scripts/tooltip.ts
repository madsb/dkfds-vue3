/**
 * Tooltip utility adapted from DKFDS
 * Provides accessible tooltip functionality for hover and click triggers
 */

const ARROW_DISTANCE_TO_TARGET = 4 // Must match SCSS variable
const ARROW_HEIGHT = 8 // Must match SCSS variable
const MIN_MARGIN = 8 // Minimum margin to edge of window
const HOVER_DELAY = 300 // Delay before showing hover tooltip
const LONG_PRESS_DELAY = 600 // Long press duration for touch

interface TooltipInstance {
  wrapper: HTMLElement
  target: HTMLElement
  tooltip: HTMLSpanElement
  wrapperParents: HTMLElement[]
  updateTooltip?: () => void
  init: () => void
  showTooltip: () => void
  hideTooltip: () => void
  isShowing: () => boolean
  updateTooltipPosition: () => void
  destroy: () => void
}

let createdTooltips: TooltipInstance[] = []

class Tooltip implements TooltipInstance {
  wrapper: HTMLElement
  target: HTMLElement
  tooltip: HTMLSpanElement
  wrapperParents: HTMLElement[] = []
  updateTooltip?: () => void
  private eventListeners: Array<{
    element: Element | Window | Document
    event: string
    handler: EventListener
  }> = []

  constructor(wrapper: HTMLElement) {
    const targetElements = wrapper.getElementsByClassName('tooltip-target')
    if (targetElements.length === 0) {
      throw new Error(
        `Missing tooltip target. Add class 'tooltip-target' to element inside tooltip wrapper.`,
      )
    }
    if (!wrapper.hasAttribute('data-tooltip') || wrapper.dataset.tooltip === '') {
      throw new Error(`Missing tooltip text. Wrapper must have data attribute 'data-tooltip'.`)
    }
    if (wrapper.dataset.trigger !== 'hover' && wrapper.dataset.trigger !== 'click') {
      throw new Error(
        `Missing trigger. Tooltip wrapper must have data attribute 'data-trigger="hover"' or 'data-trigger="click"'.`,
      )
    }
    if (!wrapper.hasAttribute('data-tooltip-id') || wrapper.dataset.tooltipId === '') {
      throw new Error(`Missing ID. Tooltip wrapper must have data attribute 'data-tooltip-id'.`)
    }

    this.wrapper = wrapper
    this.target = targetElements[0] as HTMLElement

    this.tooltip = document.createElement('span')
    this.tooltip.classList.add('tooltip')

    createdTooltips.push(this)
  }

  init(): void {
    const wrapper = this.wrapper
    const tooltipTarget = this.target
    const tooltipEl = this.tooltip
    this.updateTooltip = () => {
      this.updateTooltipPosition()
    }

    this.hideTooltip()

    // Add global event listeners
    this.addEventListener(document.body, 'click', closeAllTooltips)
    this.addEventListener(document.body, 'keyup', closeOnKey)
    this.addEventListener(window, 'beforeprint', closeAllTooltips)

    const trueTooltip = wrapper.dataset.trigger === 'hover'
    tooltipEl.id = wrapper.dataset.tooltipId || ''

    if (trueTooltip) {
      // Hover tooltip implementation
      wrapper.append(tooltipEl)
      this.appendArrow(wrapper)

      if (tooltipTarget.classList.contains('tooltip-is-label')) {
        tooltipTarget.setAttribute('aria-labelledby', wrapper.dataset.tooltipId || '')
      } else {
        tooltipTarget.setAttribute('aria-describedby', wrapper.dataset.tooltipId || '')
      }

      tooltipEl.setAttribute('role', 'tooltip')
      tooltipEl.innerText = wrapper.dataset.tooltip || ''

      // Mouse hover with delay
      this.addEventListener(tooltipTarget, 'pointerover', (e: Event) => {
        const pointerEvent = e as PointerEvent
        if (pointerEvent.pointerType === 'mouse') {
          tooltipTarget.classList.add('js-hover')
          setTimeout(() => {
            if (tooltipTarget.classList.contains('js-hover')) {
              this.showTooltip()
            }
          }, HOVER_DELAY)
        }
      })

      // Touch long press
      this.addEventListener(tooltipTarget, 'pointerdown', (e: Event) => {
        const pointerEvent = e as PointerEvent
        if (pointerEvent.pointerType === 'touch') {
          tooltipTarget.classList.remove('js-pressed')
          tooltipTarget.classList.add('js-pressing')
          setTimeout(() => {
            if (tooltipTarget.classList.contains('js-pressing')) {
              tooltipTarget.classList.add('js-pressed')
              tooltipTarget.classList.remove('js-pressing')
            }
          }, LONG_PRESS_DELAY)
        }
      })

      this.addEventListener(tooltipTarget, 'pointerup', (e: Event) => {
        const pointerEvent = e as PointerEvent
        if (pointerEvent.pointerType === 'touch') {
          if (tooltipTarget.classList.contains('js-pressed')) {
            e.preventDefault()
            this.showTooltip()
          }
        }
      })

      this.addEventListener(tooltipTarget, 'click', () => {
        if (
          document.activeElement !== tooltipTarget &&
          !tooltipTarget.classList.contains('js-pressed')
        ) {
          tooltipTarget.classList.remove('js-hover')
          this.hideTooltip()
        }
      })

      this.addEventListener(tooltipTarget, 'focus', () => {
        this.showTooltip()
      })

      this.addEventListener(tooltipTarget, 'blur', () => {
        this.hideTooltip()
      })

      this.addEventListener(tooltipTarget, 'pointerleave', (e: Event) => {
        const pointerEvent = e as PointerEvent
        if (pointerEvent.pointerType === 'mouse') {
          tooltipTarget.classList.remove('js-hover')
          const rect = tooltipTarget.getBoundingClientRect()
          const center = (rect.top + rect.bottom) / 2
          let onTooltip = false

          if (wrapper.classList.contains('place-above')) {
            onTooltip =
              rect.left <= pointerEvent.clientX &&
              pointerEvent.clientX <= rect.right &&
              pointerEvent.clientY <= center
          } else if (wrapper.classList.contains('place-below')) {
            onTooltip =
              rect.left <= pointerEvent.clientX &&
              pointerEvent.clientX <= rect.right &&
              pointerEvent.clientY >= center
          }

          if (!onTooltip) {
            this.hideTooltip()
          }
        } else if (pointerEvent.pointerType === 'touch') {
          tooltipTarget.classList.remove('js-pressing')
          tooltipTarget.classList.remove('js-pressed')
        }
      })

      this.addEventListener(tooltipEl, 'pointerleave', (e: Event) => {
        const pointerEvent = e as PointerEvent
        if (pointerEvent.pointerType === 'mouse') {
          tooltipTarget.classList.remove('js-hover')
          const rect = tooltipEl.getBoundingClientRect()
          const center = (rect.top + rect.bottom) / 2
          let onTarget = false

          if (wrapper.classList.contains('place-above')) {
            onTarget =
              rect.left <= pointerEvent.clientX &&
              pointerEvent.clientX <= rect.right &&
              pointerEvent.clientY >= center
          } else if (wrapper.classList.contains('place-below')) {
            onTarget =
              rect.left <= pointerEvent.clientX &&
              pointerEvent.clientX <= rect.right &&
              pointerEvent.clientY <= center
          }

          if (!onTarget) {
            this.hideTooltip()
          }
        }
      })

      this.addEventListener(wrapper, 'pointerleave', (e: Event) => {
        const pointerEvent = e as PointerEvent
        if (pointerEvent.pointerType === 'mouse') {
          tooltipTarget.classList.remove('js-hover')
          this.hideTooltip()
        }
      })
    } else {
      // Click tooltip (toggletip) implementation
      const liveRegion = document.createElement('span')
      liveRegion.setAttribute('aria-live', 'assertive')
      liveRegion.setAttribute('aria-atomic', 'true')
      wrapper.append(liveRegion)
      liveRegion.append(tooltipEl)
      this.appendArrow(wrapper)

      tooltipTarget.setAttribute('aria-expanded', 'false')
      tooltipTarget.setAttribute('aria-controls', wrapper.dataset.tooltipId || '')

      this.addEventListener(tooltipTarget, 'click', () => {
        if (wrapper.classList.contains('hide-tooltip')) {
          this.showTooltip()
        } else {
          this.hideTooltip()
        }
      })
    }
  }

  hideTooltip(): void {
    window.removeEventListener('resize', this.updateTooltip as EventListener)

    if (this.wrapper.dataset.forceVisible === 'true') {
      document.removeEventListener('scroll', this.updateTooltip as EventListener)
      for (const parent of this.wrapperParents) {
        parent.removeEventListener('scroll', this.updateTooltip as EventListener)
      }
      this.wrapperParents = []
    }

    this.wrapper.classList.add('hide-tooltip')

    if (this.target.hasAttribute('aria-expanded')) {
      this.target.setAttribute('aria-expanded', 'false')
      this.tooltip.innerText = ''
    }

    this.target.classList.remove('js-pressing')
    this.target.classList.remove('js-pressed')
  }

  showTooltip(): void {
    this.addEventListener(window, 'resize', this.updateTooltip as EventListener)

    if (this.wrapper.dataset.forceVisible === 'true') {
      this.addEventListener(document, 'scroll', this.updateTooltip as EventListener)
      this.wrapperParents = this.getParents(this.wrapper)

      for (const parent of this.wrapperParents) {
        if (this.isScrollable(parent) || this.hasOverflow(parent)) {
          this.addEventListener(parent, 'scroll', this.updateTooltip as EventListener)
        }
      }
    }

    this.wrapper.classList.remove('hide-tooltip')

    if (this.target.hasAttribute('aria-expanded')) {
      this.target.setAttribute('aria-expanded', 'true')
      this.tooltip.innerText = this.wrapper.dataset.tooltip || ''
    }

    this.updateTooltipPosition()

    // Close other tooltips
    for (const tooltip of createdTooltips) {
      if (tooltip.target !== this.target) {
        tooltip.hideTooltip()
      }
    }
  }

  isShowing(): boolean {
    return !this.wrapper.classList.contains('hide-tooltip')
  }

  updateTooltipPosition(): void {
    // Order is important - width must be calculated first
    this.setWidth(this.tooltip)
    this.placeAboveOrBelow(this.wrapper, this.target, this.tooltip)
    this.setLeft(this.wrapper, this.target, this.tooltip)
    this.setTop(this.wrapper, this.target, this.tooltip)

    // Hide if no longer visible
    if (!this.isVisibleOnScreen(this.wrapper, this.wrapperParents)) {
      this.hideTooltip()
    }
  }

  destroy(): void {
    // Remove all event listeners
    for (const { element, event, handler } of this.eventListeners) {
      element.removeEventListener(event, handler)
    }
    this.eventListeners = []

    // Remove from created tooltips
    const index = createdTooltips.indexOf(this)
    if (index > -1) {
      createdTooltips.splice(index, 1)
    }

    // Remove tooltip element
    this.tooltip.remove()

    // Remove arrow if exists
    const arrow = this.wrapper.querySelector('.tooltip-arrow')
    if (arrow) {
      arrow.remove()
    }

    // Reset ARIA attributes
    this.target.removeAttribute('aria-describedby')
    this.target.removeAttribute('aria-labelledby')
    this.target.removeAttribute('aria-expanded')
    this.target.removeAttribute('aria-controls')

    // Reset classes
    this.wrapper.classList.remove('hide-tooltip', 'place-above', 'place-below')
    this.target.classList.remove('js-hover', 'js-pressing', 'js-pressed')
  }

  private addEventListener(
    element: Element | Window | Document,
    event: string,
    handler: EventListener,
  ): void {
    element.addEventListener(event, handler)
    this.eventListeners.push({ element, event, handler })
  }

  private appendArrow(tooltipWrapper: HTMLElement): void {
    const arrow = document.createElement('span')
    arrow.classList.add('tooltip-arrow')
    arrow.setAttribute('aria-hidden', 'true')
    tooltipWrapper.append(arrow)
  }

  private isVisibleOnScreen(
    tooltipWrapper: HTMLElement,
    tooltipWrapperParents: HTMLElement[],
  ): boolean {
    const wrapperRect = tooltipWrapper.getBoundingClientRect()

    if (
      wrapperRect.bottom < 0 ||
      wrapperRect.right < 0 ||
      wrapperRect.left > document.documentElement.clientWidth ||
      wrapperRect.top > document.documentElement.clientHeight
    ) {
      return false
    }

    if (tooltipWrapperParents.length > 0) {
      for (const parent of tooltipWrapperParents) {
        if (this.isScrollable(parent) || this.hasOverflow(parent)) {
          const parentRect = parent.getBoundingClientRect()
          const wrapperIsVisible =
            wrapperRect.bottom > parentRect.top &&
            wrapperRect.right > parentRect.left &&
            wrapperRect.left < parentRect.right &&
            wrapperRect.top < parentRect.bottom

          if (!wrapperIsVisible) {
            return false
          }
        }
      }
    }

    return true
  }

  private isScrollable(element: HTMLElement): boolean {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
  }

  private hasOverflow(element: HTMLElement): boolean {
    const computedStyle = window.getComputedStyle(element)
    return computedStyle.overflowX !== 'visible' || computedStyle.overflowY !== 'visible'
  }

  private getParents(tooltipWrapper: HTMLElement): HTMLElement[] {
    let currentElement: HTMLElement | null = tooltipWrapper
    const parents: HTMLElement[] = []

    while (currentElement && currentElement.parentElement) {
      currentElement = currentElement.parentElement
      if (currentElement !== document.body && currentElement !== document.documentElement) {
        parents.unshift(currentElement)
      } else {
        break
      }
    }

    return parents
  }

  private setWidth(tooltipEl: HTMLElement): void {
    tooltipEl.style.width = 'max-content'
    const WCAGReflowCriterion = 320 // WCAG 2.1, Criterion 1.4.10 "Reflow"
    const accessibleMaxWidth = WCAGReflowCriterion - MIN_MARGIN * 2

    if (parseInt(window.getComputedStyle(tooltipEl).width) > accessibleMaxWidth) {
      tooltipEl.style.width = accessibleMaxWidth + 'px'
    }

    const screenMaxWidth = document.body.getBoundingClientRect().width - MIN_MARGIN * 2
    if (parseInt(window.getComputedStyle(tooltipEl).width) > screenMaxWidth) {
      tooltipEl.style.width = screenMaxWidth + 'px'
    }
  }

  private placeAboveOrBelow(
    tooltipWrapper: HTMLElement,
    tooltipTarget: HTMLElement,
    tooltipEl: HTMLElement,
  ): void {
    let spaceAbove = tooltipTarget.getBoundingClientRect().top
    const bodyTop = document.body.getBoundingClientRect().top
    if (bodyTop > 0) {
      spaceAbove = tooltipTarget.getBoundingClientRect().top - bodyTop
    }

    let spaceBelow = window.innerHeight - tooltipTarget.getBoundingClientRect().bottom
    const bodyBottom = document.body.getBoundingClientRect().bottom
    if (bodyBottom < window.innerHeight) {
      spaceBelow = bodyBottom - tooltipTarget.getBoundingClientRect().bottom
    }

    const height =
      tooltipEl.getBoundingClientRect().height + ARROW_DISTANCE_TO_TARGET + ARROW_HEIGHT
    let placement = 'above' // Default

    if (
      (tooltipWrapper.dataset.position === 'below' && spaceBelow >= height) ||
      height > spaceAbove
    ) {
      placement = 'below'
    }

    if (placement === 'above') {
      tooltipWrapper.classList.add('place-above')
      tooltipWrapper.classList.remove('place-below')
    } else {
      tooltipWrapper.classList.add('place-below')
      tooltipWrapper.classList.remove('place-above')
    }
  }

  private setLeft(
    tooltipWrapper: HTMLElement,
    tooltipTarget: HTMLElement,
    tooltipEl: HTMLElement,
  ): void {
    const tooltipTargetRect = tooltipTarget.getBoundingClientRect()
    const tooltipRect = tooltipEl.getBoundingClientRect()

    if (tooltipWrapper.dataset.forceVisible === 'true') {
      // Tooltip with position: fixed
      const left = tooltipTargetRect.left + (tooltipTargetRect.width - tooltipRect.width) / 2
      tooltipEl.style.left = Math.round(left) + 'px'
      tooltipEl.style.position = 'fixed'

      tooltipEl.classList.remove('open-right', 'open-left')
      const ARROW_BORDER_DISTANCE = 21

      if (left < MIN_MARGIN) {
        const adjustedLeft =
          tooltipTargetRect.left - ARROW_BORDER_DISTANCE + tooltipTargetRect.width / 2
        tooltipEl.style.left = adjustedLeft + 'px'
        tooltipEl.classList.add('open-right')

        if (document.body.clientWidth - tooltipEl.getBoundingClientRect().right - MIN_MARGIN < 0) {
          const newWidth =
            document.body.clientWidth - tooltipEl.getBoundingClientRect().left - MIN_MARGIN
          tooltipEl.style.width = newWidth + 'px'
        }
      } else if (
        tooltipTargetRect.left + tooltipTargetRect.width / 2 + tooltipRect.width / 2 >
        document.body.clientWidth - MIN_MARGIN
      ) {
        const adjustedLeft =
          tooltipTargetRect.right +
          ARROW_BORDER_DISTANCE -
          tooltipRect.width -
          tooltipTargetRect.width / 2
        tooltipEl.style.left = adjustedLeft + 'px'
        tooltipEl.classList.add('open-left')

        if (tooltipEl.getBoundingClientRect().left < MIN_MARGIN) {
          const newWidth = tooltipEl.getBoundingClientRect().right - MIN_MARGIN
          tooltipEl.style.width = newWidth + 'px'
          tooltipEl.style.left = MIN_MARGIN + 'px'
        }
      }
    } else {
      // Tooltip with position: absolute
      const left = (tooltipTargetRect.width - tooltipRect.width) / 2
      tooltipEl.style.left = Math.round(left) + 'px'
      tooltipEl.style.position = 'absolute'

      const bodyRect = document.body.getBoundingClientRect()

      if (tooltipEl.getBoundingClientRect().left < bodyRect.left + MIN_MARGIN) {
        const pixelsExceeded = bodyRect.left + MIN_MARGIN - tooltipEl.getBoundingClientRect().left
        const adjustedLeft = pixelsExceeded + left
        tooltipEl.style.left = Math.round(adjustedLeft) + 'px'
      } else if (tooltipEl.getBoundingClientRect().right > bodyRect.right - MIN_MARGIN) {
        const pixelsExceeded = bodyRect.right - MIN_MARGIN - tooltipEl.getBoundingClientRect().right
        const adjustedLeft = pixelsExceeded + left
        tooltipEl.style.left = Math.round(adjustedLeft) + 'px'
      }
    }
  }

  private setTop(
    tooltipWrapper: HTMLElement,
    tooltipTarget: HTMLElement,
    tooltipEl: HTMLElement,
  ): void {
    const arrowAdjustment = 1 // Between 0 and ARROW_HEIGHT
    const spaceNeededForEntireTooltip =
      tooltipEl.getBoundingClientRect().height +
      ARROW_HEIGHT +
      ARROW_DISTANCE_TO_TARGET -
      arrowAdjustment
    const spaceNeededForTooltipArrow = ARROW_HEIGHT + ARROW_DISTANCE_TO_TARGET - arrowAdjustment

    let aboveTopValue = 0 - spaceNeededForEntireTooltip
    let belowTopValue = tooltipTarget.getBoundingClientRect().height + spaceNeededForTooltipArrow

    if (tooltipWrapper.dataset.forceVisible === 'true') {
      aboveTopValue = tooltipTarget.getBoundingClientRect().top - spaceNeededForEntireTooltip
      belowTopValue = tooltipTarget.getBoundingClientRect().bottom + spaceNeededForTooltipArrow
    }

    if (tooltipWrapper.classList.contains('place-above')) {
      tooltipEl.style.top = aboveTopValue + 'px'
    } else if (tooltipWrapper.classList.contains('place-below')) {
      tooltipEl.style.top = belowTopValue + 'px'
    }
  }
}

function closeAllTooltips(event: Event): void {
  const mouseEvent = event as MouseEvent

  for (const tooltip of createdTooltips) {
    const target = tooltip.target
    const tooltipEl = tooltip.tooltip
    const targetRect = target.getBoundingClientRect()
    const tooltipRect = tooltipEl.getBoundingClientRect()

    const clickedOnTarget =
      targetRect.left <= mouseEvent.clientX &&
      mouseEvent.clientX <= targetRect.right &&
      targetRect.top <= mouseEvent.clientY &&
      mouseEvent.clientY <= targetRect.bottom

    const clickedOnTooltip =
      window.getComputedStyle(tooltipEl).display !== 'none' &&
      tooltipRect.left <= mouseEvent.clientX &&
      mouseEvent.clientX <= tooltipRect.right &&
      tooltipRect.top <= mouseEvent.clientY &&
      mouseEvent.clientY <= tooltipRect.bottom

    if (!clickedOnTarget && target !== document.activeElement && !clickedOnTooltip) {
      tooltip.hideTooltip()
    } else if (event.type === 'beforeprint') {
      tooltip.hideTooltip()
    }
  }
}

function closeOnKey(e: Event): void {
  const keyEvent = e as KeyboardEvent
  const key = keyEvent.key

  if (key === 'Tab') {
    for (const tooltip of createdTooltips) {
      if (document.activeElement !== tooltip.target && tooltip.isShowing()) {
        tooltip.hideTooltip()
      }
    }
  } else if (key === 'Escape') {
    let tooltipClosed = false

    for (const tooltip of createdTooltips) {
      if (tooltip.isShowing()) {
        tooltip.hideTooltip()
        tooltipClosed = true
      }
    }

    if (tooltipClosed) {
      e.stopImmediatePropagation()
    }
  }
}

// Clean up all tooltips
export function destroyAllTooltips(): void {
  const tooltipsCopy = [...createdTooltips]
  for (const tooltip of tooltipsCopy) {
    tooltip.destroy()
  }
  createdTooltips = []
}

export default Tooltip
