import { useEffect, useState } from 'react';

const ConsoleLogger = ({ submittedValue, submitCount }) => {
  const [consoleLogs, setConsoleLogs] = useState([]);

  useEffect(() => {
    if (submittedValue) {
      console.log(submittedValue);
      const matchedEventType = consoleLogs.some(log => extractEventType(log) === (submittedValue));
      console.log(matchedEventType);
    }
  }, [submittedValue, submitCount ]);

  useEffect(() => {
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      originalConsoleLog(...args);
      const log = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
      setConsoleLogs(prevLogs => [...prevLogs, log]);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  const extractEventType = log => {
    try {
      const eventData = JSON.parse(log.split('EVENT DATA:')[1]);
      return eventData.event_type;
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      {/* <div style={{ marginTop: 0 }}>
        <ul>
          {consoleLogs.map((log, index) => (
            <li key={index}>{extractEventType(log)}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default ConsoleLogger;
