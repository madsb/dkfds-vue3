<template>
  <div class="about">
    <div class="container page-container">
      <h1>Om DKFDS-Vue3</h1>
      <p class="font-lead">
        DKFDS-Vue3 er en Vue 3 implementation af Det Fælles Designsystem version 11, udviklet for at
        sikre konsistent brugeroplevelse og tilgængelighed på tværs af danske digitale
        selvbetjeningsløsninger.
      </p>

      <fds-alert variant="info" class="mt-6 mb-6">
        <template #heading>Open Source</template>
        Dette bibliotek er open source og vedligeholdes af fællesskabet. Alle bidrag er velkomne -
        fra fejlrapporter til nye funktioner.
      </fds-alert>

      <div class="row">
        <div class="col-12 col-lg-6">
          <fds-card class="h-100">
            <template #header>
              <h2 class="h4 mt-0">Bidrag til projektet</h2>
            </template>
            <template #content>
              <p>
                Har du fundet en fejl eller har du en idé til en forbedring? Vi værdsætter alle
                former for feedback og bidrag.
              </p>
              <fds-button
                variant="secondary"
                href="https://github.com/madsb/dkfds-vue3/issues"
                target="_blank"
                class="mt-4"
              >
                <fds-ikon icon="open-in-new" size="sm" class="mr-2" />
                Opret issue på GitHub
              </fds-button>
            </template>
          </fds-card>
        </div>

        <div class="col-12 col-lg-6">
          <fds-card class="h-100">
            <template #header>
              <h2 class="h4 mt-0">Udvikling</h2>
            </template>
            <template #content>
              <p>
                Vil du bidrage med kode? Fork repositoriet, lav dine ændringer og opret et pull
                request. Vi gennemgår alle bidrag og giver feedback.
              </p>
              <fds-button
                variant="secondary"
                href="https://github.com/madsb/dkfds-vue3"
                target="_blank"
                class="mt-4"
              >
                <fds-ikon icon="open-in-new" size="sm" class="mr-2" />
                Se koden på GitHub
              </fds-button>
            </template>
          </fds-card>
        </div>
      </div>

      <h2 class="mt-8">Teknisk information</h2>
      <fds-list>
        <fds-list-item> <strong>Framework:</strong> Vue 3 med Composition API </fds-list-item>
        <fds-list-item>
          <strong>TypeScript:</strong> Fuld type support for alle komponenter
        </fds-list-item>
        <fds-list-item> <strong>DKFDS Version:</strong> Version 11 (seneste) </fds-list-item>
        <fds-list-item> <strong>Tilgængelighed:</strong> WCAG 2.1 AA standard </fds-list-item>
        <fds-list-item>
          <strong>Bundle størrelse:</strong> Tree-shakeable for optimal performance
        </fds-list-item>
      </fds-list>

      <h2 class="mt-8">Licens</h2>
      <p>
        DKFDS-Vue3 er udgivet under MIT licensen og kan frit bruges i både kommercielle og
        ikke-kommercielle projekter.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FdsAlert, FdsButton, FdsCard, FdsList, FdsListItem, FdsIkon } from '@madsb/dkfds-vue3'
</script>
