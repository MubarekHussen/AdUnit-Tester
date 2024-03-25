import { useEffect, useState } from 'react';

const nonReactive = [
  'dom_loading_started',
  'dom_loading_interactive',
  'dom_loading_complete',
  'impression',
  'rendered',
  'creative_loading_started',
  'creative_loading_complete',
  'frame_change',
  'creative_complete',
  'mouse_click',
];

const AdUnitNonReactiveChecker = () => {
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [matchedLogs, setMatchedLogs] = useState(new Set());

  useEffect(() => {
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      originalConsoleLog(...args);
      const log = args
        .map((arg) =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
        )
        .join(' ');
      setConsoleLogs((prevLogs) => [...prevLogs, log]);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  const extractEventType = (log) => {
    try {
      const eventData = JSON.parse(log.split('EVENT DATA:')[1]);
      return eventData.event_type;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const newMatchedLogs = consoleLogs
      .filter((log) => nonReactive.includes(extractEventType(log)))
      .map((matchedLog) => extractEventType(matchedLog));

    // Add unique event types to the matchedLogs Set
    newMatchedLogs.forEach((log) => {
      setMatchedLogs((prevMatchedLogs) => new Set(prevMatchedLogs.add(log)));
    });
  }, [consoleLogs]);

  return (
    <div className='p-3'>
      <h1 className='text-xl'>Non-Reactive Events</h1>
      <div className='p-5'>
        {[...matchedLogs].map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default AdUnitNonReactiveChecker;
