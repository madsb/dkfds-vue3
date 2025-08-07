<template>
  <section>
    <fds-preview header="Badges" href="https://designsystem.dk/komponenter/badges/">
      <fds-preview-item>
        <h3 class="h5">Varianter</h3>
        <p>
          <fds-badge class="mx-2" variant="success">Success</fds-badge>
          <fds-badge class="mx-2" variant="info">Info</fds-badge>
          <fds-badge class="mx-2" variant="warning">Warning</fds-badge>
          <fds-badge class="mx-2" variant="error">Error</fds-badge>
        </p>

        <h3 class="h5 mt-6">HTML tags</h3>
        <p>
          Badges kan renderes som enten <code>&lt;span&gt;</code> eller
          <code>&lt;strong&gt;</code> elementer:
        </p>
        <p>
          <fds-badge class="mr-4" variant="info">Normal (span)</fds-badge>
          <fds-badge tag="strong" variant="success">Vigtigt (strong)</fds-badge>
        </p>

        <h3 class="h5 mt-6">Eksempler på brug</h3>
        <div class="mt-4">
          <h4>
            Ny funktionalitet
            <fds-badge tag="strong" variant="success">NY</fds-badge>
          </h4>
          <p>Brug badges til at fremhæve nyt eller vigtigt indhold.</p>
        </div>

        <div class="mt-4">
          <table class="table table--compact">
            <thead>
              <tr>
                <th>Bruger</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Anna Nielsen</td>
                <td><fds-badge variant="success">Aktiv</fds-badge></td>
              </tr>
              <tr>
                <td>Lars Hansen</td>
                <td><fds-badge variant="warning">Inaktiv</fds-badge></td>
              </tr>
              <tr>
                <td>Maria Jensen</td>
                <td><fds-badge variant="error">Blokeret</fds-badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Props</h3>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Props</th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tag</code></td>
              <td><code>'span' | 'strong'</code></td>
              <td><code>'span'</code></td>
              <td>HTML element som badge renderes som. Brug 'strong' for vigtigt indhold.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'small' | 'large'</code></td>
              <td><code>'large'</code></td>
              <td>Størrelse på badge</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'success' | 'info' | 'warning' | 'error' | null</code></td>
              <td><code>null</code></td>
              <td>Farvevariant baseret på status eller vigtighed</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-6">Anvendelse</h3>
        <ul>
          <li>Brug badges til at fremhæve nyt eller vigtigt indhold</li>
          <li>Undgå at bruge badges som kan forveksles med knapper</li>
          <li>Brug ikke for mange badges - kun når det virkelig er meningsfuldt</li>
          <li>Brug genkendelige ord/termer som brugerne forstår</li>
          <li>Brug <code>tag="strong"</code> når indholdet er særligt vigtigt</li>
        </ul>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
const code = `<!-- Størrelser -->
<fds-badge>Normal (large)</fds-badge>
<fds-badge size="small">Small</fds-badge>

<!-- Varianter -->
<fds-badge variant="success">Success</fds-badge>
<fds-badge variant="info">Info</fds-badge>
<fds-badge variant="warning">Warning</fds-badge>
<fds-badge variant="error">Error</fds-badge>

<!-- HTML tags -->
<fds-badge>Normal (span)</fds-badge>
<fds-badge tag="strong" variant="success">Vigtigt (strong)</fds-badge>

<!-- Eksempel med alle props -->
<fds-badge tag="strong" size="small" variant="success">NY</fds-badge>`
</script>
