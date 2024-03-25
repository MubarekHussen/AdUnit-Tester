import { useState } from 'react';
import ConsoleLogger from './ConsoleLogger';
import AdunitViewer from './AdUnitViewer';

const AdUnitChecker = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [submitCount, setSubmitCount] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedValue(inputValue);
    setSubmitCount((prevCount) => prevCount + 1);
    setInputValue('')
  };

  return (
    <>
      <div className='flex flex-col bg-gray-100'>
        <ConsoleLogger
          submittedValue={submittedValue}
          submitCount={submitCount}
        />
        <div className='flex flex-col items-center'>
          <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <input
                className='border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:border-gray-600 focus:shadow-outline'
                type='text'
                placeholder='Check here...'
                value={inputValue}
                onChange={handleChange}
              />
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Submit
              </button>
            </form>
          </div>
          <AdunitViewer
            submittedValue={submittedValue}
            submitCount={submitCount}
          />
        </div>
      </div>
    </>
  );
};

export default AdUnitChecker;
