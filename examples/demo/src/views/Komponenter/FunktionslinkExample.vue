<template>
  <section>
    <fds-preview header="Eksempel" href="https://designsystem.dk/komponenter/funktionslink/">
      <fds-preview-item>
        <fds-funktionslink title="Klik for event" @click="handleFunkClick">
          Funktionslink
        </fds-funktionslink>
        <fds-pre header="Klik" :json="{ funktionsLinkClick }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>

      <fds-preview-item>
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
              <td><code>undefined</code></td>
              <td>
                Ikon fra DKFDS ikonsæt. Se
                <a href="https://designsystem.dk/design/ikoner/" target="dkfds"> DKFDS ikoner</a>
              </td>
            </tr>
            <tr>
              <td><code>href</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>URL for link navigation</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td><code>'link' | 'button'</code></td>
              <td><code>undefined</code></td>
              <td>Element type - auto-detekteres fra href hvis ikke angivet</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Title attribut for tilgængelighed</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Deaktiveret tilstand (kun for button type)</td>
            </tr>
            <tr>
              <td><code>target</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Target attribut for links (_blank, _self, _parent, _top)</td>
            </tr>
            <tr>
              <td><code>rel</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Rel attribut for links</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact">
          <thead>
            <tr>
              <th>Slots</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>header</code></td>
              <td><code>props.header</code></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>

    <fds-preview header="Med ikon og Som link">
      <fds-preview-item>
        <fds-funktionslink
          icon="contact-support"
          title="Klik for at gå til om os"
          @click="router.push({ name: 'about' })"
        >
          Funktionslink med ikon - Om os
        </fds-funktionslink>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code2"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Forskellige varianter">
      <fds-preview-item>
        <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
          <fds-funktionslink
            icon="print"
            title="Print denne side"
            @click="handlePrint"
          >
            Print
          </fds-funktionslink>
          
          <fds-funktionslink
            href="/download/document.pdf"
            icon="download"
            title="Download PDF"
          >
            Download PDF
          </fds-funktionslink>
          
          <fds-funktionslink
            href="https://designsystem.dk"
            target="_blank"
            rel="noopener noreferrer"
            icon="open-in-new"
            title="Åbn DKFDS i nyt vindue"
          >
            Åbn i nyt vindue
          </fds-funktionslink>
          
          <fds-funktionslink
            icon="save"
            :disabled="isSaving"
            title="Gem kladde"
            @click="handleSave"
          >
            {{ isSaving ? 'Gemmer...' : 'Gem kladde' }}
          </fds-funktionslink>
          
          <fds-funktionslink
            icon="delete"
            title="Slet element"
            @click="handleDelete"
          >
            Slet
          </fds-funktionslink>
        </div>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code3"></pre>
      </fds-preview-code>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const funktionsLinkClick = ref(0)
const isSaving = ref(false)

const handleFunkClick = () => {
  funktionsLinkClick.value += 1
}

const handlePrint = () => {
  window.print()
}

const handleSave = async () => {
  isSaving.value = true
  // Simulate save operation
  await new Promise(resolve => setTimeout(resolve, 2000))
  isSaving.value = false
  console.log('Kladde gemt!')
}

const handleDelete = () => {
  if (confirm('Er du sikker på at du vil slette?')) {
    console.log('Element slettet')
  }
}

const code = `
<fds-funktionslink title="Klik for event" @click="handleFunkClick">
  Funktionslink
</fds-funktionslink>
`

const code2 = `
<fds-funktionslink
  @click="$router.push({ name: 'about' })"
  icon="contact-support"
  title="Klik for at gå til om os"
>
  Funktionslink med ikon - Om os
</fds-funktionslink>

// Eller med href

<fds-funktionslink
  href="/forside"
  icon="contact-support"
  title="Klik for at gå til forside"
>
  Funktionslink med ikon - Forside
</fds-funktionslink>
`

const code3 = `
<!-- Print funktion -->
<fds-funktionslink
  icon="print"
  title="Print denne side"
  @click="handlePrint"
>
  Print
</fds-funktionslink>

<!-- Download link -->
<fds-funktionslink
  href="/download/document.pdf"
  icon="download"
  title="Download PDF"
>
  Download PDF
</fds-funktionslink>

<!-- Eksternt link -->
<fds-funktionslink
  href="https://designsystem.dk"
  target="_blank"
  rel="noopener noreferrer"
  icon="open-in-new"
  title="Åbn DKFDS i nyt vindue"
>
  Åbn i nyt vindue
</fds-funktionslink>

<!-- Gem med disabled state -->
<fds-funktionslink
  icon="save"
  :disabled="isSaving"
  title="Gem kladde"
  @click="handleSave"
>
  {{ isSaving ? 'Gemmer...' : 'Gem kladde' }}
</fds-funktionslink>

<!-- Slet funktion -->
<fds-funktionslink
  icon="delete"
  title="Slet element"
  @click="handleDelete"
>
  Slet
</fds-funktionslink>
`
</script>
