export interface WellDataRow {
  depth: number;
  dt: number;
  gr: number;
  rock_type: string;
  formation: string;
  rop: number;
}

export interface UploadedFile {
  name: string;
  data: WellDataRow[];
  uploadedAt: Date;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export interface WellStats {
  currentDepth: number;
  ropAverage: number;
  currentFormation: string;
  wellStatus: string;
}
