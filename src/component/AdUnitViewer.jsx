import { useEffect, useState } from 'react';

const AdunitViewer = ({ submittedValue, submitCount }) => {
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [matchedBool, setMatchedBool] = useState(false);
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const dataFromStorage =
      JSON.parse(localStorage.getItem('storedObjects')) || [];
    setStoredData(dataFromStorage);
  }, [submitCount, matchedBool, submittedValue]);

  useEffect(() => {
    if (submittedValue) {
      console.log(submittedValue);
      const matchedEventType = consoleLogs.some(
        (log) => extractEventType(log) === submittedValue
      );
      setMatchedBool(matchedEventType);
      console.log(matchedEventType);

      const newObject = {
        submittedValue,
        submitCount,
        matchedEventType,
      };

      const existingData =
        JSON.parse(localStorage.getItem('storedObjects')) || [];
      const updatedData = [...existingData, newObject];
      localStorage.setItem('storedObjects', JSON.stringify(updatedData));
    }
  }, [submittedValue, submitCount]);

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
    const handleUnload = () => {
      localStorage.removeItem('storedObjects');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <div>
      {/* <h1>{submittedValue}</h1>
      <p>{matchedBool.toString()}</p> */}
      <h1>Checked Events</h1>

      <ul className='my-5'>
        {storedData.map((item, index) => (
          <li key={index}>
            <p className='text-xl'>
              {item.submittedValue}{' '}
              {item.matchedEventType
                ? 'event is present'
                : 'event is not present'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdunitViewer;
