# dkfds-vue3

DKFDS-Vue3 er et komponent bibliotek til [Det Fælles Designsystem](https://designsystem.dk/) (DKFDS).

Med DKFDS-Vue3 kan du let benytte [DKFDS](https://designsystem.dk/) i vue 3 og bygge responsive og ARIA tilgængelige web projekter, som Det Fælles Designsystem foreligger.

Med over 40 Standard komponenter og flere ekstra komponenter til at hjælpe dig med at udvikle selvbetjeningsløsninger hurtigt og effektivt.

<p align="center">
   <a href="https://www.npmjs.com/package/dkfds-vue3">
    <img src="https://flat.badgen.net/npm/v/dkfds-vue3" alt="Current version">
  </a>
  <a href="https://www.npmjs.com/package/dkfds-vue3">
    <img src="https://flat.badgen.net/npm/dt/dkfds-vue3" alt="npm downloads">
  </a>
  <a href="https://github.com/detfaellesdesignsystem/dkfds-components">
    <img src="https://flat.badgen.net/badge/dkfds/11.0.0/0059b3" alt="DKFDS version">
  </a>
  <a href="https://vuejs.org">
    <img src="https://flat.badgen.net/badge/vue.js/3.2.x/4fc08d" alt="Vue.js version">
  </a>

</p>

# Demo side

**Se [DKFDS-Vue3 Demo](https://whitewillow.github.io/dkfds-vue3-example)** (Stadig under udarbejdelse) - herunder også hvordan komponenter bruges.

Benyt også gerne demo project som reference: [DKFDS-Vue3 Demo Github](https://github.com/whitewillow/dkfds-vue3/tree/main/examples/demo)

<br />
<br />

# Installation:

```
npm install -S dkfds-vue3
```

```typescript
// main.ts
import { createApp } from 'vue';
import dkfdsvue3 from 'dkfds-vue3';
import dkfdsvue3Extra from 'dkfds-vue3/extra';
import App from './App.vue';
import router from './router';

...

createApp(App)
  .use(router)
  .use(dkfdsvue3 as any)
  .use(dkfdsvue3Extra as any)
  .mount('#app');
```

```html
// app.ts
<template>
  ...
  <fds-icon-collection />
  <!-- Sørger for at ikoner bliver indlæst -->
</template>

<style lang="scss">
  $font-path: '~dkfds/src/fonts/IBMPlexSans/';
  $image-path: '~dkfds/src/img';
  $site-image-path: '~dkfds/src/img';
  $icons-folder-path: '~dkfds/src/img/svg-icons';
  @import '../node_modules/dkfds/src/stylesheets/dkfds-virkdk';
  @import '../node_modules/dkfds-vue3/core/assets/main.scss';
</style>
```

eller se [app.vue eksempel](./dokumentation/app-vue-example.md)

For Borger DK tema brug følgende istedet for `dkfds-virkdk`

```html
@import '../node_modules/dkfds/src/stylesheets/dkfds-borgerdk.scss';
```

## Faser og Mangler:

Se [Roadmap](./dokumentation/WIP.md)

## Migration til DKFDS v11

### Vigtige ændringer fra DKFDS v8 til v11:

1. **Farve opdateringer**: Nogle farveværdier er blevet opdateret:
   - `success-light`: #EEFFE2 → #DDF7CE
   - `gray-400`: #999999 → #8E8E8E
   - `gray-500`: #747474 → #707070
   - `link-hover`: #000040 → #1A1A1A

2. **Ikon system**: 
   - DKFDS v11 bruger nu Material Symbols
   - Klassen `icon-svg--inherit-color` er fjernet
   - Ikoner arver nu automatisk farve via `fill: currentColor`

3. **Kompatibilitet**: Alle Vue 3 komponenter er opdateret til at fungere med DKFDS v11

## FAQ

Se [FAQ](./dokumentation/faq.md)

## Udvikling

Hvis du vil tilføje komponenter/pull request, se da [Udviklingsguide](./dokumentation/UdviklingsGuide.md)
