import { IntakeData, StorageMetadata } from './types';

const INTAKE_DATA_KEY = 'una_intake_data';
const STORAGE_METADATA_KEY = 'una_storage_metadata';
const LAST_ACTIVITY_KEY = 'una_last_activity';
const INACTIVITY_THRESHOLD = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export function saveIntakeData(data: IntakeData): void {
  try {
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(INTAKE_DATA_KEY, JSON.stringify(dataWithTimestamp));
    updateLastActivity();
  } catch (error) {
    console.error('Error saving intake data:', error);
  }
}

export function loadIntakeData(): IntakeData | null {
  try {
    const data = localStorage.getItem(INTAKE_DATA_KEY);
    if (data) {
      updateLastActivity();
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error loading intake data:', error);
    return null;
  }
}

export function clearIntakeData(): void {
  try {
    localStorage.removeItem(INTAKE_DATA_KEY);
    updateLastActivity();
  } catch (error) {
    console.error('Error clearing intake data:', error);
  }
}

export function updateIntakeData(updates: Partial<IntakeData>): void {
  try {
    const currentData = loadIntakeData();
    if (currentData) {
      const updatedData = {
        ...currentData,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveIntakeData(updatedData);
    }
  } catch (error) {
    console.error('Error updating intake data:', error);
  }
}

export function getStorageMetadata(): StorageMetadata {
  try {
    const metadata = localStorage.getItem(STORAGE_METADATA_KEY);
    if (metadata) {
      return JSON.parse(metadata);
    }
    
    // Create default metadata
    const defaultMetadata: StorageMetadata = {
      lastActivity: new Date().toISOString(),
      dataVersion: '1.0.0',
      totalRecords: 0
    };
    
    localStorage.setItem(STORAGE_METADATA_KEY, JSON.stringify(defaultMetadata));
    return defaultMetadata;
  } catch (error) {
    console.error('Error getting storage metadata:', error);
    return {
      lastActivity: new Date().toISOString(),
      dataVersion: '1.0.0',
      totalRecords: 0
    };
  }
}

export function updateLastActivity(): void {
  try {
    const now = new Date().toISOString();
    localStorage.setItem(LAST_ACTIVITY_KEY, now);
    
    // Update metadata
    const metadata = getStorageMetadata();
    metadata.lastActivity = now;
    localStorage.setItem(STORAGE_METADATA_KEY, JSON.stringify(metadata));
  } catch (error) {
    console.error('Error updating last activity:', error);
  }
}

export function checkInactivity(): boolean {
  try {
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;
    
    const lastActivityDate = new Date(lastActivity);
    const now = new Date();
    const timeDiff = now.getTime() - lastActivityDate.getTime();
    
    return timeDiff > INACTIVITY_THRESHOLD;
  } catch (error) {
    console.error('Error checking inactivity:', error);
    return false;
  }
}

export function getDaysSinceLastActivity(): number {
  try {
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (!lastActivity) return 0;
    
    const lastActivityDate = new Date(lastActivity);
    const now = new Date();
    const timeDiff = now.getTime() - lastActivityDate.getTime();
    
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Error getting days since last activity:', error);
    return 0;
  }
}

export function exportData(): string {
  try {
    const intakeData = loadIntakeData();
    const metadata = getStorageMetadata();
    
    const exportData = {
      intakeData,
      metadata,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return '';
  }
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.intakeData) {
      saveIntakeData(data.intakeData);
    }
    
    if (data.metadata) {
      localStorage.setItem(STORAGE_METADATA_KEY, JSON.stringify(data.metadata));
    }
    
    updateLastActivity();
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

export function getStorageStats(): { totalSize: number; lastActivity: string; dataVersion: string } {
  try {
    const metadata = getStorageMetadata();
    const intakeData = loadIntakeData();
    
    let totalSize = 0;
    if (intakeData) {
      totalSize += JSON.stringify(intakeData).length;
    }
    
    return {
      totalSize,
      lastActivity: metadata.lastActivity,
      dataVersion: metadata.dataVersion
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return {
      totalSize: 0,
      lastActivity: new Date().toISOString(),
      dataVersion: '1.0.0'
    };
  }
}

export function cleanupOldData(): void {
  try {
    // Check for inactivity and show warning
    if (checkInactivity()) {
      const days = getDaysSinceLastActivity();
      if (days > 90) {
        // After 90 days, offer to clear data
        if (confirm(`Your data hasn't been accessed in ${days} days. Would you like to clear old data to free up space?`)) {
          clearIntakeData();
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up old data:', error);
  }
} 