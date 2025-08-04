import { describe, it, expect } from 'vitest';
import { isRef } from 'vue';
import generateId from '../../composable/generateId';

describe('generateId', () => {
  it('should return a Vue ref', () => {
    const id = generateId(undefined);
    expect(isRef(id)).toBe(true);
  });

  it('should use provided localId when given', () => {
    const customId = 'my-custom-id';
    const id = generateId(customId);
    expect(id.value).toBe(customId);
  });

  it('should generate auto ID when localId is undefined', () => {
    const id = generateId(undefined);
    expect(id.value).toMatch(/^fid_[0-9a-f]{32}$/);
  });

  it('should generate unique auto IDs', () => {
    const id1 = generateId(undefined);
    const id2 = generateId(undefined);
    expect(id1.value).not.toBe(id2.value);
  });

  it('should have fid_ prefix for auto-generated IDs', () => {
    const id = generateId(undefined);
    expect(id.value).toMatch(/^fid_/);
  });

  it('should remove hyphens from UUID in auto-generated IDs', () => {
    const id = generateId(undefined);
    expect(id.value).not.toContain('-');
  });

  it('should be reactive', () => {
    const id = generateId('initial-id');
    expect(id.value).toBe('initial-id');
    
    // Refs are reactive, so we can change the value
    id.value = 'changed-id';
    expect(id.value).toBe('changed-id');
  });
});