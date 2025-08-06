<template>
  <section>
    <fds-preview header="Single Accordions" href="https://designsystem.dk/komponenter/accordions/">
      <fds-preview-item>
        <fds-accordion v-model="singleExpanded1" header="Accordion normal header" class="mb-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </fds-accordion>

        <fds-accordion
          v-model="singleExpanded2"
          header="Accordion normal header"
          header-tag="h3"
          class="mb-4"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </fds-accordion>

        <fds-accordion v-model="singleExpanded3" header-tag="h3" class="mb-4">
          <template #header> Accordion med custom header </template>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </fds-accordion>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="accSingleCode"></pre>
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
              <td><code>header</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Accordion header text</td>
            </tr>
            <tr>
              <td><code>v-model</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Controls expanded state</td>
            </tr>
            <tr>
              <td><code>header-tag</code></td>
              <td><code>'h2' | 'h3' | 'h4' | 'h5' | 'h6'</code></td>
              <td><code>'h2'</code></td>
              <td>Heading level for accordion</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'success' | 'warning' | 'error'</code></td>
              <td><code>null</code></td>
              <td>Icon variant to display</td>
            </tr>
            <tr>
              <td><code>variantText</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Text to display with variant icon</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Unique ID for the accordion</td>
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
              <td><code>prop.header</code></td>
              <td>Custom header content</td>
            </tr>
            <tr>
              <td><code>default</code></td>
              <td><code>-</code></td>
              <td>Accordion panel content</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact mt-4">
          <thead>
            <tr>
              <th>Events</th>
              <th>Payload</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td><code>boolean</code></td>
              <td>Emitted when expanded state changes</td>
            </tr>
            <tr>
              <td><code>fds.accordion.open</code></td>
              <td><code>-</code></td>
              <td>Emitted when accordion opens (DKFDS v11)</td>
            </tr>
            <tr>
              <td><code>fds.accordion.close</code></td>
              <td><code>-</code></td>
              <td>Emitted when accordion closes (DKFDS v11)</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>

    <fds-preview header="Accordion gruppe">
      <fds-preview-item>
        <fds-accordion-group>
          <fds-accordion v-model="groupExpanded1" header="Accordion header med hint">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </fds-accordion>

          <fds-accordion
            v-model="groupExpanded2"
            header="Accordion header med Success"
            variant="success"
            variant-text="Success"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </fds-accordion>

          <fds-accordion
            v-model="groupExpanded3"
            header="Accordion header med advarsel"
            variant="warning"
            variant-text="Advarsel"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </fds-accordion>

          <fds-accordion
            v-model="groupExpanded4"
            header="Accordion header med Fejl"
            variant="error"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </fds-accordion>
        </fds-accordion-group>
      </fds-preview-item>
      <fds-preview-code>
        <pre v-text="accGroupCode"></pre>
      </fds-preview-code>

      <fds-preview-item>
        <h3>Accordion Group Props</h3>
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
              <td><code>showBulkButton</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show bulk expand/collapse button</td>
            </tr>
            <tr>
              <td><code>expandedText</code></td>
              <td><code>string</code></td>
              <td><code>'Luk alle'</code></td>
              <td>Text for collapse all button</td>
            </tr>
            <tr>
              <td><code>collapsedText</code></td>
              <td><code>string</code></td>
              <td><code>'Åbn alle'</code></td>
              <td>Text for expand all button</td>
            </tr>
            <tr>
              <td><code>v-model</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Control all accordions expanded state</td>
            </tr>
          </tbody>
        </table>

        <h3>Accordion Group Slots</h3>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Slots</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>header</code></td>
              <td>Custom header content (replaces bulk button)</td>
            </tr>
            <tr>
              <td><code>default</code></td>
              <td>Accordion items</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Single accordion states
const singleExpanded1 = ref(false)
const singleExpanded2 = ref(false)
const singleExpanded3 = ref(false)

// Group accordion states
const groupExpanded1 = ref(false)
const groupExpanded2 = ref(false)
const groupExpanded3 = ref(false)
const groupExpanded4 = ref(false)

const accSingleCode = `
<fds-accordion 
  v-model="expanded1"
  header="Accordion normal header" 
  class="mb-4"
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
</fds-accordion>

<fds-accordion 
  v-model="expanded2"
  header="Accordion normal header" 
  header-tag="h3" 
  class="mb-4"
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
</fds-accordion>

<fds-accordion 
  v-model="expanded3" 
  header-tag="h3"
  class="mb-4"
>
  <template #header>
    Accordion med custom header
  </template>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
</fds-accordion>`
const accGroupCode = `
<fds-accordion-group>
  <fds-accordion header="Accordion header med hint" v-model="expanded1">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </fds-accordion>

  <fds-accordion
    header="Accordion header med Success"
    variant="success"
    variant-text="Success"
    v-model="expanded2"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </fds-accordion>

  <fds-accordion
    header="Accordion header med advarsel"
    variant="warning"
    variant-text="Advarsel"
    v-model="expanded3"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </fds-accordion>

  <fds-accordion 
    header="Accordion header med Fejl" 
    variant="error"
    v-model="expanded4"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </fds-accordion>
</fds-accordion-group>
`
</script>
