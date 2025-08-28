<template>
  <section>
    <!-- Basic Card Example -->
    <fds-preview header="Grundlæggende card" href="https://designsystem.dk/komponenter/cards/">
      <fds-preview-item>
        <fds-card header="Card overskrift">
          <p>
            Dette er et grundlæggende card der viser, hvordan man grupperer relateret indhold. Cards
            bruges til at adskille indhold fra det primære sideindhold.
          </p>
        </fds-card>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="basicCardCode"></pre>
      </fds-preview-code>
    </fds-preview>

    <!-- Card with Image -->
    <fds-preview header="Card med billede">
      <fds-preview-item>
        <fds-card header="Digital Post" subheader="Kommunikation">
          <template #image>
            <img
              src="https://placehold.co/400x225/0868AC/ffffff?text=Digital+Post"
              alt="Digital Post illustration"
            />
          </template>
          <p>
            Få digital post fra offentlige myndigheder direkte i din e-Boks eller anden digital
            postløsning.
          </p>
          <template #actions>
            <a href="#" class="button button-primary">Læs mere</a>
          </template>
        </fds-card>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="imageCardCode"></pre>
      </fds-preview-code>
    </fds-preview>

    <!-- Navigation Cards -->
    <fds-preview header="Navigations cards">
      <fds-preview-item>
        <fds-card-group>
          <fds-card to="#" header="Borger.dk" subheader="For borgere" icon="arrow-forward">
            <template #image>
              <img
                src="https://placehold.co/400x225/1D8649/ffffff?text=Borger.dk"
                alt="Borger.dk"
              />
            </template>
            <p>Find information og selvbetjeningsløsninger for borgere</p>
          </fds-card>

          <fds-card to="#" header="Virk.dk" subheader="For virksomheder" icon="arrow-forward">
            <template #image>
              <img src="https://placehold.co/400x225/7B2D8A/ffffff?text=Virk.dk" alt="Virk.dk" />
            </template>
            <p>Alt hvad din virksomhed har brug for på ét sted</p>
          </fds-card>

          <fds-card to="#" header="Sundhed.dk" subheader="Sundhed" icon="arrow-forward">
            <template #image>
              <img
                src="https://placehold.co/400x225/C0392B/ffffff?text=Sundhed.dk"
                alt="Sundhed.dk"
              />
            </template>
            <p>Din indgang til det danske sundhedsvæsen</p>
          </fds-card>
        </fds-card-group>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="navigationCardsCode"></pre>
      </fds-preview-code>
    </fds-preview>

    <!-- Cards with Actions -->
    <fds-preview header="Cards med handlinger">
      <fds-preview-item>
        <fds-card-group>
          <fds-card header="Ansøg om tilskud" subheader="Boligstøtte">
            <p>
              Få økonomisk hjælp til din bolig hvis du har svært ved at betale husleje eller
              ejerudgifter.
            </p>
            <template #actions>
              <div class="button-group">
                <a href="#" class="button button-primary">Start ansøgning</a>
                <a href="#" class="button button-secondary">Læs mere</a>
              </div>
            </template>
          </fds-card>

          <fds-card header="Book tid" subheader="Borgerservice" class="align">
            <p>
              Book tid til borgerservice for at få hjælp med pas, kørekort, folkeregister og andre
              services.
            </p>
            <template #actions>
              <a href="#" class="button button-primary">Book nu</a>
            </template>
          </fds-card>

          <fds-card header="Digital Post" subheader="Kommunikation">
            <p>
              Tjek din digitale post fra offentlige myndigheder og private virksomheder på ét sted.
            </p>
            <template #actions>
              <a href="#" class="button button-primary">Åbn e-Boks</a>
              <ul class="nobullet-list">
                <li>
                  <a href="#" class="icon-link">
                    Hjælp til digital post
                    <svg class="icon-svg" aria-hidden="true" focusable="false">
                      <use href="#open-in-new"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </template>
          </fds-card>
        </fds-card-group>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="actionCardsCode"></pre>
      </fds-preview-code>
    </fds-preview>

    <!-- Card Deck Layout -->
    <fds-preview header="Deck layout">
      <fds-preview-item>
        <fds-card-group type="deck">
          <fds-card header="NemID bliver til MitID" subheader="Vigtig information">
            <template #image>
              <img
                src="https://placehold.co/400x225/E67E22/ffffff?text=MitID"
                alt="MitID information"
              />
            </template>
            <p>
              Fra 2023 skal du bruge MitID i stedet for NemID. Få hjælp til overgangen og opret din
              MitID i god tid.
            </p>
            <template #actions>
              <a href="#" class="button button-primary">Opret MitID</a>
            </template>
          </fds-card>

          <fds-card header="Årsopgørelse" subheader="Skat">
            <template #image>
              <img
                src="https://placehold.co/400x225/2ECC71/ffffff?text=Årsopgørelse"
                alt="Årsopgørelse"
              />
            </template>
            <p>
              Din årsopgørelse for 2023 er klar. Se hvor meget du skal betale eller få tilbage i
              skat.
            </p>
            <template #actions>
              <a href="#" class="button button-primary">Se årsopgørelse</a>
            </template>
          </fds-card>
        </fds-card-group>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="deckLayoutCode"></pre>
      </fds-preview-code>
    </fds-preview>

    <!-- Column Layout -->
    <fds-preview header="Column layout">
      <fds-preview-item>
        <fds-card-group type="columns">
          <fds-card header="Kontakt kommunen" subheader="Hjælp og support">
            <p>Ring til kommunens borgerservice eller book en tid for personlig betjening.</p>
            <template #actions>
              <a href="#" class="button button-secondary">Kontakt os</a>
            </template>
          </fds-card>

          <fds-card header="Ofte stillede spørgsmål">
            <template #content>
              <div class="bg-info-light p-4">
                <ul class="nobullet-list mb-0">
                  <li><strong>Hvordan opretter jeg digital post?</strong></li>
                  <li><strong>Hvad er MitID og hvorfor skal jeg have det?</strong></li>
                  <li><strong>Hvor finder jeg mine skatteoplysninger?</strong></li>
                </ul>
              </div>
            </template>
            <p>
              Find svar på de mest stillede spørgsmål om offentlige services og digitale løsninger.
            </p>
            <template #actions>
              <a href="#" class="button button-secondary">Se alle spørgsmål</a>
            </template>
          </fds-card>

          <fds-card header="Tilgængelighed" subheader="For alle borgere">
            <p>
              Vi arbejder for at gøre vores digitale løsninger tilgængelige for alle borgere, uanset
              funktionsnedsættelse.
            </p>
            <template #actions>
              <ul class="nobullet-list">
                <li>
                  <a href="#" class="function-link"> Læs om tilgængelighed </a>
                </li>
                <li>
                  <a href="#" class="function-link"> Rapportér problem </a>
                </li>
              </ul>
            </template>
          </fds-card>

          <fds-card header="Nyheder og opdateringer">
            <p>
              Hold dig opdateret med de seneste nyheder om digitale services og systemændringer.
            </p>
            <template #actions>
              <a href="#" class="button button-secondary">Se nyheder</a>
            </template>
          </fds-card>
        </fds-card-group>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="columnLayoutCode"></pre>
      </fds-preview-code>
    </fds-preview>

    <!-- Long Cards (Horizontal) -->
    <fds-preview header="Lange cards (horisontale)">
      <fds-preview-item>
        <fds-card
          to="#"
          variant="long"
          header="Book tid til borgerservice"
          subheader="Personlig betjening"
          icon="arrow-forward"
        >
          <template #image>
            <img
              src="https://placehold.co/400x225/9B59B6/ffffff?text=Borgerservice"
              alt="Borgerservice"
            />
          </template>
          <p>
            Få hjælp med pas, kørekort, CPR-forhold og andre services ved personlig betjening i
            borgerservice.
          </p>
        </fds-card>

        <fds-card
          to="#"
          variant="long"
          header="Akut hjælp og kontakt"
          subheader="Nødsituation"
          icon="open-in-new"
        >
          <template #image>
            <img
              src="https://placehold.co/400x225/E74C3C/ffffff?text=Akut+Hjælp"
              alt="Akut hjælp"
            />
          </template>
          <p>
            Ring 112 ved livsfarlige situationer. Find andre vigtige telefonnumre til akut hjælp.
          </p>
        </fds-card>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="longCardsCode"></pre>
      </fds-preview-code>
    </fds-preview>

    <!-- Component API Documentation -->
    <fds-preview header="Komponent API">
      <fds-preview-item>
        <h3 class="h4">fds-card Props</h3>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Prop</th>
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
              <td>Card overskrift (bruger h2 som standard)</td>
            </tr>
            <tr>
              <td><code>headerTag</code></td>
              <td><code>'h2' | 'h3' | 'h4' | 'h5' | 'h6'</code></td>
              <td><code>'h2'</code></td>
              <td>HTML element til overskrift</td>
            </tr>
            <tr>
              <td><code>subheader</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Understøttende tekst under overskrift</td>
            </tr>
            <tr>
              <td><code>to</code></td>
              <td><code>string | object</code></td>
              <td><code>undefined</code></td>
              <td>Link URL eller Vue Router location (gør card til navigation card)</td>
            </tr>
            <tr>
              <td><code>external</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Tvinger brug af standard anchor tag. Eksterne links detekteres automatisk baseret på
                URL-format
              </td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>
                Ikon for navigation card. Automatisk: 'arrow-forward' for interne links,
                'open-in-new' for eksterne
              </td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'long'</code></td>
              <td><code>undefined</code></td>
              <td>Card variant (long for horisontal layout)</td>
            </tr>
          </tbody>
        </table>

        <h3 class="h4 mt-5">fds-card Slots</h3>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>image</code></td>
              <td>Billede øverst i card</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td>Tilpasset overskrift (overskriver props)</td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td>Specielt indhold efter overskrift</td>
            </tr>
            <tr>
              <td><code>default</code></td>
              <td>Hovedindhold (tekst, paragraffer)</td>
            </tr>
            <tr>
              <td><code>actions</code></td>
              <td>Knapper og links (kun for regular cards, ikke navigation cards)</td>
            </tr>
          </tbody>
        </table>

        <h3 class="h4 mt-5">fds-card-group Props</h3>
        <table class="table table--compact">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type</code></td>
              <td><code>'deck' | 'columns' | null</code></td>
              <td><code>null</code></td>
              <td>Layout type for card gruppe</td>
            </tr>
          </tbody>
        </table>
      </fds-preview-item>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
const basicCardCode = `<fds-card header="Card overskrift">
  <p>
    Dette er et grundlæggende card der viser, hvordan man grupperer relateret indhold.
    Cards bruges til at adskille indhold fra den primære sideindhold.
  </p>
</fds-card>`

const imageCardCode = `<fds-card header="Digital Post" subheader="Kommunikation">
  <template #image>
    <img src="https://placehold.co/400x225/0868AC/ffffff?text=Digital+Post"
         alt="Digital Post illustration" />
  </template>
  <p>
    Få digital post fra offentlige myndigheder direkte i din e-Boks eller
    anden digital postløsning.
  </p>
  <template #actions>
    <a href="#" class="button button-primary">Læs mere</a>
  </template>
</fds-card>`

const navigationCardsCode = `<fds-card-group>
  <fds-card
    to="#"
    header="Borger.dk"
    subheader="For borgere"
    icon="arrow-forward">
    <template #image>
      <img src="https://placehold.co/400x225/1D8649/ffffff?text=Borger.dk" alt="Borger.dk" />
    </template>
    <p>Find information og selvbetjeningsløsninger for borgere</p>
  </fds-card>
  <!-- Flere navigation cards... -->
</fds-card-group>`

const actionCardsCode = `<fds-card-group>
  <fds-card header="Ansøg om tilskud" subheader="Boligstøtte">
    <p>
      Få økonomisk hjælp til din bolig hvis du har svært ved at betale
      husleje eller ejerudgifter.
    </p>
    <template #actions>
      <div class="button-group">
        <a href="#" class="button button-primary">Start ansøgning</a>
        <a href="#" class="button button-secondary">Læs mere</a>
      </div>
    </template>
  </fds-card>
  <!-- Flere action cards... -->
</fds-card-group>`

const deckLayoutCode = `<fds-card-group type="deck">
  <fds-card header="NemID bliver til MitID" subheader="Vigtig information">
    <template #image>
      <img src="https://placehold.co/400x225/E67E22/ffffff?text=MitID"
           alt="MitID information" />
    </template>
    <p>
      Fra 2023 skal du bruge MitID i stedet for NemID. Få hjælp til
      overgangen og opret din MitID i god tid.
    </p>
    <template #actions>
      <a href="#" class="button button-primary">Opret MitID</a>
    </template>
  </fds-card>
  <!-- Flere deck cards... -->
</fds-card-group>`

const columnLayoutCode = `<fds-card-group type="columns">
  <fds-card header="Kontakt kommunen" subheader="Hjælp og support">
    <p>
      Ring til kommunens borgerservice eller book en tid for
      personlig betjening.
    </p>
    <template #actions>
      <a href="#" class="button button-secondary">Kontakt os</a>
    </template>
  </fds-card>
  <!-- Flere column cards... -->
</fds-card-group>`

const longCardsCode = `<fds-card
  to="#"
  variant="long"
  header="Book tid til borgerservice"
  subheader="Personlig betjening"
  icon="arrow-forward">
  <template #image>
    <img src="https://placehold.co/400x225/9B59B6/ffffff?text=Borgerservice"
         alt="Borgerservice" />
  </template>
  <p>
    Få hjælp med pas, kørekort, CPR-forhold og andre services
    ved personlig betjening i borgerservice.
  </p>
</fds-card>`
</script>
