import { useWatchPluginMessage } from '@lobehub/chat-plugin-sdk/client';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Card, Flex, Typography, Image } from "antd";

const { Text, Paragraph } = Typography;

const Render = memo(() => {
  const { data } = useWatchPluginMessage();
  
  if (!data) return null;
  
  return (
    <div>
      <Card title="代码执行结果" bordered>
        {data.logs && (
          <Flexbox gap={8}>
            <Text strong>执行日志</Text>
            <Paragraph>
              <pre style={{ backgroundColor: '#f5f5f5', padding: 12, borderRadius: 4, overflow: 'auto' }}>
                {data.logs}
              </pre>
            </Paragraph>
          </Flexbox>
        )}
        
        {data.results && data.results.length > 0 && (
          <Flexbox gap={16} style={{ marginTop: 16 }}>
            <Text strong>执行结果</Text>
            <Flex wrap="wrap" gap={16}>
              {data.results.map((item, index) => (
                <Flexbox key={index} gap={8}>
                  {item.text && (
                    <pre style={{ backgroundColor: '#f5f5f5', padding: 12, borderRadius: 4, overflow: 'auto' }}>
                      {item.text}
                    </pre>
                  )}
                  {item.png && (
                    <Image
                      src={`data:image/png;base64,${item.png}`}
                      alt={`Result chart ${index}`}
                      style={{ maxWidth: '100%' }}
                    />
                  )}
                </Flexbox>
              ))}
            </Flex>
          </Flexbox>
        )}
      </Card>
    </div>
  );
});

export default Render;



