<template>
  <section>
    <fds-preview header="Faneblade" href="https://designsystem.dk/komponenter/faneblade/">
      <fds-preview-item>
        <fds-faneblade>
          <template #tabs>
            <fds-faneblade-tab
              id="tab1"
              label="Fane 1"
              :active="activeTab === 'tab1'"
              @click="activeTab = $event"
            />
            <fds-faneblade-tab
              id="tab2"
              :active="activeTab === 'tab2'"
              @click="activeTab = $event"
            >
              Template Header
            </fds-faneblade-tab>
          </template>
          
          <template #panels>
            <fds-faneblade-panel id="tab1" :active="activeTab === 'tab1'">
              <h2>Fane 1</h2>
              <p>Dette er indholdet for den første fane.</p>
            </fds-faneblade-panel>
            
            <fds-faneblade-panel id="tab2" :active="activeTab === 'tab2'">
              <h2>Fane 2</h2>
              <p>
                Mauris tempor, tellus a laoreet finibus, neque metus hendrerit augue, ac lacinia nisl
                dolor et augue. Ut lorem massa, consequat ut orci sit amet, maximus dictum orci.
                Mauris pharetra nunc sed augue bibendum semper. Donec in cursus orci. Ut sed posuere
                elit, quis semper turpis. Curabitur malesuada nisi nec nisl facilisis ornare. Praesent
                vestibulum, velit id sollicitudin auctor, ipsum lacus auctor nisl, in lacinia sem
                massa eget urna.
              </p>
            </fds-faneblade-panel>
          </template>
        </fds-faneblade>

        <fds-pre header="Aktiv fane" :json="{ activeTab }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h4>fds-faneblade-tab Props</h4>
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
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td>required</td>
              <td>Unik identifikator for fanen</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Tekst for fanen</td>
            </tr>
            <tr>
              <td><code>active</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om fanen er aktiv</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Valgfrit ikon ID</td>
            </tr>
          </tbody>
        </table>
        
        <h4 class="mt-4">fds-faneblade-panel Props</h4>
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
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td>required</td>
              <td>Matcher fane ID</td>
            </tr>
            <tr>
              <td><code>active</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om panelet er synligt</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>

    <hr class="my-6" />
    
    <fds-preview header="Faneblade med ikoner" href="https://designsystem.dk/komponenter/faneblade/">
      <fds-preview-item>
        <fds-faneblade>
          <template #tabs>
            <fds-faneblade-tab
              id="icon1"
              label="Billede"
              icon="file-image"
              :active="activeIconTab === 'icon1'"
              @click="activeIconTab = $event"
            />
            <fds-faneblade-tab
              id="icon2"
              label="Dokument"
              icon="document"
              :active="activeIconTab === 'icon2'"
              @click="activeIconTab = $event"
            />
            <fds-faneblade-tab
              id="icon3"
              label="Video"
              icon="videocam"
              :active="activeIconTab === 'icon3'"
              @click="activeIconTab = $event"
            />
          </template>
          
          <template #panels>
            <fds-faneblade-panel id="icon1" :active="activeIconTab === 'icon1'">
              <h3>Billede fane</h3>
              <p>Indhold for billede fanen.</p>
            </fds-faneblade-panel>
            
            <fds-faneblade-panel id="icon2" :active="activeIconTab === 'icon2'">
              <h3>Dokument fane</h3>
              <p>Indhold for dokument fanen.</p>
            </fds-faneblade-panel>
            
            <fds-faneblade-panel id="icon3" :active="activeIconTab === 'icon3'">
              <h3>Video fane</h3>
              <p>Indhold for video fanen.</p>
            </fds-faneblade-panel>
          </template>
        </fds-faneblade>
      </fds-preview-item>
    </fds-preview>
    
    <hr class="my-6" />
    
    <fds-preview header="Faneblade til navigation" href="https://designsystem.dk/komponenter/faneblade/">
      <fds-preview-item>
        <fds-faneblade-nav aria-label="Eksemplets undersider">
          <fds-faneblade-nav-item
            href="#sektion1"
            label="Sektion 1"
            :active="activeNavSection === 'sektion1'"
            @click="handleNavClick($event, 'sektion1')"
          />
          <fds-faneblade-nav-item
            href="#sektion2"
            label="Sektion 2"
            :active="activeNavSection === 'sektion2'"
            @click="handleNavClick($event, 'sektion2')"
          />
          <fds-faneblade-nav-item
            href="#sektion3"
            label="Sektion 3"
            :active="activeNavSection === 'sektion3'"
            @click="handleNavClick($event, 'sektion3')"
          />
        </fds-faneblade-nav>
        
        <div class="mt-4">
          <div id="sektion1" class="p-4 border" v-if="activeNavSection === 'sektion1'">
            <h3>Sektion 1</h3>
            <p>Dette er indhold for sektion 1. Navigation faneblade bruges til at navigere mellem relaterede sektioner på samme side.</p>
          </div>
          <div id="sektion2" class="p-4 border" v-if="activeNavSection === 'sektion2'">
            <h3>Sektion 2</h3>
            <p>Dette er indhold for sektion 2. Disse bruger links i stedet for knapper.</p>
          </div>
          <div id="sektion3" class="p-4 border" v-if="activeNavSection === 'sektion3'">
            <h3>Sektion 3</h3>
            <p>Dette er indhold for sektion 3. De er beregnet til sidenavigation.</p>
          </div>
        </div>
      </fds-preview-item>
      
      <fds-preview-code>
        <pre v-text="navCode"></pre>
      </fds-preview-code>
      
      <fds-preview-item>
        <h4>fds-faneblade-nav Props</h4>
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
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>ARIA label for navigation</td>
            </tr>
          </tbody>
        </table>
        
        <h4 class="mt-4">fds-faneblade-nav-item Props</h4>
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
              <td><code>href</code></td>
              <td><code>string</code></td>
              <td>required</td>
              <td>Link destination</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Link tekst</td>
            </tr>
            <tr>
              <td><code>active</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om linket er aktivt</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Valgfrit ikon ID</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')
const activeIconTab = ref('icon1')
const activeNavSection = ref('sektion1')

const handleNavClick = (event: MouseEvent, section: string) => {
  event.preventDefault()
  activeNavSection.value = section
}

const code = `
<fds-faneblade>
  <template #tabs>
    <fds-faneblade-tab
      id="tab1"
      label="Fane 1"
      :active="activeTab === 'tab1'"
      @click="activeTab = $event"
    />
    <fds-faneblade-tab
      id="tab2"
      :active="activeTab === 'tab2'"
      @click="activeTab = $event"
    >
      Template Header
    </fds-faneblade-tab>
  </template>
  
  <template #panels>
    <fds-faneblade-panel id="tab1" :active="activeTab === 'tab1'">
      <h2>Fane 1</h2>
      <p>Dette er indholdet for den første fane.</p>
    </fds-faneblade-panel>
    
    <fds-faneblade-panel id="tab2" :active="activeTab === 'tab2'">
      <h2>Fane 2</h2>
      <p>
        Mauris tempor, tellus a laoreet finibus, neque metus hendrerit augue, ac lacinia nisl
        dolor et augue. Ut lorem massa, consequat ut orci sit amet, maximus dictum orci. Mauris
        pharetra nunc sed augue bibendum semper. Donec in cursus orci. Ut sed posuere elit, quis
        semper turpis. Curabitur malesuada nisi nec nisl facilisis ornare. Praesent vestibulum,
        velit id sollicitudin auctor, ipsum lacus auctor nisl, in lacinia sem massa eget urna.
      </p>
    </fds-faneblade-panel>
  </template>
</fds-faneblade>

const activeTab = ref('tab1')
`

const navCode = `
<fds-faneblade-nav aria-label="Eksemplets undersider">
  <fds-faneblade-nav-item
    href="#sektion1"
    label="Sektion 1"
    :active="activeNavSection === 'sektion1'"
    @click="handleNavClick($event, 'sektion1')"
  />
  <fds-faneblade-nav-item
    href="#sektion2"
    label="Sektion 2"
    :active="activeNavSection === 'sektion2'"
    @click="handleNavClick($event, 'sektion2')"
  />
  <fds-faneblade-nav-item
    href="#sektion3"
    label="Sektion 3"
    :active="activeNavSection === 'sektion3'"
    @click="handleNavClick($event, 'sektion3')"
  />
</fds-faneblade-nav>

const activeNavSection = ref('sektion1')

const handleNavClick = (event: MouseEvent, section: string) => {
  event.preventDefault()
  activeNavSection.value = section
}
`
</script>
