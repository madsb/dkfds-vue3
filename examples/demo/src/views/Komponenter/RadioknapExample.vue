<template>
  <section>
    <fds-preview header="Radioknapper" href="https://designsystem.dk/komponenter/radioknap/">
      <fds-preview-item>
        <h3>Grundlæggende radioknapper</h3>
        <fds-radio-group v-model="radioValueSimple" label="Vælg dit foretrukne sprog">
          <fds-radio-item value="dansk">Dansk</fds-radio-item>
          <fds-radio-item value="engelsk">Engelsk</fds-radio-item>
          <fds-radio-item value="tysk">Tysk</fds-radio-item>
        </fds-radio-group>

        <fds-pre header="v-model" :json="{ radioValueSimple }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeSimple"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Radioknapper med hjælpetekst">
      <fds-preview-item>
        <fds-radio-group
          v-model="radioValueHelp"
          label="Vælg leveringsmetode"
          help-text="Vælg den leveringsmetode, der passer dig bedst"
        >
          <fds-radio-item value="standard">Standard levering (3-5 hverdage)</fds-radio-item>
          <fds-radio-item value="express">Express levering (1-2 hverdage)</fds-radio-item>
          <fds-radio-item value="afhentning">Afhentning i butik</fds-radio-item>
        </fds-radio-group>

        <fds-pre header="v-model" :json="{ radioValueHelp }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeHelp"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Radioknapper med udfoldet indhold">
      <fds-preview-item>
        <fds-radio-group v-model="radioValueContent" label="Vælg betalingsmetode">
          <fds-radio-item value="kort">
            Betalingskort
            <template #content>
              <div class="mt-2">
                <fds-formgroup>
                  <fds-label>Kortnummer</fds-label>
                  <fds-input
                    v-model="kortNummer"
                    placeholder="1234 5678 9012 3456"
                    width-class="input-width-l"
                  />
                </fds-formgroup>
                <div class="row">
                  <div class="col-6">
                    <fds-formgroup>
                      <fds-label>Udløbsdato</fds-label>
                      <fds-input
                        v-model="kortUdloeb"
                        placeholder="MM/ÅÅ"
                        width-class="input-width-s"
                      />
                    </fds-formgroup>
                  </div>
                  <div class="col-6">
                    <fds-formgroup>
                      <fds-label>CVV</fds-label>
                      <fds-input v-model="kortCVV" placeholder="123" width-class="input-width-xs" />
                    </fds-formgroup>
                  </div>
                </div>
              </div>
            </template>
          </fds-radio-item>

          <fds-radio-item value="mobilepay">
            MobilePay
            <template #content>
              <div class="mt-2">
                <fds-formgroup>
                  <fds-label>Mobilnummer</fds-label>
                  <fds-input
                    v-model="mobilNummer"
                    type="tel"
                    placeholder="12345678"
                    width-class="input-width-m"
                  />
                </fds-formgroup>
              </div>
            </template>
          </fds-radio-item>

          <fds-radio-item value="faktura">
            Faktura
            <template #content>
              <div class="alert alert--info mt-2" role="alert">
                <div class="alert-body">
                  <p class="alert-text">
                    Faktura sendes til din registrerede adresse og skal betales inden 14 dage.
                  </p>
                </div>
              </div>
            </template>
          </fds-radio-item>
        </fds-radio-group>

        <fds-pre header="v-model" :json="{ radioValueContent, kortNummer, mobilNummer }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeContent"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Radioknapper med forskellige værdityper">
      <fds-preview-item>
        <h3>Numeriske værdier</h3>
        <fds-radio-group v-model="radioValueNumber" label="Vælg antal">
          <fds-radio-item :value="1">1 stk</fds-radio-item>
          <fds-radio-item :value="5">5 stk</fds-radio-item>
          <fds-radio-item :value="10">10 stk</fds-radio-item>
        </fds-radio-group>

        <h3 class="mt-4">Boolean værdier</h3>
        <fds-radio-group v-model="radioValueBoolean" label="Ønsker du nyhedsbrev?">
          <fds-radio-item :value="true">Ja tak</fds-radio-item>
          <fds-radio-item :value="false">Nej tak</fds-radio-item>
        </fds-radio-group>

        <fds-pre header="v-model" :json="{ radioValueNumber, radioValueBoolean }" />
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeTypes"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Props Reference">
      <fds-preview-item>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Props (fds-radio-group)</th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>v-model</code></td>
              <td><code>string | number | boolean</code></td>
              <td><code>null</code></td>
              <td>Den valgte værdi</td>
            </tr>
            <tr>
              <td><code>label*</code></td>
              <td><code>string</code></td>
              <td><code>required</code></td>
              <td>Gruppens overskrift (legend)</td>
            </tr>
            <tr>
              <td><code>helpText</code></td>
              <td><code>string</code></td>
              <td><code>''</code></td>
              <td>Hjælpetekst under label</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Name attribut for alle radioknapper</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>null (autoid)</code></td>
              <td>Unik identifikator</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact mt-4">
          <thead>
            <tr>
              <th>Slots (fds-radio-group)</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td>Tilpasset label indhold</td>
            </tr>
            <tr>
              <td><code>help</code></td>
              <td>Tilpasset hjælpetekst</td>
            </tr>
            <tr>
              <td><code>default</code></td>
              <td>Radio items</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact mt-4">
          <thead>
            <tr>
              <th>Props (fds-radio-item)</th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>value*</code></td>
              <td><code>string | number | boolean</code></td>
              <td><code>required</code></td>
              <td>Radioknappens værdi</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>null (autoid)</code></td>
              <td>Unik identifikator</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Deaktiverer radioknappen</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact mt-4">
          <thead>
            <tr>
              <th>Slots (fds-radio-item)</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>Label tekst for radioknappen</td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td>Indhold der vises når radioknappen er valgt</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact mt-4">
          <thead>
            <tr>
              <th>Events</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@update:modelValue</code></td>
              <td>Udsendt når valg ændres</td>
            </tr>
            <tr>
              <td><code>@dirty</code></td>
              <td>Udsendt når radioknap mister fokus</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Simple example
const radioValueSimple = ref<string>('')

// With help text
const radioValueHelp = ref<string>('')

// With content
const radioValueContent = ref<string>('')
const kortNummer = ref('')
const kortUdloeb = ref('')
const kortCVV = ref('')
const mobilNummer = ref('')

// Different types
const radioValueNumber = ref<number>(1)
const radioValueBoolean = ref<boolean | null>(null)

const codeSimple = `
<fds-radio-group
  v-model="radioValueSimple"
  label="Vælg dit foretrukne sprog"
>
  <fds-radio-item value="dansk">Dansk</fds-radio-item>
  <fds-radio-item value="engelsk">Engelsk</fds-radio-item>
  <fds-radio-item value="tysk">Tysk</fds-radio-item>
</fds-radio-group>
`

const codeHelp = `
<fds-radio-group
  v-model="radioValueHelp"
  label="Vælg leveringsmetode"
  help-text="Vælg den leveringsmetode, der passer dig bedst"
>
  <fds-radio-item value="standard">Standard levering (3-5 hverdage)</fds-radio-item>
  <fds-radio-item value="express">Express levering (1-2 hverdage)</fds-radio-item>
  <fds-radio-item value="afhentning">Afhentning i butik</fds-radio-item>
</fds-radio-group>
`

const codeContent = `
<fds-radio-group
  v-model="radioValueContent"
  label="Vælg betalingsmetode"
>
  <fds-radio-item value="kort">
    Betalingskort
    <template #content>
      <!-- Vises kun når "kort" er valgt -->
      <div class="mt-2">
        <fds-formgroup>
          <fds-label>Kortnummer</fds-label>
          <fds-input v-model="kortNummer" />
        </fds-formgroup>
        <!-- Mere indhold... -->
      </div>
    </template>
  </fds-radio-item>

  <fds-radio-item value="mobilepay">
    MobilePay
    <template #content>
      <!-- Vises kun når "mobilepay" er valgt -->
      <div class="mt-2">
        <fds-formgroup>
          <fds-label>Mobilnummer</fds-label>
          <fds-input v-model="mobilNummer" type="tel" />
        </fds-formgroup>
      </div>
    </template>
  </fds-radio-item>
</fds-radio-group>
`

const codeTypes =
  `
<!-- Numeriske værdier -->
<fds-radio-group
  v-model="radioValueNumber"
  label="Vælg antal"
>
  <fds-radio-item :value="1">1 stk</fds-radio-item>
  <fds-radio-item :value="5">5 stk</fds-radio-item>
  <fds-radio-item :value="10">10 stk</fds-radio-item>
</fds-radio-group>

<!-- Boolean værdier -->
<fds-radio-group
  v-model="radioValueBoolean"
  label="Ønsker du nyhedsbrev?"
>
  <fds-radio-item :value="true">Ja tak</fds-radio-item>
  <fds-radio-item :value="false">Nej tak</fds-radio-item>
</fds-radio-group>

<script setup>
const radioValueNumber = ref<number>(1)
const radioValueBoolean = ref<boolean | null>(null)
<` +
  `/script>
`
</script>
