<template>
  <article>
    <h1>Kodevisning (Pre)</h1>
    <p class="font-lead">
      Komponenten bruges til at vise formateret kode eller JSON-data med korrekt indentering og formatering.
    </p>

    <section class="mt-8">
      <h2>Eksempler</h2>
      
      <div class="component-example mt-5">
        <h3>Kodevisning med overskrift</h3>
        <fds-pre header="JavaScript eksempel" :code="jsCode" />
      </div>

      <div class="component-example mt-5">
        <h3>JSON visning</h3>
        <fds-pre header="API Response" :json="jsonExample" />
      </div>

      <div class="component-example mt-5">
        <h3>HTML kode via slot</h3>
        <fds-pre header="HTML eksempel">
&lt;div class="container"&gt;
  &lt;h1&gt;Overskrift&lt;/h1&gt;
  &lt;p&gt;Dette er et afsnit med tekst.&lt;/p&gt;
&lt;/div&gt;
        </fds-pre>
      </div>

      <div class="component-example mt-5">
        <h3>Uden overskrift</h3>
        <fds-pre :code="cssCode" />
      </div>

      <div class="component-example mt-5">
        <h3>Stor JSON med advarsel</h3>
        <p class="mb-3">Når JSON-data overstiger 65.535 tegn, vises en advarsel.</p>
        <fds-pre header="Stor datamængde" :json="largeJson" />
      </div>
    </section>

    <section class="mt-8">
      <h2>Anvendelse</h2>
      <p>Komponenten kan bruges på tre måder:</p>
      <ul>
        <li>Med <code>code</code> prop til at vise kode som en streng</li>
        <li>Med <code>json</code> prop til at vise formateret JSON</li>
        <li>Med slot content til direkte indhold</li>
      </ul>

      <h3 class="mt-5">Props</h3>
      <table class="table table--zebra">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Standard</th>
            <th>Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>header</code></td>
            <td>string</td>
            <td>undefined</td>
            <td>Valgfri overskrift for kodeblokken</td>
          </tr>
          <tr>
            <td><code>code</code></td>
            <td>string | null</td>
            <td>null</td>
            <td>Kode der skal vises som tekst</td>
          </tr>
          <tr>
            <td><code>json</code></td>
            <td>object | null</td>
            <td>null</td>
            <td>JSON-objekt der skal formateres og vises</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mt-5">Prioritering</h3>
      <p>Hvis flere props er angivet, følges denne prioritering:</p>
      <ol>
        <li><code>json</code> - vises først hvis angivet</li>
        <li><code>code</code> - vises hvis json ikke er angivet</li>
        <li>Slot indhold - vises hvis hverken json eller code er angivet</li>
      </ol>
    </section>

    <section class="mt-8">
      <h2>Kodeeksempel</h2>
      <fds-pre header="Vue implementation" :code="vueExample" />
    </section>
  </article>
</template>

<script setup lang="ts">
const jsCode = `function calculateSum(a, b) {
  // Validér input
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Begge parametre skal være tal');
  }
  
  // Beregn og returner sum
  return a + b;
}

// Eksempel på brug
const result = calculateSum(5, 10);
console.log('Resultat:', result); // Output: 15`

const cssCode = `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}`

const jsonExample = {
  status: 'success',
  data: {
    id: 1234,
    name: 'Anders Andersen',
    email: 'anders@example.dk',
    address: {
      street: 'Kongensgade 10',
      city: 'København',
      postalCode: '1200'
    },
    roles: ['admin', 'user'],
    active: true
  },
  timestamp: '2024-01-15T10:30:00Z'
}

// Create a large JSON for demonstration
const generateLargeJson = () => {
  const items = []
  for (let i = 0; i < 2000; i++) {
    items.push({
      id: i,
      name: `Item nummer ${i}`,
      description: 'Dette er en beskrivelse der gør JSON-objektet større for at demonstrere advarslen om store datamængder.',
      metadata: {
        created: '2024-01-15',
        modified: '2024-01-16',
        tags: ['tag1', 'tag2', 'tag3']
      }
    })
  }
  return { totalItems: items.length, items }
}

const largeJson = generateLargeJson()

const vueExample = `<template>
  <!-- Vis JavaScript kode -->
  <fds-pre 
    header="Min kode" 
    :code="javascriptCode" 
  />
  
  <!-- Vis JSON data -->
  <fds-pre 
    header="API Response" 
    :json="responseData" 
  />
  
  <!-- Vis HTML via slot -->
  <fds-pre header="HTML struktur">
    &lt;div class="example"&gt;
      &lt;p&gt;Indhold&lt;/p&gt;
    &lt;/div&gt;
  </fds-pre>
</template>

<script setup>
import { ref } from 'vue'

const javascriptCode = \`function hello() {
  console.log('Hej verden');
}\`

const responseData = {
  status: 'ok',
  message: 'Success'
}
<` + `/script>`
</script>

<style scoped>
.component-example {
  padding: 1.5rem;
  background-color: var(--color-gray-50);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.component-example h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.table {
  margin-top: 1rem;
}

code {
  background-color: var(--color-gray-100);
  padding: 0.125rem 0.25rem;
  border-radius: 2px;
  font-size: 0.875rem;
}
</style>