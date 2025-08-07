<template>
  <section>
    <h2>Tags</h2>
    <p>
      Tags bruges til at vise sekundære, metadata-relaterede oplysninger på en præcis og
      kontekstuelt relevant måde.
    </p>

    <fds-preview header="Standard tags" href="https://designsystem.dk/komponenter/tags/">
      <fds-preview-item>
        <fds-tag>Bornholm</fds-tag>
        <fds-tag>Sjælland</fds-tag>
        <fds-tag>Fyn</fds-tag>
        <fds-tag>Jylland</fds-tag>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeStandard"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Tags med ikon">
      <fds-preview-item>
        <fds-tag icon="highlight-off" @click="handleTagClick"> Bornholm </fds-tag>
        <fds-tag icon="highlight-off" @click="handleTagClick"> Sjælland </fds-tag>
        <fds-tag icon="highlight-off" @click="handleTagClick"> Fyn </fds-tag>

        <fds-pre header="Klik events" :json="{ antalTagKlik: antalTagClick }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeWithIcon"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Tilgængelighed">
      <fds-preview-item>
        <div class="accessibility-info">
          <h4>Vigtige tilgængelighedspunkter:</h4>
          <ul>
            <li>
              Tags er implementeret som <code>&lt;button&gt;</code> elementer for semantisk
              korrekthed
            </li>
            <li>
              Ikoner har <code>aria-hidden="true"</code> og <code>focusable="false"</code> for
              skærmlæsere
            </li>
            <li>Tags er fuldt tastaturnavigérbare</li>
            <li>Hver tag får automatisk et unikt ID hvis ikke angivet</li>
          </ul>
        </div>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Standard click handling
const antalTagClick = ref(0)
const handleTagClick = (formId: string) => {
  antalTagClick.value += 1
  console.log('Tag clicked:', formId)
}

// Code examples
const codeStandard = `<fds-tag>Bornholm</fds-tag>
<fds-tag>Sjælland</fds-tag>
<fds-tag>Fyn</fds-tag>
<fds-tag>Jylland</fds-tag>`

const codeWithIcon = `<fds-tag icon="highlight-off" @click="handleTagClick">
  Bornholm
</fds-tag>

<script setup>
const handleTagClick = (formId) => {
  // Håndter klik på tag eller ikon
  console.log('Tag clicked:', formId)
}
<script>`
</script>

<style scoped>
.accessibility-info {
  padding: 1rem;
}

.accessibility-info h4 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.accessibility-info ul {
  margin: 0;
  padding-left: 1.5rem;
}

.accessibility-info li {
  margin-bottom: 0.5rem;
}

.accessibility-info code {
  background-color: #f5f5f5;
  padding: 0.125rem 0.25rem;
  border-radius: 0.125rem;
  font-size: 0.875em;
}
</style>
