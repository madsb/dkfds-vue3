<template>
  <fds-icon-collection />

  <header class="header">
    <div id="top"></div>
    <a class="skipnav" href="#main-content">Gå til sidens indhold</a>
    <!-- Start: Portal header -->
    <div class="portal-info">
      <div class="portal-info-inner container">
        <!-- Start: Portallogo -->
        <a href="#" title="Gå til Portalnavns forside" aria-label="Portalnavn" class="logo">
          <span>Portalnavn</span>
        </a>
        <!-- Slut: Portallogo -->

        <button
          class="function-link button-menu-open js-menu-open ml-auto d-print-none"
          aria-haspopup="dialog"
        >
          <svg class="icon-svg" focusable="false" aria-hidden="true"><use href="#menu"></use></svg>
          Menu
        </button>

        <!-- Start: Persondetaljer -->
        <div class="portal-user">
          <p class="user">
            <span class="username weight-semibold">Anders Andersen</span>, Forsikringens
            Forsikringsfirma
          </p>

          <button class="function-link d-print-none log-off">Log af</button>
        </div>
        <!-- Slut: Persondetaljer -->
      </div>
    </div>
    <!-- Slut: Portal header -->

    <!-- Start: Løsningsheader -->
    <div class="solution-info">
      <div class="container solution-info-inner">
        <div class="solution-heading dv3-gra">
          <a href="#"> DKFDS-Vue3 et Komponent bibliotek til DKFDS </a>
        </div>

        <!--2B: Solution header: Authority name + text -->
        <div class="additional-info">
          <p class="h5 authority-name">Myndighedsnavn</p>
          <p>
            Support: 12 34 56 78
            <span class="d-print-none"
              >·
              <a href="#" class="icon-link function-link alert-leave"
                >Kontakt<svg class="icon-svg" aria-hidden="true" focusable="false">
                  <use href="#open-in-new"></use>
                </svg>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- Slut: Løsningsheader -->

    <!-- Start: Navigation -->
    <top-navigation />
    <div class="overlay"></div>
    <div class="mobile-drawer" role="dialog" aria-modal="true" aria-labelledby="menu-heading">
      <div class="menu-top">
        <h2 id="menu-heading" class="menu-heading">Menu</h2>
        <button class="function-link button-menu-close js-menu-close" aria-label="Luk menu">
          <svg class="icon-svg" focusable="false" aria-hidden="true"><use href="#close"></use></svg
          >Luk
        </button>
      </div>

      <nav class="navigation-menu-mobile" aria-label="Hovedmenu">
        <ul class="mainmenu">
          <li :class="[{ current: isPartOfMenu('forside') }]">
            <a href="#" class="nav-link" @click.prevent="navigateTo('forside')">
              <span>Forside</span>
            </a>
          </li>
          <li :class="[{ current: isPartOfMenu('komponenter') }]">
            <a href="#" class="nav-link" @click.prevent="navigateTo('komponenter')">
              <span>Komponenter</span>
            </a>
          </li>
          <li :class="[{ current: isPartOfMenu('ekstrakomponenter') }]">
            <a href="#" class="nav-link" @click.prevent="navigateTo('ekstrakomponenter')">
              <span>Ekstra Komponenter</span>
            </a>
          </li>
          <li :class="[{ current: isPartOfMenu('boblere') }]">
            <a href="#" class="nav-link" @click.prevent="navigateTo('boblere')">
              <span>Boblere</span>
            </a>
          </li>
          <li :class="[{ current: isPartOfMenu('anbefalinger') }]">
            <a href="#" class="nav-link" @click.prevent="navigateTo('anbefalinger')">
              <span>Anbefalinger</span>
            </a>
          </li>
          <li :class="[{ current: isPartOfMenu('about') }]">
            <a href="#" class="nav-link" @click.prevent="navigateTo('about')">
              <span>Fællesskab</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="solution-info-mobile">
        <h3 class="sr-only">Myndighed</h3>

        <p class="mb-2"><strong class="authority-name">Myndighedsnavn</strong></p>

        <p>Support: 12 34 56 78</p>
      </div>

      <div class="portal-info-mobile">
        <h3 class="sr-only">Bruger</h3>

        <p class="user">
          <span class="mb-3">Anders Andersen</span>
          <span>Forsikringens Forsikringsfirma</span>
        </p>

        <p>
          <button class="function-link d-print-none log-off">
            <svg class="icon-svg" focusable="false" aria-hidden="true"><use href="#lock"></use></svg
            >Log af
          </button>
        </p>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <fds-til-top />

    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-3 footer-col">
            <section>
              <div class="align-text-left">
                <h2 class="h5 mb-4">Ansvarlig myndighed</h2>

                <ul class="unstyled-list">
                  <li class="">
                    <img
                      src="https://placehold.co/150x100/0059B3/FFFFFF"
                      class="logo"
                      alt="Logostyrelsen"
                    />
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div class="col-12 col-sm-12 col-md-3 footer-col">
            <section>
              <div class="align-text-left">
                <h2 class="h5 mb-4">Kontakt</h2>

                <ul class="mt-0 nobullet-list">
                  <li class="">
                    <a class="function-link" href="mailto:support@myndighed.dk">
                      support@myndighed.dk
                    </a>
                  </li>

                  <li class="">
                    <a class="function-link" href="tel:004512345678"> (+45) 12 34 56 78 </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div class="col-12 col-sm-12 col-md-3 footer-col d-print-none">
            <section>
              <div class="align-text-left">
                <h2 class="h5 mb-4">Links</h2>

                <ul class="mt-0 nobullet-list">
                  <li class="">
                    <a class="function-link" href="#"> Læs lidt om dit </a>
                  </li>

                  <li class="">
                    <a class="function-link" href="#"> Her er også lidt om dat </a>
                  </li>

                  <li class="">
                    <a class="function-link icon-link" href="#">
                      Eller måske er du interesseret i noget helt andet, som tager mange linjer at
                      forklare
                      <svg class="icon-svg" focusable="&gt;false" aria-hidden="true">
                        <use href="#open-in-new"></use>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div class="col-12 col-sm-12 col-md-3 footer-col d-print-none">
            <section>
              <div class="align-text-left">
                <h2 class="h5 mb-4">Webtilgængelighed og cookies</h2>

                <ul class="mt-0 nobullet-list">
                  <li class="">
                    <a href="#" class="function-link icon-link">
                      Tilgængelighedserklæring
                      <svg class="icon-svg" focusable="&gt;false" aria-hidden="true">
                        <use href="#open-in-new"></use>
                      </svg>
                    </a>
                  </li>
                  <li class="">
                    <a class="function-link" href="#"> Privatlivspolitik (cookies) </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { navigation } from 'dkfds-vue3/utils';

const route = useRoute();
const router = useRouter();

// Initialize navigation on mount
onMounted(() => {
  new navigation().init();
});

// Check if current route matches menu item
const isPartOfMenu = (name: string): boolean => {
  if (route) {
    const [parent] = route.matched;

    if (parent && parent.name === name) {
      return true;
    }
    if (route.name) {
      return route.name === name;
    }
  }

  return false;
};

// Navigate to route and close mobile menu
const navigateTo = (name: string) => {
  router.push({ name });
  // The navigation script will automatically close the menu when a link is clicked
};
</script>

<style lang="scss">
@use 'assets/dkfds-integration';
</style>
