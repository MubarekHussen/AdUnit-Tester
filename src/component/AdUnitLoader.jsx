import { useEffect } from 'react';
import axios from 'axios'; 

const AdUnitLoader = ({submittedValue}) => {
  console.log(submittedValue)
  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const response = await axios.get('/adData.json'); 
        const adData = response.data;

        const script = document.createElement('script');
        script.id = 'gameLoaderScript';

        script.src = 'https://wat.adludio.com/loaders/cda/dsp_tester.js';

        script.innerHTML = JSON.stringify(adData);

        document.body.appendChild(script);
    
      } catch (error) {
        console.error('Error loading ad data:', error);
      }


      // try {
      //   if (submittedValue !== '') {
      //     const adData = JSON.parse(submittedValue);
          
      //     console.log('************', adData);
      //     const script = document.createElement('script');
      //     script.id = 'gameLoaderScript';
    
      //     script.src = 'https://wat.adludio.com/loaders/cda/dsp_tester.js';

      //     // Set the JSON data as a global variable
      //     window.adData = adData;

      //     script.innerText = JSON.stringify(adData);
    
      //     document.body.appendChild(script);
  
      //     setIsLoaded(true);
      //   }
      // } catch (error) {
      //   console.error('Error loading ad data:', error);
      // }


    };

    fetchAdData();

    return () => {
      const script = document.getElementById('gameLoaderScript');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [submittedValue]);

  return null;
};

export default AdUnitLoader;