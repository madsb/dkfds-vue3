import DKFDSDropdown from './dropdown'

const MOBILE_DRAWER = '.mobile-drawer'
const NAV_LINKS = '.navigation-menu-mobile a'
const MODALS = '[data-module="modal"]'
const OPENERS = '.js-menu-open'
const CLOSE_BUTTON = '.js-menu-close'
const OVERLAY = '.overlay'
const CLOSERS = `${CLOSE_BUTTON}, .overlay`
const TOGGLES = [MOBILE_DRAWER, OVERLAY].join(', ')

const ACTIVE_CLASS = 'mobile-nav-active'
const VISIBLE_CLASS = 'is-visible'

// Utility functions
const select = (selector: string, context: Element | Document = document): HTMLElement[] => {
  if (typeof selector !== 'string') return []
  const selection = context.querySelectorAll<HTMLElement>(selector)
  return Array.from(selection)
}

let focusTrap: {
  enable(): void
  release(): void
}

/**
 * Add mobile menu functionality
 */
class Navigation {
  private observer: MutationObserver | null = null
  private resizeHandler: (() => void) | null = null
  private mobileMenuHandler: (() => void) | null = null

  /**
   * Check if mobile menu is active
   * @returns true if mobile menu is active and false if not active
   */
  static isActive = () => document.body.classList.contains(ACTIVE_CLASS)

  /**
   * Trap focus in mobile menu if active
   * @param {HTMLElement} trapContainer
   */
  static focusTrapInit(trapContainer: HTMLElement) {
    // Find all focusable children
    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    const focusableElements = trapContainer.querySelectorAll<HTMLElement>(focusableElementsString)
    const [firstTabStop] = focusableElements as unknown as any[]

    function trapTabKey(e: KeyboardEvent) {
      const { key } = e
      // Check for TAB key press
      if (key === 'Tab') {
        let lastTabStop = null
        for (let i = 0; i < focusableElements.length; i += 1) {
          const number = focusableElements.length - 1
          const element = focusableElements[number - i]
          if (element.offsetWidth > 0 && element.offsetHeight > 0) {
            lastTabStop = element
            break
          }
        }

        // SHIFT + TAB
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault()
            lastTabStop?.focus()
          }

          // TAB
        } else if (document.activeElement === lastTabStop) {
          e.preventDefault()
          firstTabStop.focus()
        }
      }

      // ESCAPE
      if (e.key === 'Escape') {
        Navigation.toggleNav(false)
      }
    }

    return {
      enable() {
        // Focus first child
        firstTabStop.focus()
        // Listen for and trap the keyboard
        document.addEventListener('keydown', trapTabKey)
      },

      release() {
        document.removeEventListener('keydown', trapTabKey)
      },
    }
  }

  static toggleNav(incActive: boolean | Event) {
    const { body } = document

    const active: boolean = typeof incActive === 'boolean' ? incActive : !Navigation.isActive()

    body.classList.toggle(ACTIVE_CLASS, active)

    select(TOGGLES).forEach((el) => {
      el.classList.toggle(VISIBLE_CLASS, active)
    })

    if (active) {
      focusTrap.enable()
    } else {
      focusTrap.release()
    }

    const closeButton = body.querySelector<HTMLElement>(CLOSE_BUTTON)
    const menuButton = body.querySelector<HTMLElement>(OPENERS)

    if (active && closeButton) {
      // The mobile nav was just activated, so focus on the close button,
      // which is just before all the nav elements in the tab order.
      closeButton.focus()
    } else if (!active && menuButton) {
      // The mobile nav was just deactivated, and focus was on the close
      // button, which is no longer visible. We don't want the focus to
      // disappear into the void, so focus on the menu button if it's
      // visible (this may have been what the user was just focused on,
      // if they triggered the mobile nav by mistake).
      menuButton.focus()
    }

    return active
  }

  /**
   * Add functionality to mobile menu
   */
  mobileMenu() {
    let mobile = false

    // Find all menu buttons on page and add toggleNav function
    const openers = document.querySelectorAll<HTMLElement>(OPENERS)
    for (let o = 0; o < openers.length; o += 1) {
      if (window.getComputedStyle(openers[o], null).display !== 'none') {
        openers[o].addEventListener('click', Navigation.toggleNav)
        mobile = true
      }
    }

    // if mobile
    if (mobile) {
      // Add click listeners to all close elements (e.g. close button and overlay)
      const closers = document.querySelectorAll<HTMLElement>(CLOSERS)
      for (let c = 0; c < closers.length; c += 1) {
        closers[c].addEventListener('click', Navigation.toggleNav)
      }

      const navLinks = document.querySelectorAll(NAV_LINKS)
      for (let n = 0; n < navLinks.length; n += 1) {
        navLinks[n].addEventListener('click', () => {
          // If a navigation link is clicked inside the mobile menu, ensure that the menu gets hidden
          if (Navigation.isActive()) {
            Navigation.toggleNav(false)
          }
        })
      }

      const modals = document.querySelectorAll(MODALS)
      for (let m = 0; m < modals.length; m += 1) {
        // All modals should close the mobile menu
        modals[m].addEventListener('click', () => {
          if (Navigation.isActive()) {
            Navigation.toggleNav(false)
          }
        })
      }

      const trapContainers = document.querySelectorAll<HTMLElement>(MOBILE_DRAWER)
      for (let i = 0; i < trapContainers.length; i += 1) {
        focusTrap = Navigation.focusTrapInit(trapContainers[i])
      }
    }

    const closer = document.body.querySelector(CLOSE_BUTTON)

    if (Navigation.isActive() && closer && closer.getBoundingClientRect().width === 0) {
      // The mobile nav is active, but the close box isn't visible, which
      // means the user's viewport has been resized so that it is no longer
      // in mobile mode. Let's make the page state consistent by
      // deactivating the mobile nav.
      Navigation.toggleNav.call(closer, false)
    }
  }

  /**
   * Set events
   */
  init() {
    this.mobileMenuHandler = () => this.mobileMenu()
    window.addEventListener('resize', this.mobileMenuHandler, false)
    this.mobileMenu()

    if (document.querySelectorAll('.navigation-menu .mainmenu').length > 0) {
      /* Add an invisible more button to the main menu navigation on desktop */
      this.createMoreMenu()

      /* Sometimes, it's possible to correctly calculate the width of the menu items
         very early during page load - if it fails, all widths are the same. If possible,
         update the more menu as soon as possible for a better user experience. */
      const widths: number[] = []
      const mainMenuItems = document.querySelectorAll<HTMLElement>(
        '.navigation-menu .mainmenu > li',
      )
      for (let i = 0; i < mainMenuItems.length - 1; i += 1) {
        const w = this.getVisibleWidth(mainMenuItems[i])
        widths.push(w)
      }
      const allWidthsEqual = new Set(widths).size === 1 // The same value can't appear twice in a Set. If the size is 1, all widths in the array were equal.
      if (!allWidthsEqual) {
        this.updateMoreMenu()
      }

      /* Update more menu on window resize */
      this.resizeHandler = () => this.updateMoreMenu()
      window.addEventListener('resize', this.resizeHandler, false)

      // Observe DOM changes to the main menu
      const config = {
        attributes: false,
        attributeOldValue: false,
        characterData: false,
        characterDataOldValue: false,
        childList: true,
        subtree: false,
      }
      const observerTarget = document.querySelector('.navigation-menu .mainmenu')
      if (observerTarget) {
        const callback = () => {
          this.updateMoreMenu()
        }
        this.observer = new MutationObserver(callback)
        this.observer.observe(observerTarget, config)
      }

      /* Ensure the more menu is correctly displayed when all resources have loaded */
      window.addEventListener('load', () => {
        this.updateMoreMenu()
      })

      // If the document is already loaded, fire updateMoreMenu
      if (document.readyState === 'complete') {
        this.updateMoreMenu()
      }
    }
  }

  /**
   * Remove events
   */
  teardown() {
    if (this.mobileMenuHandler) {
      window.removeEventListener('resize', this.mobileMenuHandler, false)
    }

    if (document.getElementsByClassName('mainmenu').length > 0) {
      const moreOption = document.querySelector('.navigation-menu .more-option')
      if (moreOption) {
        moreOption.remove()
      }
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler, false)
      }
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
    }
  }

  private createMoreMenu() {
    const mainMenu = document.querySelector('.navigation-menu .mainmenu')
    if (!mainMenu) return

    const moreMenu = document.createElement('li')
    moreMenu.classList.add('more-option')
    moreMenu.classList.add('d-none')
    moreMenu.innerHTML =
      '<div class="submenu"><button class="more-button button-overflow-menu js-dropdown" data-js-target="fds-more-menu" aria-expanded="false" aria-controls="fds-more-menu"><span>Mere</span></button><div class="overflow-menu-inner collapsed" id="fds-more-menu"><ul class="overflow-list"></ul></div></div>'
    mainMenu.append(moreMenu)

    const moreButton = document.querySelector('.more-button') as HTMLElement
    if (moreButton) {
      new DKFDSDropdown(moreButton).init()
    }
  }

  private updateMoreMenu() {
    const mainMenuItems = document.querySelectorAll<HTMLElement>('.navigation-menu .mainmenu > li')
    const moreMenu = mainMenuItems[mainMenuItems.length - 1]
    const moreMenuList = document.querySelector('.navigation-menu .more-option .overflow-list')

    if (!moreMenuList) return

    /* Calculate available space for main menu items */
    const navigationMenuInner = document.querySelector<HTMLElement>(
      '.navigation-menu .navigation-menu-inner',
    )
    if (!navigationMenuInner) return

    const menuWidth = Math.floor(navigationMenuInner.getBoundingClientRect().width)
    let searchWidth = 0
    let paddingMoreMenu = 0
    const searchElement = document.querySelector<HTMLElement>('.navigation-menu .search')
    if (document.querySelectorAll('.navigation-menu.contains-search').length > 0 && searchElement) {
      searchWidth = this.getVisibleWidth(searchElement)
    } else {
      const moreButton = document.querySelector<HTMLElement>(
        '.navigation-menu .more-option .more-button',
      )
      if (moreButton) {
        paddingMoreMenu = parseInt(window.getComputedStyle(moreButton).paddingRight, 10)
      }
    }
    const containerPadding = parseInt(window.getComputedStyle(navigationMenuInner).paddingRight, 10)
    const availableSpace = menuWidth - searchWidth - containerPadding + paddingMoreMenu

    /* Find the max amount of main menu items, it is possible to show */
    let widthNeeded = 0
    for (let i = 0; i < mainMenuItems.length - 1; i += 1) {
      widthNeeded += this.getVisibleWidth(mainMenuItems[i])
      if (widthNeeded >= availableSpace) {
        break
      }
    }

    if (widthNeeded < availableSpace) {
      /* More menu not needed */
      for (let l = 0; l < mainMenuItems.length - 1; l += 1) {
        mainMenuItems[l].classList.remove('d-none')
      }
      moreMenu.classList.add('d-none')
    } else {
      let widthNeededWithMoreMenu = this.getVisibleWidth(moreMenu)
      moreMenuList.innerHTML = ''
      for (let j = 0; j < mainMenuItems.length - 1; j += 1) {
        widthNeededWithMoreMenu += this.getVisibleWidth(mainMenuItems[j])
        if (widthNeededWithMoreMenu >= availableSpace) {
          mainMenuItems[j].classList.remove('d-none') // Make visible temporarily for cloning to the more menu
          if (mainMenuItems[j].getElementsByClassName('submenu').length > 0) {
            /* The menu items contains subitems */
            const subMenu = document.createElement('li')
            if (mainMenuItems[j].getElementsByClassName('active').length > 0) {
              subMenu.classList.add('active')
            }
            const buttonOverflowMenu = mainMenuItems[j].querySelector('.button-overflow-menu')
            const subMenuTextElement = buttonOverflowMenu?.querySelector('span')
            const subMenuText = subMenuTextElement?.innerText || ''
            subMenu.innerHTML = `<span class="sub-title" aria-hidden="true">${subMenuText}</span><ul aria-label="${subMenuText}"></ul>`
            const subElements = mainMenuItems[j].getElementsByTagName('li')
            const subMenuUl = subMenu.querySelector('ul')
            if (subMenuUl) {
              for (let k = 0; k < subElements.length; k += 1) {
                subMenuUl.append(subElements[k].cloneNode(true))
              }
            }
            moreMenuList.append(subMenu)
          } else {
            /* No subitems - cloning can be done without any issues */
            moreMenuList.append(mainMenuItems[j].cloneNode(true))
          }
          mainMenuItems[j].classList.add('d-none') // Hide once cloning is done
        } else {
          /* There's room for the main menu item - ensure it is visible */
          mainMenuItems[j].classList.remove('d-none')
        }
      }
      moreMenu.classList.remove('d-none')
    }
  }

  /* Get the width of an element, even if the element isn't visible */
  private getVisibleWidth(element: HTMLElement): number {
    let width = 0
    if (element.classList.contains('d-none')) {
      element.classList.remove('d-none')
      width = element.getBoundingClientRect().width
      element.classList.add('d-none')
    } else {
      width = element.getBoundingClientRect().width
    }
    return Math.ceil(width)
  }
}

export default Navigation
