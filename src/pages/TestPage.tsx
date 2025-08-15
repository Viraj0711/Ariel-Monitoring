const TestPage = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          ConstructEye
        </h1>
        <p className="text-blue-700 mb-8">
          Application is working correctly!
        </p>
        <div className="space-x-4">
          <a 
            href="/landing" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Landing Page
          </a>
          <a 
            href="/enhanced" 
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Enhanced Landing
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
