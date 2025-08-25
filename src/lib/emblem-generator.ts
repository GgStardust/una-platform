import { IntakeData } from './types';

export interface EmblemDesign {
  id: string;
  name: string;
  description: string;
  svgContent: string;
  colors: string[];
  style: string;
  variations: EmblemVariation[];
}

export interface EmblemVariation {
  id: string;
  name: string;
  svgContent: string;
  description: string;
}

export interface EmblemPackage {
  designs: EmblemDesign[];
  formats: {
    pdf: Uint8Array;
    svg: Uint8Array;
    png: Uint8Array;
    ai: Uint8Array;
    jpg: Uint8Array;
  };
  metadata: {
    entityName: string;
    generatedAt: string;
    style: string;
    colors: string;
  };
}

// Emblem generation removed - users upload existing files
export async function generateEmblemDesigns(_data: IntakeData): Promise<EmblemDesign[]> {
  console.log('Emblem generation removed - users upload existing files');
  return [];
}

// Generate emblem package from uploaded file
export async function generateEmblemPackage(data: IntakeData): Promise<EmblemPackage> {
  console.log('Emblem package generation from uploaded file only');
  
  // Return empty package since users upload existing files
  return {
    designs: [],
    formats: {
      pdf: new Uint8Array(),
      svg: new Uint8Array(),
      png: new Uint8Array(),
      ai: new Uint8Array(),
      jpg: new Uint8Array()
    },
    metadata: {
      entityName: data.entityName,
      generatedAt: new Date().toISOString(),
      style: 'uploaded',
      colors: 'uploaded'
    }
  };
}
