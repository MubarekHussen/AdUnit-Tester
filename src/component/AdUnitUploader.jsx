import { useState } from 'react';
import AdUnitLoader from './AdUnitLoader';

const isValidJson = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
};

const AdUnitUploader = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedValue(inputValue);

    if (isValidJson(inputValue)) {
      setSubmittedValue(inputValue);
    } else {
      console.error('Invalid JSON string');
    }

  };

  return (
    <>
      {/* <div className='w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-8 max-h-80'>
        <h2 className='text-xl font-bold mb-4'>Ad Unit Uploader</h2>
        <div className='flex flex-col'>
          <textarea
            rows={6}
            className='border rounded p-2 mb-4'
            placeholder='Enter your ad unit here...'
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div> */}
      <AdUnitLoader submittedValue={submittedValue} />
    </>
  );
};

export default AdUnitUploader;
