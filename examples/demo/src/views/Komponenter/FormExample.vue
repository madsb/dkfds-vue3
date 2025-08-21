<template>
  <section>
    <div>
      <h3>Eksempel på advanceret brug</h3>
      <fds-formgroup>
        <fds-label> Fornavn </fds-label>
        <fds-hint>Indtast fornavn</fds-hint>
        <fds-input v-model="txtFornavn"></fds-input>
      </fds-formgroup>

      <fds-formgroup :is-valid="efternavnValid">
        <fds-label> Efternavn </fds-label>
        <fds-fejlmeddelelse v-if="!efternavnValid">
          {{ efternavnError }}
        </fds-fejlmeddelelse>
        <fds-hint>Indtast efternavn</fds-hint>
        <fds-input v-model="txtEfternavn" @blur="validateEfternavn"></fds-input>
      </fds-formgroup>
    </div>
    <hr />
    <div>
      <h3>Eksempel på simpel brug</h3>

      <fds-formgroup>
        <fds-label>Adresse</fds-label>
        <fds-hint>Angiv gyldig adresse</fds-hint>
        <fds-input v-model="txtAdresse"></fds-input>
      </fds-formgroup>

      <fds-formgroup>
        <fds-label>Antal kasser</fds-label>
        <fds-input v-model="kasser" prefix="stk"></fds-input>
      </fds-formgroup>

      <fds-formgroup>
        <fds-label>Antal kasser</fds-label>
        <fds-input v-model="kasser" suffix="stk"></fds-input>
      </fds-formgroup>

      <fds-formgroup>
        <fds-label>Mobil nr.</fds-label>
        <fds-input :model-value="txtMobil" disabled></fds-input>
      </fds-formgroup>

      <fds-formgroup>
        <fds-label>Tekst område</fds-label>
        <fds-textarea v-model="txtBeskrivelse"></fds-textarea>
      </fds-formgroup>

      <hr />

      <h3>Valg</h3>

      <fds-formgroup label="Vælg en checkbox">
        <fds-checkbox-list v-model="checkboxList">
          <template #[`melon`]>
            <p>Det er muligt at benytte radio til mere indhold</p>
          </template>
        </fds-checkbox-list>
      </fds-formgroup>

      <fds-pre :json="checkboxList" />

      <fds-formgroup label="Single Checkbox">
        <fds-checkbox v-model="twoChecked" class="mt-2"> Andet valg </fds-checkbox>
        <fds-checkbox v-model="twoChecked" size="small"> Andet valg - small </fds-checkbox>
      </fds-formgroup>

      <fds-formgroup>
        <fds-label>Vælg radio</fds-label>
        <fds-hint>Lorem ipsum dolor sit amet consectetur adipisicing elit.</fds-hint>
        <fds-radio-group v-model="radioVal">
          <fds-radio-item v-for="option in radioOptions" :key="option.value" :value="option.value">
            {{ option.title }}
            <template v-if="option.value === 'melon'">
              <p>Det er muligt at benytte radio til mere indhold</p>
            </template>
          </fds-radio-item>
        </fds-radio-group>
      </fds-formgroup>

      <fds-formgroup>
        <fds-label>Vælg radio toggle</fds-label>
        <fds-hint>Lorem ipsum dolor sit amet consectetur adipisicing elit.</fds-hint>
        <fds-radio-group v-model="toggleRadio">
          <fds-radio-item value="true">Ja</fds-radio-item>
          <fds-radio-item value="false">Nej</fds-radio-item>
        </fds-radio-group>
      </fds-formgroup>
      {{ toggleRadio }}

      <fds-formgroup>
        <fds-dropdown v-model="dropdownVal" :options="dropdownOptions" />
      </fds-formgroup>

      <fds-toggle-switch v-model="toggleswitch" />
      <div>
        {{ toggleswitch }}
      </div>
    </div>
    <hr class="my-6" />

    <p>{{ txtFornavn }}</p>
    <p>{{ txtEfternavn }}</p>
    <p>{{ txtAdresse }}</p>
    <p>{{ txtMobil }}</p>
    <p>{{ txtBeskrivelse }}</p>
    <p>{{ oneChecked }}</p>
    <p>{{ twoChecked }}</p>
    <p>{{ radioVal }}</p>
    <p>{{ dropdownVal }}</p>

    <hr />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { charactersMinLength, hasContent } from 'dkfds-vue3/utils'
import { FdsOptionItem, FdsCheckboxItem } from 'dkfds-vue3/utils'

const txtFornavn = ref('')
const txtEfternavn = ref('')
const efternavnDirty = ref(false)

// Validation for efternavn
const validateEfternavn = () => {
  efternavnDirty.value = true
}

const efternavnValid = computed(() => {
  if (!efternavnDirty.value) return true
  const validations = [hasContent, charactersMinLength(10)]
  return validations.every(v => !v(txtEfternavn.value))
})

const efternavnError = computed(() => {
  if (efternavnValid.value) return ''
  if (!hasContent(txtEfternavn.value)) return hasContent(txtEfternavn.value)
  return charactersMinLength(10)(txtEfternavn.value) || ''
})
const txtAdresse = ref('')
const kasser = ref('')
const txtMobil = ref('23232323')
const txtBeskrivelse = ref('')
const oneChecked = ref(false)
const twoChecked = ref(false)
const radioVal = ref('')
const toggleswitch = ref(false)
const toggleRadio = ref(null)
const radioOptions = ref<FdsOptionItem[]>([
  {
    title: 'Banan',
    value: 'banan',
  },
  {
    title: 'Melon',
    value: 'melon',
  },
  {
    title: 'Æble',
    value: 'æble',
  },
])
const checkboxList = ref<FdsCheckboxItem[]>([
  {
    title: 'Banan',
    value: 'banan',
  },
  {
    title: 'Melon',
    value: 'melon',
  },
  {
    title: 'Æble',
    value: 'æble',
  },
])
const dropdownVal = ref('')
const dropdownOptions = ref<FdsOptionItem[]>([
  {
    title: 'Banan',
    value: 'banan',
  },
  {
    title: 'Melon',
    value: 'melon',
  },
  {
    title: 'Æble',
    value: 'æble',
  },
])
</script>
