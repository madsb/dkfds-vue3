<template>
  <section>
    <div class="bg-alternative py-9">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-7">
            <h1 class="dv3-gra tagline">DKFDS-Vue3</h1>
            <p class="font-lead">Vue 3 Komponent bibliotek til "Det Fælles Designsystem"</p>
            <fds-alert variant="info">
              <template #heading>DKFDS Version 11</template>
              Dette bibliotek er bygget på den nyeste version 11 af Det Fælles Designsystem med fuld
              understøttelse af alle komponenter og designmønstre.
            </fds-alert>
            <ul class="nobullet-list">
              <li>
                <a href="https://designsystem.dk/" target="designsystem" class="icon-link bold-link"
                  >Det Fælles Designsystem<svg
                    class="icon-svg"
                    focusable="false"
                    aria-hidden="true"
                    tabindex="-1"
                  >
                    <use href="#open-in-new"></use></svg
                ></a>
              </li>
              <li>
                <a
                  href="https://github.com/madsb/dkfds-vue3"
                  target="github"
                  class="icon-link bold-link"
                  >DKFDS-Vue3 på Github<svg
                    class="icon-svg"
                    focusable="false"
                    aria-hidden="true"
                    tabindex="-1"
                  >
                    <use href="#open-in-new"></use></svg
                ></a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-5 align-text-center">
            <img
              id="designsystem-illustration"
              src="https://placehold.co/250x200/0059B3/FFFFFF"
              alt=""
              class="d-none d-lg-inline-block"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row py-9">
        <div class="col-12 col-lg-6">
          <h2 class="mt-0">Komponenter</h2>
          <p>
            Komponenterne er byggeklodserne, som du kan bruge til at bygge den løsning dine brugere
            har behov for.
          </p>
          <fds-list class="mt-5">
            <fds-list-item>✅ 40+ færdige Vue 3 komponenter</fds-list-item>
            <fds-list-item>✅ Fuld TypeScript understøttelse</fds-list-item>
            <fds-list-item>✅ WCAG 2.1 AA tilgængelighed</fds-list-item>
            <fds-list-item>✅ Tree-shakeable for optimal bundle size</fds-list-item>
          </fds-list>
          <p class="mt-5">
            <fds-button variant="primary" @click="$router.push({ name: 'komponenter' })">
              Se alle komponenter
            </fds-button>
          </p>
        </div>
        <div class="col-12 col-lg-6">
          <h2 class="mt-0">Implementering</h2>
          <fds-card>
            <template #header>
              <h3 class="h4">Kom hurtigt i gang</h3>
            </template>
            <template #content>
              <p>Installer biblioteket med npm eller pnpm:</p>
              <fds-pre>npm install @madsb/dkfds-vue3</fds-pre>
              <p class="mt-4">Importer i din Vue 3 app:</p>
              <fds-pre>import { FdsButton, FdsInput } from '@madsb/dkfds-vue3'</fds-pre>
            </template>
          </fds-card>
          <p class="mt-5">
            <fds-button
              variant="secondary"
              href="https://github.com/madsb/dkfds-vue3"
              target="_blank"
            >
              <fds-ikon icon="open-in-new" size="sm" class="mr-2" />
              Se på GitHub
            </fds-button>
          </p>
        </div>
      </div>

      <div class="row py-9 border-top">
        <div class="col-12">
          <h2>Hvorfor DKFDS-Vue3?</h2>
        </div>
        <div class="col-12 col-lg-4">
          <div class="mt-5">
            <fds-badge size="large" variant="success">v11</fds-badge>
            <h3 class="mt-3">Nyeste DKFDS Version</h3>
            <p>
              Bygget på DKFDS version 11 med alle de nyeste komponenter, designmønstre og
              tilgængelighedsforbedringer.
            </p>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="mt-5">
            <fds-badge size="large" variant="info">Vue 3</fds-badge>
            <h3 class="mt-3">Moderne Vue</h3>
            <p>
              Udnytter Vue 3's Composition API, bedre performance og TypeScript integration for
              optimal udvikleroplevelse.
            </p>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="mt-5">
            <fds-badge size="large" variant="warning">A11y</fds-badge>
            <h3 class="mt-3">Tilgængelig</h3>
            <p>
              Alle komponenter følger WCAG 2.1 AA standarder og er testet for tilgængelighed med
              skærmlæsere.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  FdsAlert,
  FdsButton,
  FdsCard,
  FdsBadge,
  FdsList,
  FdsListItem,
  FdsPre,
  FdsIkon,
} from '@madsb/dkfds-vue3'
</script>
<style lang="scss" scoped></style>
