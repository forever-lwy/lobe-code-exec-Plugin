export interface Settings {
  BING_API_KEY: string;
  E2B_API_KEY: string;
}

export interface CodeExecutionResult {
  logs: string;
  error?: string;
  results: Array<{
    text?: string;
    png?: string; // base64编码的图片，用于展示matplotlib等生成的图表
  }>;
}

export type Result = CodeExecutionResult;
