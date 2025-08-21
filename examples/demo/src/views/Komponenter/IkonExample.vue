<template>
  <section>
    <fds-preview header="Ikoner" href="https://designsystem.dk/styleguide/ikoner/">
      <!-- Basic examples -->
      <fds-preview-item>
        <h3>Dekorative ikoner</h3>
        <p><fds-ikon icon="home" /> Hjem</p>
        <p><fds-ikon icon="search" /> Søg</p>
        <p><fds-ikon icon="visibility" /> Vis</p>
        <p><fds-ikon icon="print" /> Print</p>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="basicCode"></pre>
      </fds-preview-code>

      <!-- Inline variant -->
      <fds-preview-item>
        <h3>Inline ikoner</h3>
        <p>Normal ikon: <fds-ikon icon="star" /> justeres ikke til teksthøjde</p>
        <p>Inline ikon: <fds-ikon icon="star" :inline="true" /> justeres til teksthøjde</p>
        <p>Tekst med <fds-ikon icon="info" :inline="true" /> inline ikon i midten af sætningen.</p>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="inlineCode"></pre>
      </fds-preview-code>

      <!-- Accessible icons -->
      <fds-preview-item>
        <h3>Ikoner med betydning (ikke-dekorative)</h3>
        <p>
          <fds-button icon="add" icon-only aria-label="Tilføj element" />
          <fds-button icon="delete" icon-only aria-label="Slet element" />
          <fds-button icon="edit" icon-only aria-label="Rediger element" />
        </p>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="accessibleCode"></pre>
      </fds-preview-code>

      <!-- Props documentation -->
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
              <td><code>icon</code></td>
              <td><code>string</code></td>
              <td><code>'home'</code></td>
              <td>Ikon navn fra Material Design ikoner</td>
            </tr>
            <tr>
              <td><code>inline</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om ikonet skal justeres til teksthøjde</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Aria label for skærmlæsere (hvis ikonet formidler mening)</td>
            </tr>
            <tr>
              <td><code>decorative</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Om ikonet er dekorativt (skjult for skærmlæsere)</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>

      <!-- Usage guidelines -->
      <fds-preview-item>
        <h3>Retningslinjer</h3>
        <ul>
          <li>Ikoner skal supplere tekst, ikke erstatte den</li>
          <li>
            Brug <code>decorative="true"</code> (standard) for ikoner der ikke tilføjer information
          </li>
          <li>
            Brug <code>decorative="false"</code> og <code>ariaLabel</code> for ikoner der formidler
            mening
          </li>
          <li>Følg etablerede ikonkonventioner fra Material Design</li>
          <li>Sørg for at <code>fds-icon-collection</code> er inkluderet på siden</li>
        </ul>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
const basicCode = `<!-- Dekorative ikoner -->
<p><fds-ikon icon="home" /> Hjem</p>
<p><fds-ikon icon="search" /> Søg</p>
<p><fds-ikon icon="visibility" /> Vis</p>
<p><fds-ikon icon="print" /> Print</p>`

const inlineCode = `<!-- Inline ikoner -->
<p>Normal ikon: <fds-ikon icon="star" /> justeres ikke til teksthøjde</p>
<p>Inline ikon: <fds-ikon icon="star" :inline="true" /> justeres til teksthøjde</p>
<p>Tekst med <fds-ikon icon="info" :inline="true" /> inline ikon i midten.</p>`

const accessibleCode = `<!-- Ikoner med betydning (ikke-dekorative) -->
<fds-button icon="add" icon-only aria-label="Tilføj element" />
<fds-button icon="delete" icon-only aria-label="Slet element" />
<fds-button icon="edit" icon-only aria-label="Rediger element" />`
</script>
