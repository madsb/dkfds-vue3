#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentTestTemplate = `import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import {{ComponentName}} from '../../components/{{component-file}}.vue';
import { mountComponent, testSlot, testProp } from '../../../tests/test-utils';

describe('{{ComponentName}}', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const wrapper = mountComponent({{ComponentName}});
      expect(wrapper.exists()).toBe(true);
    });

    // Add more rendering tests based on component structure
  });

  describe('Props', () => {
    // Add prop tests here
    // Example:
    // it('should handle prop correctly', async () => {
    //   await testProp({{ComponentName}}, 'propName', 'propValue', (wrapper) => {
    //     // Add assertions
    //   });
    // });
  });

  describe('Slots', () => {
    // Add slot tests here
    // Example:
    // it('should render default slot', async () => {
    //   await testSlot({{ComponentName}}, 'default', 'Slot content');
    // });
  });

  describe('Events', () => {
    // Add event tests here
  });

  describe('Accessibility', () => {
    it('should be accessible', async () => {
      const wrapper = mountComponent({{ComponentName}});
      
      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false }, // Disable page-level rules for component tests
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
`;

const utilityTestTemplate = `import { describe, it, expect } from 'vitest';
import {{utilityName}} from '../../utils/{{utility-file}}';

describe('{{utilityName}}', () => {
  // Add test cases here
  it('should work correctly', () => {
    // Add test implementation
    expect(true).toBe(true);
  });
});
`;

function generateTest(type, name, packageName) {
  const isComponent = type === 'component';
  const template = isComponent ? componentTestTemplate : utilityTestTemplate;
  
  const testDir = path.join(
    __dirname,
    '..',
    'packages',
    packageName,
    'src',
    '__tests__',
    isComponent ? 'components' : 'utils'
  );

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  const fileName = `${name}.test.ts`;
  const filePath = path.join(testDir, fileName);

  if (fs.existsSync(filePath)) {
    console.error(`Test file already exists: ${filePath}`);
    process.exit(1);
  }

  const pascalCase = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const content = template
    .replace(/\{\{ComponentName\}\}/g, pascalCase)
    .replace(/\{\{component-file\}\}/g, name)
    .replace(/\{\{utilityName\}\}/g, name)
    .replace(/\{\{utility-file\}\}/g, name);

  fs.writeFileSync(filePath, content);
  console.log(`Created test file: ${filePath}`);
  console.log(`\nNext steps:`);
  console.log(`1. Edit the test file to add specific test cases`);
  console.log(`2. Run tests with: cd packages/${packageName} && pnpm test`);
}

// CLI usage
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('Usage: node generate-test.js <type> <name> <package>');
  console.log('  type: component | utility');
  console.log('  name: component or utility name (e.g., fds-alert)');
  console.log('  package: core | extra | utils');
  console.log('\nExample: node generate-test.js component fds-alert core');
  process.exit(1);
}

const [type, name, packageName] = args;

if (!['component', 'utility'].includes(type)) {
  console.error('Type must be either "component" or "utility"');
  process.exit(1);
}

if (!['core', 'extra', 'utils'].includes(packageName)) {
  console.error('Package must be one of: core, extra, utils');
  process.exit(1);
}

generateTest(type, name, packageName);