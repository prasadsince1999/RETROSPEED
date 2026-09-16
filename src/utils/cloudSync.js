// RETROSPEED — Anonymous Cloudflare Cloud Sync Client
import { saveProgress, loadProgress } from './storage';

export const SYNC_CODE_KEY = 'retrospeed_sync_code';
export const LAST_SYNC_KEY = 'retrospeed_sync_last_time';

/**
 * Normalizes user-entered sync code into RS-XXXX format.
 */
export function normalizeSyncCode(code) {
  if (!code || typeof code !== 'string') return '';
  let cleaned = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!cleaned.startsWith('RS') && cleaned.length === 4) {
    cleaned = 'RS' + cleaned;
  }
  if (cleaned.startsWith('RS') && cleaned.length === 6) {
    return `RS-${cleaned.slice(2)}`;
  }
  return cleaned;
}

/**
 * Validates if a string matches the RS-XXXX pattern.
 */
export function isValidSyncCode(code) {
  const normalized = normalizeSyncCode(code);
  return /^RS-[A-Z0-9]{4}$/.test(normalized);
}

export function getActiveSyncCode() {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(SYNC_CODE_KEY) || null;
    }
  } catch (e) {
    console.warn('Failed to read sync code from storage:', e);
  }
  return null;
}

export function setActiveSyncCode(code) {
  try {
    if (typeof localStorage !== 'undefined') {
      if (code) {
        localStorage.setItem(SYNC_CODE_KEY, normalizeSyncCode(code));
      } else {
        localStorage.removeItem(SYNC_CODE_KEY);
      }
    }
  } catch (e) {
    console.warn('Failed to save sync code to storage:', e);
  }
}

export function getLastSyncTime() {
  try {
    if (typeof localStorage !== 'undefined') {
      const val = localStorage.getItem(LAST_SYNC_KEY);
      return val ? Number(val) : null;
    }
  } catch (e) {
    console.warn('Failed to read last sync time:', e);
  }
  return null;
}

export function setLastSyncTime(timeMs = Date.now()) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LAST_SYNC_KEY, String(timeMs));
    }
  } catch (e) {
    console.warn('Failed to save last sync time:', e);
  }
}

/**
 * Resolves the appropriate sync API endpoint URL depending on execution environment.
 */
export function getSyncApiUrl() {
  if (typeof window !== 'undefined' && window.location) {
    // If running on ksmxtech.com or localhost pages dev
    return '/api/sync';
  }
  return 'https://ksmxtech.com/api/sync';
}

/**
 * Uploads local player progress to Cloudflare Edge.
 * Reuses existing active sync code if available.
 */
export async function backupToCloud(userProgress, customCode = null) {
  const progressToSave = userProgress || loadProgress();
  const existingCode = customCode || getActiveSyncCode();

  const apiUrl = getSyncApiUrl();
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      progress: progressToSave,
      existingCode
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Backup failed with status ${res.status}`);
  }

  const data = await res.json();
  if (!data.success || !data.code) {
    throw new Error(data.error || 'Server did not return a valid sync code.');
  }

  setActiveSyncCode(data.code);
  setLastSyncTime(data.savedAt || Date.now());

  return {
    success: true,
    code: data.code,
    savedAt: data.savedAt || Date.now()
  };
}

/**
 * Downloads and restores player progress from Cloudflare Edge using sync code.
 */
export async function restoreFromCloud(rawCode) {
  const code = normalizeSyncCode(rawCode);
  if (!isValidSyncCode(code)) {
    throw new Error('Please enter a valid 6-character sync code (e.g. RS-8421).');
  }

  const apiUrl = `${getSyncApiUrl()}?code=${encodeURIComponent(code)}`;
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Restore failed with status ${res.status}`);
  }

  const data = await res.json();
  if (!data.success || !data.progress) {
    throw new Error(data.error || 'Could not find saved progress for this code.');
  }

  // Persist the restored progress locally
  saveProgress(data.progress);
  setActiveSyncCode(code);
  setLastSyncTime(data.savedAt || Date.now());

  return {
    success: true,
    code,
    progress: data.progress,
    savedAt: data.savedAt || Date.now()
  };
}
