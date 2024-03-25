import AdUnitUploader from './component/AdUnitUploader';
import AdUnitChecker from './component/AdUnitChecker';
import AdUnitNonReactiveChecker from './component/AdUnitNonReactiveChecker';

const App = () => {
  return (
    <div className='flex justify-center mt-5 ml-52 mr-16'>
      <AdUnitUploader />
      <AdUnitChecker />
      <AdUnitNonReactiveChecker />
    </div>
  );
};

export default App;
