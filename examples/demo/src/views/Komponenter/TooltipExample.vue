<template>
  <section>
    <fds-preview header="Eksempel" href="https://designsystem.dk/komponenter/tooltip/">
      <fds-preview-item>
        <h3>Standard tooltip (click trigger)</h3>
        <p>Click trigger er standard og mest tilgængelig:</p>
        <fds-tooltip content="Dette er en hjælpetekst som vises ved klik" />
      </fds-preview-item>

      <fds-preview-item>
        <h3>Hover tooltip</h3>
        <p>Hover trigger bruges primært til ikoner uden tekst:</p>
        <fds-tooltip trigger="hover" content="Hjælpetekst vises ved hover" />
      </fds-preview-item>

      <fds-preview-item>
        <h3>Forskellige positioner</h3>
        <p>Tooltip kan placeres over eller under ikonet:</p>
        <div class="d-flex gap-4 align-items-center flex-wrap">
          <span>Over:</span>
          <fds-tooltip position="above" content="Tooltip placeret over ikonet" />
          <span>Under:</span>
          <fds-tooltip position="below" content="Tooltip placeret under ikonet" />
        </div>
      </fds-preview-item>

      <fds-preview-item>
        <h3>Trigger typer</h3>
        <p>Sammenlign click og hover triggers:</p>
        <div class="d-flex gap-4 align-items-center flex-wrap">
          <span>Click (anbefalet):</span>
          <fds-tooltip trigger="click" content="Åbnes ved klik, lukkes ved klik udenfor" />
          <span>Hover:</span>
          <fds-tooltip trigger="hover" content="Vises ved hover med 300ms forsinkelse" />
        </div>
      </fds-preview-item>

      <fds-preview-item>
        <h3>Forskellige ikoner</h3>
        <p>Tooltip kan bruge forskellige ikoner:</p>
        <div class="d-flex gap-4 align-items-center flex-wrap">
          <span>Help:</span>
          <fds-tooltip icon="help" content="Standard hjælp ikon" />
          <span>Info:</span>
          <fds-tooltip icon="info" content="Info ikon" />
          <span>Warning:</span>
          <fds-tooltip icon="warning" content="Advarsel ikon" />
        </div>
      </fds-preview-item>

      <fds-preview-item>
        <h3>Tilgængelighed</h3>
        <p>Tooltip med custom aria-label:</p>
        <fds-tooltip 
          aria-label="Åbn detaljeret hjælp"
          content="Detaljeret hjælpetekst"
        />
        <p class="mt-4">For ikoner uden tekst (hover tooltip med isLabel):</p>
        <fds-tooltip 
          trigger="hover"
          :is-label="true"
          content="Slet"
          icon="delete"
        />
      </fds-preview-item>

      <fds-preview-item>
        <h3>Deaktiveret tooltip</h3>
        <p>Tooltip kan deaktiveres:</p>
        <fds-tooltip 
          :disabled="true" 
          content="Denne tooltip er deaktiveret"
        />
      </fds-preview-item>

      <fds-preview-item>
        <h3>Force visible (til komplekse layouts)</h3>
        <p>Tooltip med force-visible for modaler og overflow containere:</p>
        <fds-tooltip 
          :force-visible="true"
          content="Special positionering for komplekse layouts"
        />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
const code = `
<!-- Standard tooltip (click trigger - anbefalet) -->
<fds-tooltip content="Dette er en hjælpetekst som vises ved klik" />

<!-- Hover tooltip (til ikoner uden tekst) -->
<fds-tooltip trigger="hover" content="Hjælpetekst vises ved hover" />

<!-- Forskellige positioner -->
<fds-tooltip position="above" content="Tooltip placeret over ikonet" />
<fds-tooltip position="below" content="Tooltip placeret under ikonet" />

<!-- Forskellige ikoner -->
<fds-tooltip icon="help" content="Standard hjælp ikon" />
<fds-tooltip icon="info" content="Info ikon" />
<fds-tooltip icon="warning" content="Advarsel ikon" />

<!-- Tilgængelighed - custom aria-label -->
<fds-tooltip 
  aria-label="Åbn detaljeret hjælp"
  content="Detaljeret hjælpetekst"
/>

<!-- Ikon uden tekst (isLabel for korrekt ARIA) -->
<fds-tooltip 
  trigger="hover"
  :is-label="true"
  content="Slet"
  icon="delete"
/>

<!-- Deaktiveret tooltip -->
<fds-tooltip 
  :disabled="true" 
  content="Denne tooltip er deaktiveret"
/>

<!-- Force visible (til komplekse layouts) -->
<fds-tooltip 
  :force-visible="true"
  content="Special positionering for komplekse layouts"
/>
`
</script>
