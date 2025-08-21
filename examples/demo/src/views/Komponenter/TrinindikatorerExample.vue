<template>
  <section>
    <fds-preview header="Eksempel" href="https://designsystem.dk/komponenter/trinindikator/">
      <fds-preview-item>
        <!-- DKFDS v11 Compliant Step Indicator -->
        <fds-trinindikator-group
          :current-step="currentStep"
          :total-steps="4"
          :clickable-steps="true"
          aria-label="Ansøgning trin"
          @step-click="handleStepClick"
        >
          <fds-trinindikator-step
            :step-number="1"
            title="Personlige oplysninger"
            step-info="Indtast dine grundlæggende oplysninger"
            :is-current="currentStep === 1"
            :is-completed="currentStep > 1"
            :clickable="true"
            @click="handleStepClick(1)"
          />
          <fds-trinindikator-step
            :step-number="2"
            title="Dokumenter"
            step-info="Upload nødvendige dokumenter"
            :is-current="currentStep === 2"
            :is-completed="currentStep > 2"
            :clickable="currentStep > 1"
            @click="handleStepClick(2)"
          />
          <fds-trinindikator-step
            :step-number="3"
            title="Gennemgang"
            step-info="Kontroller dine oplysninger"
            :is-current="currentStep === 3"
            :is-completed="currentStep > 3"
            :clickable="currentStep > 2"
            @click="handleStepClick(3)"
          />
          <fds-trinindikator-step
            :step-number="4"
            title="Bekræftelse"
            :is-current="currentStep === 4"
            :is-completed="false"
            :clickable="currentStep > 3"
            @click="handleStepClick(4)"
          />
        </fds-trinindikator-group>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>
      <fds-preview-item>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Props (Group)</th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>currentStep</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Nuværende trin (1-baseret)</td>
            </tr>
            <tr>
              <td><code>totalSteps</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>Samlet antal trin</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>Trinindikator</code></td>
              <td>ARIA label for navigation</td>
            </tr>
            <tr>
              <td><code>clickableSteps</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Aktiver klikbare trin</td>
            </tr>
            <tr>
              <td><code>showStepInfo</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Vis ekstra trin information</td>
            </tr>
            <tr>
              <td><code>modalTitle</code></td>
              <td><code>string</code></td>
              <td><code>Trin</code></td>
              <td>Modal titel for mobil visning</td>
            </tr>
          </tbody>
        </table>

        <table class="table table--compact">
          <thead>
            <tr>
              <th>Props (Step)</th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>stepNumber</code></td>
              <td><code>number</code></td>
              <td><code>required</code></td>
              <td>Trin nummer (1-baseret)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td><code>required</code></td>
              <td>Trin titel</td>
            </tr>
            <tr>
              <td><code>stepInfo</code></td>
              <td><code>string</code></td>
              <td><code>''</code></td>
              <td>Valgfri trin information</td>
            </tr>
            <tr>
              <td><code>isCurrent</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om dette er det aktuelle trin</td>
            </tr>
            <tr>
              <td><code>isCompleted</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om trinnet er færdigt</td>
            </tr>
            <tr>
              <td><code>hasError</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om trinnet har en fejl</td>
            </tr>
            <tr>
              <td><code>clickable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om trinnet kan klikkes på</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Om trinnet er deaktiveret</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentStep = ref(2)

const handleStepClick = (stepNumber: number) => {
  // Only allow navigation to completed steps or the next step
  if (stepNumber <= currentStep.value + 1) {
    currentStep.value = stepNumber
  }
}

const code = `
<fds-trinindikator-group
  :current-step="currentStep"
  :total-steps="4"
  :clickable-steps="true"
  aria-label="Ansøgning trin"
  @step-click="handleStepClick"
>
  <fds-trinindikator-step
    :step-number="1"
    title="Personlige oplysninger"
    step-info="Indtast dine grundlæggende oplysninger"
    :is-current="currentStep === 1"
    :is-completed="currentStep > 1"
    :clickable="true"
    @click="handleStepClick(1)"
  />
  <fds-trinindikator-step
    :step-number="2"
    title="Dokumenter"
    step-info="Upload nødvendige dokumenter"
    :is-current="currentStep === 2"
    :is-completed="currentStep > 2"
    :clickable="currentStep > 1"
    @click="handleStepClick(2)"
  />
  <fds-trinindikator-step
    :step-number="3"
    title="Gennemgang"
    step-info="Kontroller dine oplysninger"
    :is-current="currentStep === 3"
    :is-completed="currentStep > 3"
    :clickable="currentStep > 2"
    @click="handleStepClick(3)"
  />
  <fds-trinindikator-step
    :step-number="4"
    title="Bekræftelse"
    :is-current="currentStep === 4"
    :is-completed="false"
    :clickable="currentStep > 3"
    @click="handleStepClick(4)"
  />
</fds-trinindikator-group>
`
</script>
