import { describe, it, expect, beforeEach } from 'vitest';
import { 
  normalizeSyncCode, 
  isValidSyncCode, 
  getActiveSyncCode, 
  setActiveSyncCode,
  getLastSyncTime,
  setLastSyncTime
} from './cloudSync';

describe('Cloud Sync Utility & Code Normalization', () => {
  let store = {};

  beforeEach(() => {
    store = {};
    globalThis.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, val) => { store[key] = String(val); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; }
    };
  });

  it('normalizes various input formats into standard RS-XXXX', () => {
    expect(normalizeSyncCode('rs-8421')).toBe('RS-8421');
    expect(normalizeSyncCode('8421')).toBe('RS-8421');
    expect(normalizeSyncCode('RS8421')).toBe('RS-8421');
    expect(normalizeSyncCode(' rs - 9 k p 4 ')).toBe('RS-9KP4');
    expect(normalizeSyncCode('')).toBe('');
    expect(normalizeSyncCode(null)).toBe('');
  });

  it('validates sync code format strictly to RS-XXXX (4 alphanumeric chars)', () => {
    expect(isValidSyncCode('RS-8421')).toBe(true);
    expect(isValidSyncCode('RS-9KP4')).toBe(true);
    expect(isValidSyncCode('rs-8421')).toBe(true); // normalizes to valid
    expect(isValidSyncCode('8421')).toBe(true); // normalizes to valid

    // Bad lengths or special characters
    expect(isValidSyncCode('TOOLONG123')).toBe(false);
    expect(isValidSyncCode('RS-1')).toBe(false);
    expect(isValidSyncCode('RS-12')).toBe(false);
    expect(isValidSyncCode('RS-12345')).toBe(false);
    expect(isValidSyncCode('')).toBe(false);
    expect(isValidSyncCode('RS-!@#$')).toBe(false);
  });

  it('persists and retrieves active sync code and last sync timestamp', () => {
    expect(getActiveSyncCode()).toBeNull();
    expect(getLastSyncTime()).toBeNull();

    setActiveSyncCode('RS-8421');
    expect(getActiveSyncCode()).toBe('RS-8421');

    const now = 1726500000000;
    setLastSyncTime(now);
    expect(getLastSyncTime()).toBe(now);

    setActiveSyncCode(null);
    expect(getActiveSyncCode()).toBeNull();
  });
});
