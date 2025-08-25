// Explore + Formation Export System


export interface ExploreFormationExport {
  id: string;
  timestamp: string;
  exploreData: any;
  formationData: any;
  metadata: {
    confidence: 'high' | 'medium' | 'low';
    gaps: string[];
    strategicSteps: string[];
  };
}

export interface AdminExportSummary {
  totalExports: number;
  exportsByConfidence: Record<string, number>;
  recentExports: ExploreFormationExport[];
}

export class ExploreFormationExportService {
  private static instance: ExploreFormationExportService;
  private exports: ExploreFormationExport[] = [];
  private readonly EXPORT_STORAGE_KEY = 'una_explore_formation_exports';

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): ExploreFormationExportService {
    if (!ExploreFormationExportService.instance) {
      ExploreFormationExportService.instance = new ExploreFormationExportService();
    }
    return ExploreFormationExportService.instance;
  }

  createExport(exploreData: any, formationRefinements: any, userChoices: any, finalValues: any): ExploreFormationExport {
    const exportId = `export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const exportData: ExploreFormationExport = {
      id: exportId,
      timestamp: new Date().toISOString(),
      exploreData,
      formationData: {
        refinements: formationRefinements,
        userChoices,
        finalValues
      },
      metadata: {
        confidence: 'medium',
        gaps: ['Sample gap'],
        strategicSteps: ['Sample step']
      }
    };

    this.exports.push(exportData);
    this.saveToStorage();
    return exportData;
  }

  getAllExports(): ExploreFormationExport[] {
    return [...this.exports].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  getExportById(id: string): ExploreFormationExport | null {
    return this.exports.find(exp => exp.id === id) || null;
  }

  getAdminSummary(): AdminExportSummary {
    const totalExports = this.exports.length;
    
    const exportsByConfidence: Record<string, number> = {};
    this.exports.forEach(exp => {
      const confidence = exp.metadata.confidence;
      exportsByConfidence[confidence] = (exportsByConfidence[confidence] || 0) + 1;
    });
    
    const recentExports = this.exports.slice(0, 10);
    
    return {
      totalExports,
      exportsByConfidence,
      recentExports
    };
  }

  exportToJSON(exportId: string): string {
    const exportData = this.getExportById(exportId);
    if (!exportData) {
      throw new Error(`Export with ID ${exportId} not found`);
    }
    return JSON.stringify(exportData, null, 2);
  }

  exportToCSV(exportId: string): string {
    const exportData = this.getExportById(exportId);
    if (!exportData) {
      throw new Error(`Export with ID ${exportId} not found`);
    }
    
    const headers = ['ID', 'Timestamp', 'Confidence', 'Gaps', 'Steps'];
    const row = [
      exportData.id,
      exportData.timestamp,
      exportData.metadata.confidence,
      exportData.metadata.gaps.join('; '),
      exportData.metadata.strategicSteps.join('; ')
    ];
    
    return [headers, row].map(row => row.join(',')).join('\n');
  }

  exportAllData(format: 'json' | 'csv'): string {
    const allExports = this.getAllExports();
    
    if (format === 'json') {
      return JSON.stringify(allExports, null, 2);
    } else if (format === 'csv') {
      const headers = ['ID', 'Timestamp', 'Confidence', 'Gaps', 'Steps'];
      const rows = allExports.map(exp => [
        exp.id,
        exp.timestamp,
        exp.metadata.confidence,
        exp.metadata.gaps.join('; '),
        exp.metadata.strategicSteps.join('; ')
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    
    return '';
  }

  deleteExport(exportId: string): boolean {
    const index = this.exports.findIndex(exp => exp.id === exportId);
    if (index !== -1) {
      this.exports.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  clearAllExports(): void {
    this.exports = [];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.EXPORT_STORAGE_KEY, JSON.stringify(this.exports));
    } catch (error) {
      console.error('Error saving exports to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.EXPORT_STORAGE_KEY);
      if (stored) {
        this.exports = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading exports from storage:', error);
      this.exports = [];
    }
  }
}

export const exploreFormationExportService = ExploreFormationExportService.getInstance();
