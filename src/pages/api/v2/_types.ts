export interface Settings {
  BING_API_KEY: string;
  E2B_API_KEY: string;
}

export interface CodeExecutionResult {
  error?: string;
  logs: string;
  results: Array<{
    png?: string; // base64编码的图片，用于展示matplotlib等生成的图表
    text?: string;
  }>;
}

export type Result = CodeExecutionResult;
