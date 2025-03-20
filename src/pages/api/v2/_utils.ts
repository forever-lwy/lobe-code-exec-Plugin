import { Sandbox } from '@e2b/code-interpreter';

import { Result } from './type';
import { Settings } from './_types';

const executeCode = async (args: { code: string; language?: string }, settings: Settings): Promise<Result> => {
  const apiKey = settings.E2B_API_KEY;
  
  if (!apiKey) {
    throw new Error('E2B API key is missing');
  }
  
  // 设置环境变量
  process.env.E2B_API_KEY = apiKey;
  console.log('E2B API Key configured');
  
  const sandbox = await Sandbox.create();
  console.log('E2B Sandbox created');
  
  try {
    // 默认使用Python执行，除非指定了其他语言
    const language = args.language || 'python';
    
    let execution;
    if (language === 'python') {
      console.log('Executing Python code...');
      execution = await sandbox.runCode(args.code);
    } else {
      throw new Error(`Unsupported language: ${language}`);
    }
    
    // 处理结果
    const result = {
      logs: execution.logs || '',
      results: execution.results?.map(item => ({
        png: item.png,
        text: item.text,
      })) || [],
    };
    
    console.log('Code execution completed');
    return result;
  } finally {
    // 清理资源
    await sandbox.close();
    console.log('E2B Sandbox closed');
  }
};

export default executeCode;
