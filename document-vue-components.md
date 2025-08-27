---
name: document-vue-components
description: Generate comprehensive VitePress documentation for DKFDS Vue components with JSDoc
version: 1.0.0
---

# Document DKFDS Vue Components for VitePress

Generate high-quality, accurate VitePress documentation for DKFDS Vue components by reading and analyzing the actual source files.

## Primary Task

Process Vue components and generate markdown documentation suitable for VitePress and optimized for context7 search and retrieval.

## Critical Rules - MUST FOLLOW

1. **ALWAYS READ THE ACTUAL FILE** - Never guess or assume component properties
2. **Parse the real component code** - Extract props from `defineProps()` or TypeScript interfaces
3. **Use exact types** - Copy TypeScript types exactly as defined in the component
4. **Verify all features** - Only document props, events, slots that actually exist in the code
5. **Extract from JSDoc** - Use existing JSDoc comments for descriptions
6. **No hallucination** - If uncertain about any feature, mark with `<!-- TODO: Verify -->`
7. **Code examples must be valid** - Only use props that were documented
8. **Follow DKFDS patterns** - Use DKFDS-compliant examples and accessibility features

## Input Parameters

When running this command, specify:

- Single file: `src/components/[category]/fds-component.vue`
- Category: `src/components/forms/` (processes all components in category)
- Or all: `src/components/` (processes all subdirectories)

## Documentation Structure

For each component, create a markdown file with this exact structure:

````markdown
---
title: FdsComponentName
description: [Brief description from JSDoc]
category: [forms|input|navigation|feedback|data-display|layout]
dkfds: true
accessibility: [wcag compliance level]
tags: [dkfds, vue3, component, accessibility, additional, tags]
---

# FdsComponentName

[Brief description from JSDoc or component comments]

## Installation

\```bash
import { FdsComponentName } from '@madsb/dkfds-vue3'
\```

## Quick Start

[Simple, working example with most common props following DKFDS patterns]

\```vue
<template>
  <FdsComponentName 
    v-model="value" 
    label="Eksempel etiket"
    id="example-id"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FdsComponentName } from '@madsb/dkfds-vue3'

const value = ref('')
</script>
\```

## Props

| Prop       | Type         | Default                | Required     | Description                                       |
| ---------- | ------------ | ---------------------- | ------------ | ------------------------------------------------- |
| [propName] | [exact type] | [default value or '-'] | [true/false] | [JSDoc description or 'No description available'] |

## Events

| Event       | Payload                      | Description                  |
| ----------- | ---------------------------- | ---------------------------- |
| [eventName] | [payload type and structure] | [When this event is emitted] |

## Slots

| Slot       | Slot Props             | Description             |
| ---------- | ---------------------- | ----------------------- |
| [slotName] | [props passed to slot] | [What this slot is for] |

## Usage Examples

### Basic Usage

\```vue
[Complete working example with common use case]
\```

### With Form Validation

\```vue
[Example showing form integration if applicable]
\```

### Accessibility Features

\```vue
[Example highlighting accessibility features and WCAG compliance]
\```

## API Reference

### Props Details

[Detailed explanation of complex props if needed]

### Component Methods

[If component exposes methods via defineExpose]

### TypeScript Interfaces

\```typescript
[Any relevant type definitions from the component or types/ directory]
\```

## Accessibility

- **WCAG Compliance**: [Level A/AA/AAA features]
- **Keyboard Navigation**: [Supported keyboard interactions]
- **Screen Reader**: [ARIA labels and descriptions provided]
- **Focus Management**: [How focus is handled]

## DKFDS Guidelines

- [Specific DKFDS design system requirements]
- [Usage in government self-service solutions]
- [Theme compatibility (VirkDK/BorgerDK)]

## Best Practices

- Always provide meaningful `id` attributes for form elements
- Use Danish labels and text for government solutions
- Consider mobile-first responsive design
- Follow DKFDS accessibility standards

## Related Components

- [List of related components in the library by category]

## Testing

\```typescript
// Example test usage from __tests__ directory
import { mount } from '@vue/test-utils'
import FdsComponentName from '../FdsComponentName.vue'

const wrapper = mount(FdsComponentName, {
  props: { /* example props */ }
})
\```
````

## Processing Instructions

### For Single Component

1. Read the complete .vue file at the specified path
2. Parse `<script setup lang="ts">` section to find:
   - `defineProps<PropsInterface>()` definition
   - `defineEmits<EmitsInterface>()` definition
   - Import statements for types from `@/types/`
   - TypeScript interfaces if defined inline
3. Check `src/types/` directory for related TypeScript interfaces
4. Extract JSDoc comments (/\*\* \*/) above interfaces and component
5. Read the `<template>` section to identify:
   - Actual slot implementations (`<slot>` elements)
   - Event emissions (`@event`, `$emit`)
   - Accessibility attributes (`aria-*`, `role`, etc.)
6. Generate documentation following the structure above
7. Save to: `docs-site/docs/components/[category]/[component-name].md`

### For Directory Processing

1. List all `fds-*.vue` and `xfds-*.vue` files in the specified directory
2. Process each file individually following single component instructions
3. Create an index file: `docs-site/docs/components/[category]/index.md` with component table
4. Report progress: "Documented X of Y components in [category]"

### Validation Pass

After generating documentation:

1. Re-read the source component file and related TypeScript interfaces
2. Compare documented props against actual props definition
3. Verify all code examples use only documented props
4. Check that accessibility features are accurately documented
5. Add comment `<!-- Verified against source -->` at end of file

## Output Location

Components should be documented in matching directories:

- Single component: `docs-site/docs/components/[category]/[component-name].md`
- Category index: `docs-site/docs/components/[category]/index.md`  
- Main index: `docs-site/docs/components/README.md` (overview of all categories)

### Category Mapping

- `src/components/forms/` → `docs-site/docs/components/forms/`
- `src/components/input/` → `docs-site/docs/components/input/`
- `src/components/navigation/` → `docs-site/docs/components/navigation/`
- `src/components/feedback/` → `docs-site/docs/components/feedback/`
- `src/components/data-display/` → `docs-site/docs/components/data-display/`
- `src/components/layout/` → `docs-site/docs/components/layout/`

## Error Handling

- If JSDoc is missing: Use "No description available"
- If TypeScript interface unclear: Use `unknown` with TODO comment
- If file cannot be read: Report error and continue with next file
- If component has no props: Still create documentation with usage examples
- If accessibility features unclear: Mark for manual review

## Example Command Executions

```bash
# Single component
pnpm document-vue-components src/components/forms/fds-input.vue

# Category
pnpm document-vue-components src/components/input/

# All components with progress tracking
pnpm document-vue-components src/components/ --verbose

# With accessibility audit
pnpm document-vue-components src/components/forms/ --accessibility-check
```

## Quality Checklist

For each generated file, ensure:

- [ ] All props in documentation exist in source component or TypeScript interface
- [ ] All props in source are documented
- [ ] TypeScript types match exactly
- [ ] Default values are accurate (check component or interface)
- [ ] Required props are correctly marked
- [ ] Events are real (found via defineEmits or template)
- [ ] Code examples use proper DKFDS import pattern
- [ ] Accessibility features are documented
- [ ] Danish language examples where appropriate
- [ ] WCAG compliance level is specified
- [ ] No fabricated features or props

## DKFDS-Specific Considerations

- Handle both `fds-` and `xfds-` component prefixes
- Extract component categories from folder structure:
  - `forms/` → Form structure components
  - `input/` → Input and form controls
  - `navigation/` → Navigation components
  - `feedback/` → User feedback components
  - `data-display/` → Data presentation
  - `layout/` → Layout and utility components
- Support DKFDS theming (VirkDK/BorgerDK)
- Document accessibility features per WCAG standards
- Include Danish language examples for government context
- Reference DKFDS behavior scripts when applicable

## TypeScript Integration

- Extract interfaces from `src/types/` directory
- Support generic type parameters in props
- Document union types and enums properly
- Handle complex nested interface types
- Reference shared types across components

## Final Verification

After processing all components, generate a verification report:

```markdown
# DKFDS Documentation Generation Report

## Summary

- Total DKFDS components processed: X
- Successfully documented: Y
- Errors encountered: Z
- Accessibility audited: A

## Component Categories

| Category      | Components | Documented | Missing |
|---------------|------------|------------|---------|
| forms         | X          | Y          | Z       |
| input         | X          | Y          | Z       |
| navigation    | X          | Y          | Z       |
| feedback      | X          | Y          | Z       |
| data-display  | X          | Y          | Z       |
| layout        | X          | Y          | Z       |

## Issues Found

[Any props/events that couldn't be verified]

## Accessibility Review

[Components needing accessibility documentation review]
```

Remember: **Accuracy over completeness** - It's better to mark something as "TODO: Verify" than to document features that don't exist. All examples should follow DKFDS patterns and government self-service solution requirements.