<template>
  <section>
    <fds-preview header="Et niveau" href="https://designsystem.dk/komponenter/venstremenu/">
      <fds-preview-item>
        <div class="row">
          <div class="col-4">
            <fds-menu aria-label="Eksempel på venstremenu">
              <fds-menu-item id="side1" @navigate="oneLevel = $event"> Side 1 </fds-menu-item>
              <fds-menu-item id="side2" @navigate="oneLevel = $event"> Side 2 </fds-menu-item>
              <fds-menu-item id="side3" current @navigate="oneLevel = $event">
                Side 3
              </fds-menu-item>
              <fds-menu-item id="side4" @navigate="oneLevel = $event"> Side 4 </fds-menu-item>
            </fds-menu>
          </div>
          <div class="col">
            <fds-pre :json="{ clickedId: oneLevel }" />
          </div>
        </div>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="To niveauer">
      <fds-preview-item>
        <div class="row">
          <div class="col-4">
            <fds-menu aria-label="Eksempel på venstremenu med to niveauer">
              <fds-menu-item id="side1" @navigate="twoLevel = $event"> Side 1 </fds-menu-item>
              <fds-menu-item id="side2" expanded @navigate="twoLevel = $event">
                Side 2
                <template #submenu>
                  <fds-menu variant="submenu">
                    <fds-menu-item id="side2-1" @navigate="twoLevel = $event">
                      Underside 1
                    </fds-menu-item>
                    <fds-menu-item id="side2-2" current @navigate="twoLevel = $event">
                      Underside 2
                    </fds-menu-item>
                    <fds-menu-item id="side2-3" @navigate="twoLevel = $event">
                      Underside 3
                    </fds-menu-item>
                  </fds-menu>
                </template>
              </fds-menu-item>
              <fds-menu-item id="side3" @navigate="twoLevel = $event"> Side 3 </fds-menu-item>
              <fds-menu-item id="side4" @navigate="twoLevel = $event"> Side 4 </fds-menu-item>
            </fds-menu>
          </div>
          <div class="col">
            <fds-pre :json="{ clickedId: twoLevel }" />
          </div>
        </div>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code2"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Tre niveauer">
      <fds-preview-item>
        <div class="row">
          <div class="col-4">
            <fds-menu aria-label="Eksempel på venstremenu med tre niveauer">
              <fds-menu-item id="side1" @navigate="threeLevel = $event"> Side 1 </fds-menu-item>
              <fds-menu-item id="side2" expanded @navigate="threeLevel = $event">
                Side 2
                <template #submenu>
                  <fds-menu variant="submenu">
                    <fds-menu-item id="side2-1" @navigate="threeLevel = $event">
                      Underside 1
                    </fds-menu-item>
                    <fds-menu-item id="side2-2" expanded @navigate="threeLevel = $event">
                      Underside 2
                      <template #submenu>
                        <fds-menu variant="submenu">
                          <fds-menu-item id="side2-2-1" @navigate="threeLevel = $event">
                            Under-underside 1
                          </fds-menu-item>
                          <fds-menu-item id="side2-2-2" current @navigate="threeLevel = $event">
                            Under-underside 2
                          </fds-menu-item>
                        </fds-menu>
                      </template>
                    </fds-menu-item>
                    <fds-menu-item id="side2-3" @navigate="threeLevel = $event">
                      Underside 3
                    </fds-menu-item>
                  </fds-menu>
                </template>
              </fds-menu-item>
              <fds-menu-item id="side3" @navigate="threeLevel = $event"> Side 3 </fds-menu-item>
            </fds-menu>
          </div>
          <div class="col">
            <fds-pre :json="{ clickedId: threeLevel }" />
          </div>
        </div>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code3"></pre>
      </fds-preview-code>
    </fds-preview>

    <fds-preview header="Ekstra information">
      <fds-preview-item>
        <div class="row">
          <div class="col-4">
            <fds-menu aria-label="Venstremenu med ekstra information">
              <fds-menu-item
                id="info1"
                hint="Informationstekst for side 1"
                @navigate="infoExample = $event"
              >
                Side 1
              </fds-menu-item>
              <fds-menu-item
                id="info2"
                hint="Informationstekst for side 2"
                current
                @navigate="infoExample = $event"
              >
                Side 2
              </fds-menu-item>
              <fds-menu-item
                id="info3"
                hint="Informationstekst for side 3"
                @navigate="infoExample = $event"
              >
                Side 3
              </fds-menu-item>
            </fds-menu>
          </div>
          <div class="col">
            <fds-pre :json="{ clickedId: infoExample }" />
          </div>
        </div>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="code4"></pre>
      </fds-preview-code>
    </fds-preview>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const oneLevel = ref('')
const twoLevel = ref('')
const threeLevel = ref('')
const infoExample = ref('')

const code = `
<fds-menu aria-label="Eksempel på venstremenu">
  <fds-menu-item id="side1" @navigate="oneLevel = $event">
    Side 1
  </fds-menu-item>
  <fds-menu-item id="side2" @navigate="oneLevel = $event">
    Side 2
  </fds-menu-item>
  <fds-menu-item id="side3" @navigate="oneLevel = $event" current>
    Side 3
  </fds-menu-item>
  <fds-menu-item id="side4" @navigate="oneLevel = $event">
    Side 4
  </fds-menu-item>
</fds-menu>
`

const code2 = `
<fds-menu aria-label="Eksempel på venstremenu med to niveauer">
  <fds-menu-item id="side1" @navigate="twoLevel = $event">
    Side 1
  </fds-menu-item>
  <fds-menu-item id="side2" @navigate="twoLevel = $event" expanded>
    Side 2
    <template #submenu>
      <fds-menu variant="submenu">
        <fds-menu-item id="side2-1" @navigate="twoLevel = $event">
          Underside 1
        </fds-menu-item>
        <fds-menu-item id="side2-2" @navigate="twoLevel = $event" current>
          Underside 2
        </fds-menu-item>
        <fds-menu-item id="side2-3" @navigate="twoLevel = $event">
          Underside 3
        </fds-menu-item>
      </fds-menu>
    </template>
  </fds-menu-item>
  <fds-menu-item id="side3" @navigate="twoLevel = $event">
    Side 3
  </fds-menu-item>
  <fds-menu-item id="side4" @navigate="twoLevel = $event">
    Side 4
  </fds-menu-item>
</fds-menu>
`

const code3 = `
<fds-menu aria-label="Eksempel på venstremenu med tre niveauer">
  <fds-menu-item id="side1" @navigate="threeLevel = $event">
    Side 1
  </fds-menu-item>
  <fds-menu-item id="side2" @navigate="threeLevel = $event" expanded>
    Side 2
    <template #submenu>
      <fds-menu variant="submenu">
        <fds-menu-item id="side2-1" @navigate="threeLevel = $event">
          Underside 1
        </fds-menu-item>
        <fds-menu-item id="side2-2" @navigate="threeLevel = $event" expanded>
          Underside 2
          <template #submenu>
            <fds-menu variant="submenu">
              <fds-menu-item id="side2-2-1" @navigate="threeLevel = $event">
                Under-underside 1
              </fds-menu-item>
              <fds-menu-item id="side2-2-2" @navigate="threeLevel = $event" current>
                Under-underside 2
              </fds-menu-item>
            </fds-menu>
          </template>
        </fds-menu-item>
        <fds-menu-item id="side2-3" @navigate="threeLevel = $event">
          Underside 3
        </fds-menu-item>
      </fds-menu>
    </template>
  </fds-menu-item>
  <fds-menu-item id="side3" @navigate="threeLevel = $event">
    Side 3
  </fds-menu-item>
</fds-menu>
`

const code4 = `
<fds-menu aria-label="Venstremenu med ekstra information">
  <fds-menu-item id="info1" hint="Informationstekst for side 1" @navigate="infoExample = $event">
    Side 1
  </fds-menu-item>
  <fds-menu-item id="info2" hint="Informationstekst for side 2" @navigate="infoExample = $event" current>
    Side 2
  </fds-menu-item>
  <fds-menu-item id="info3" hint="Informationstekst for side 3" @navigate="infoExample = $event">
    Side 3
  </fds-menu-item>
</fds-menu>
`
</script>
